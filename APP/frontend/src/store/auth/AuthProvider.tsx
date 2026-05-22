import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  clearDraft,
  loadOnboardingDraft,
  loadPermissionState,
  login as loginRequest,
  logout as logoutRequest,
  persistOnboardingDraft,
  persistPermissionState,
  saveSession,
  signup as signupRequest,
  validateStoredToken,
  verifyOtp as verifyOtpRequest,
  getSession,
  clearSession,
} from '../../services/auth';
import { api } from '../../services/api';
import {
  AuthSession,
  AuthUser,
  LoginPayload,
  OnboardingDraft,
  PermissionState,
  SignupPayload,
} from '../../types/auth';

type AuthContextValue = {
  isBootstrapping: boolean;
  isAuthenticated: boolean;
  onboardingCompleted: boolean;
  authEntry: 'Login' | 'Onboarding';
  user: AuthUser | null;
  token: string | null;
  onboardingDraft: OnboardingDraft;
  permissions: PermissionState;
  pendingUser: AuthUser | null;
  bootstrap: () => Promise<void>;
  setDraft: (draft: Partial<OnboardingDraft>) => Promise<void>;
  setPermissions: (permissions: Partial<PermissionState>) => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  finalizeUsername: (username: string) => Promise<void>;
  finalizeInterests: (interests: string[]) => Promise<void>;
  resetOnboarding: () => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (fields: Partial<AuthUser>) => Promise<void>;
};

const defaultDraft: OnboardingDraft = {
  userId: '',
  otpVerified: false,
  fullName: '',
  email: '',
  phone: '',
  password: '',
  username: '',
  interests: [],
};

const defaultPermissions: PermissionState = {
  locationGranted: false,
  notificationsGranted: false,
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authEntry, setAuthEntry] = useState<'Login' | 'Onboarding'>('Login');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);
  const [onboardingDraft, setOnboardingDraftState] = useState<OnboardingDraft>(defaultDraft);
  const [permissions, setPermissionsState] = useState<PermissionState>(defaultPermissions);

  const onboardingCompleted = user?.onboardingCompleted ?? false;

  const bootstrap = async () => {
    setIsBootstrapping(true);
    try {
      const [storedSession, draft, storedPermissions] = await Promise.all([
        getSession(),
        loadOnboardingDraft(),
        loadPermissionState(),
      ]);

      if (draft) {
        setOnboardingDraftState(draft);
        setAuthEntry('Onboarding');
        if (draft.userId) {
          setPendingUser({
            id: draft.userId,
            username: draft.username,
            email: draft.email,
            phone: draft.phone,
            onboardingCompleted: false,
            interests: draft.interests,
          });
        }
      }

      if (storedPermissions) {
        setPermissionsState(storedPermissions);
      }

      if (storedSession && (await validateStoredToken(storedSession.token))) {
        setToken(storedSession.token);
        setUser(storedSession.user);
        setIsAuthenticated(true);
      } else {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setAuthEntry(draft?.email ? 'Onboarding' : 'Login');
      }
    } finally {
      setIsBootstrapping(false);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const setDraft = async (draft: Partial<OnboardingDraft>) => {
    const next = { ...onboardingDraft, ...draft };
    setOnboardingDraftState(next);
    await persistOnboardingDraft(next);
  };

  const setPermissions = async (nextPartial: Partial<PermissionState>) => {
    const next = { ...permissions, ...nextPartial };
    setPermissionsState(next);
    await persistPermissionState(next);
  };

  const login = async (payload: LoginPayload) => {
    const session = await loginRequest(payload);
    setUser(session.user);
    setToken(session.token);
    setIsAuthenticated(true);
    setAuthEntry('Login');
    await saveSession(session);
  };

  const signup = async (payload: SignupPayload) => {
    const draftUser = await signupRequest(payload);
    setPendingUser(draftUser);
    setAuthEntry('Onboarding');
    const nextDraft = {
      ...defaultDraft,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      password: payload.password,
      userId: draftUser.id,
      otpVerified: false,
      username: '',
      interests: [],
    };
    setOnboardingDraftState(nextDraft);
    await persistOnboardingDraft(nextDraft);
  };

  const verifyOtp = async (code: string) => {
    await verifyOtpRequest(code);
    await setDraft({ otpVerified: true });
  };

  const finalizeUsername = async (username: string) => {
    await setDraft({ username });
  };

  const finalizeInterests = async (interests: string[]) => {
    if (!pendingUser) {
      throw new Error('Missing pending user.');
    }

    const response = await api.put(`/users/${pendingUser.id}`, {
      username: onboardingDraft.username,
      interests,
      onboardingCompleted: true,
    });

    const userFromDb = response.data.data;

    const finalizedUser: AuthUser = {
      id: userFromDb.id,
      username: userFromDb.username,
      email: userFromDb.email,
      phone: userFromDb.phone || '',
      onboardingCompleted: true,
      interests: userFromDb.interests || [],
      fullName: userFromDb.fullName,
      bio: userFromDb.bio,
      avatarUrl: userFromDb.avatarUrl,
      location: userFromDb.location || 'Banjara Hills',
    };

    const session: AuthSession = {
      token: `session_user_${finalizedUser.id}`,
      user: finalizedUser,
    };

    await saveSession(session);
    await clearDraft();
    setOnboardingDraftState(defaultDraft);
    setPendingUser(null);
    setUser(finalizedUser);
    setToken(session.token);
    setIsAuthenticated(true);
    setAuthEntry('Login');
  };

  const resetOnboarding = async () => {
    await clearDraft();
    setOnboardingDraftState(defaultDraft);
    setPendingUser(null);
    setAuthEntry('Onboarding');
    const resetPermissions = {
      locationGranted: false,
      notificationsGranted: false,
    };
    setPermissionsState(resetPermissions);
    await persistPermissionState(resetPermissions);
  };

  const logout = async () => {
    await logoutRequest();
    await clearSession();
    await clearDraft();
    setUser(null);
    setToken(null);
    setPendingUser(null);
    setOnboardingDraftState(defaultDraft);
    setIsAuthenticated(false);
    setAuthEntry('Login');
  };

  const updateUser = async (fields: Partial<AuthUser>) => {
    if (user) {
      const nextUser = { ...user, ...fields };
      setUser(nextUser);
      const currentSession = await getSession();
      if (currentSession) {
        currentSession.user = nextUser;
        await saveSession(currentSession);
      }
    }
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      isBootstrapping,
      isAuthenticated,
      onboardingCompleted,
      authEntry,
      user,
      token,
      onboardingDraft,
      permissions,
      pendingUser,
      bootstrap,
      setDraft,
      setPermissions,
      login,
      signup,
      verifyOtp,
      finalizeUsername,
      finalizeInterests,
      resetOnboarding,
      logout,
      updateUser,
    }),
    [isBootstrapping, isAuthenticated, onboardingCompleted, authEntry, user, token, onboardingDraft, permissions, pendingUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
}
