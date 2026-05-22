import axios from 'axios';
import { Post } from '../types/social';
import { Platform } from 'react-native';

// Set this to true to route all requests through Ngrok (useful for physical device / Expo Tunnel)
const USE_TUNNEL = false; 
export const NGROK_URL = 'https://glottologic-petrifiedly-luanna.ngrok-free.dev'; // Replace with active tunnel URL if needed

const getBaseURL = () => {
  if (USE_TUNNEL) {
    return `${NGROK_URL}/api`;
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:5000/api';
  }
  return 'http://localhost:5000/api';
};

const API_URL = getBaseURL();

console.log(`[API Client] Initialized with baseURL: ${API_URL}`);

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export function formatRelativeTime(value?: string) {
  if (!value) return 'Just now';

  const date = new Date(value);
  const diffMs = date.getTime() - Date.now();
  const absSeconds = Math.round(Math.abs(diffMs) / 1000);

  if (absSeconds < 60) return 'Just now';

  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
  ];

  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  for (const [unit, seconds] of units) {
    if (absSeconds >= seconds) {
      return formatter.format(-Math.round(absSeconds / seconds), unit);
    }
  }

  return 'Just now';
}

// Interceptor for logging & attaching JWT auth headers if needed
api.interceptors.request.use(
  async (config) => {
    // We can add auth headers here if tokens are stored, or pass userId query param
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for catching network errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn('[API Client] Network or Connection Error detected:', error.message);
      // Construct a generic network error that the frontend can inspect
      const netError = new Error('Network Error: Please check if the backend server is running.');
      return Promise.reject(netError);
    }
    return Promise.reject(error);
  }
);

export const fetchLiveFeed = async (userId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`/posts/feed?userId=${userId}`);
    const data = response.data.data;

    return data.map((item: any) => ({
      id: item.id,
      userId: item.user_id,
      userName: item.full_name,
      handle: '@' + item.username,
      avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      distance: 'Nearby',
      timestamp: formatRelativeTime(item.created_at),
      media: item.media_url,
      caption: item.caption,
      likes: item.likes_count || 0,
      comments: item.comments_count || 0,
      shares: item.shares_count || 0,
      saves: item.saves_count || 0,
      location: item.location_name || 'Local Spot',
    }));
  } catch (error) {
    console.error('Error fetching live feed:', error);
    return []; // fallback
  }
};

export const fetchPostById = async (postId: string): Promise<Post | null> => {
  try {
    const response = await api.get(`/posts/${postId}`);
    const item = response.data.data;

    return {
      id: item.id,
      userId: item.user_id,
      userName: item.full_name,
      handle: '@' + item.username,
      avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      distance: 'Nearby',
      timestamp: formatRelativeTime(item.created_at),
      media: item.media_url,
      caption: item.caption,
      likes: item.likes_count || 0,
      comments: item.comments_count || 0,
      shares: item.shares_count || 0,
      saves: item.saves_count || 0,
      location: item.location_name || 'Local Spot',
    };
  } catch (error) {
    console.error('Error fetching post detail:', error);
    return null;
  }
};

export const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    const data = response.data.data;

    return data.map((item: any) => ({
      id: item.id,
      userId: item.user_id,
      userName: item.full_name,
      handle: '@' + item.username,
      avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      distance: 'Nearby',
      timestamp: formatRelativeTime(item.created_at),
      media: item.media_url,
      caption: item.caption,
      likes: item.likes_count || 0,
      comments: item.comments_count || 0,
      shares: item.shares_count || 0,
      saves: item.saves_count || 0,
      location: item.location_name || 'Local Spot',
    }));
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }
};

export const fetchUserProfile = async (userId: string) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
