import { api } from './api';
import { AuthSession, AuthUser, LoginPayload } from '../types/auth';

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const response = await api.post('/auth/login', {
    email: payload.email,
    password: payload.password,
  });
  
  const { user, token } = response.data.data;

  const safeUser: AuthUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone || '',
    onboardingCompleted: user.onboardingCompleted ?? true,
    interests: user.interests || [],
    fullName: user.fullName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    location: user.location || 'Banjara Hills',
  };

  return {
    token,
    user: safeUser,
  };
}

export async function logout(): Promise<boolean> {
  await api.post('/auth/logout');
  return true;
}

export async function getDemoUsers(): Promise<Array<{ email: string; password: string; username: string }>> {
  try {
    const response = await api.get('/auth/demo-users');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching demo users:', error);
    return [];
  }
}
