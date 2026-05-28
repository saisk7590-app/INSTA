import { api } from './api';

export interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

export async function getUserStats(userId: string): Promise<UserStats> {
  try {
    const response = await api.get(`/users/${userId}/stats`);
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching user stats:', error);
    return { posts: 0, followers: 0, following: 0 };
  }
}

export async function updateUserProfile(userId: string, data: { fullName?: string; bio?: string; location?: string }) {
  const response = await api.put(`/users/${userId}`, data);
  return response.data.data;
}

export async function checkUsername(username: string): Promise<boolean> {
  const response = await api.get('/users/check-username', {
    params: { username }
  });
  return response.data.exists;
}

export async function getUserFollowers(userId: string, viewerId?: string): Promise<any[]> {
  try {
    const response = await api.get(`/users/${userId}/followers`, {
      params: { viewerId }
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching user followers:', error);
    return [];
  }
}

export async function getUserFollowing(userId: string, viewerId?: string): Promise<any[]> {
  try {
    const response = await api.get(`/users/${userId}/following`, {
      params: { viewerId }
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching user following:', error);
    return [];
  }
}
