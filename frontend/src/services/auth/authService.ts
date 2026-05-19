import { AuthSession, AuthUser, LoginPayload, SignupPayload } from '../../types/auth';

const delay = (ms = 900) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUsers: Array<AuthUser & { password: string }> = [
  {
    id: '1',
    username: 'sai_kiran',
    email: 'demo@test.com',
    phone: '+919876543210',
    onboardingCompleted: true,
    interests: ['Coffee', 'Live Music', 'Food Walks'],
    password: 'Password123!',
  },
];

export async function login(payload: LoginPayload): Promise<AuthSession> {
  await delay();

  const user = mockUsers.find(
    (entry) =>
      entry.email.toLowerCase() === payload.email.trim().toLowerCase() &&
      entry.password === payload.password
  );

  if (!user) {
    throw new Error('Incorrect email or password.');
  }

  const { password: _password, ...safeUser } = user;
  return {
    token: `mock-token-${safeUser.id}`,
    user: safeUser,
  };
}

export async function signup(payload: SignupPayload) {
  await delay(1100);

  const existing = mockUsers.find(
    (entry) =>
      entry.email.toLowerCase() === payload.email.trim().toLowerCase() ||
      entry.phone === payload.phone
  );

  if (existing) {
    throw new Error('An account already exists with that email or phone.');
  }

  const draftUser: AuthUser = {
    id: `${mockUsers.length + 1}`,
    username: '',
    email: payload.email.trim().toLowerCase(),
    phone: payload.phone.trim(),
    onboardingCompleted: false,
    interests: [],
  };

  return draftUser;
}

export async function logout() {
  await delay(350);
  return true;
}

export async function validateStoredToken(token: string) {
  await delay(500);
  return token.startsWith('mock-token-');
}

export async function saveMockUser(user: AuthUser, password: string) {
  await delay(300);
  const existingIndex = mockUsers.findIndex((entry) => entry.id === user.id);

  if (existingIndex >= 0) {
    mockUsers[existingIndex] = { ...mockUsers[existingIndex], ...user, password };
  } else {
    mockUsers.push({ ...user, password });
  }
}
