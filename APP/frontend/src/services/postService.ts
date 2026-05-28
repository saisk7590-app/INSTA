import { api, formatRelativeTime } from './api';
import { Post, Comment } from '../types/social';

function formatDistanceKm(value?: number | string | null) {
  const distance = Number(value);
  if (!Number.isFinite(distance)) return 'Nearby';
  if (distance < 1) return `${Math.max(Math.round(distance * 1000), 1)} m away`;
  return `${distance.toFixed(distance < 10 ? 1 : 0)} km away`;
}

function mapPost(item: any): Post {
  return {
    id: item.id,
    userId: item.user_id,
    userName: item.full_name,
    handle: '@' + item.username,
    avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    distance: item.distance_km === undefined ? 'Nearby' : formatDistanceKm(item.distance_km),
    timestamp: formatRelativeTime(item.created_at),
    media: item.media_url,
    caption: item.caption,
    likes: item.likes_count || 0,
    comments: item.comments_count || 0,
    shares: item.shares_count || 0,
    saves: item.saves_count || 0,
    location: item.location_name || item.place_name || 'Local Spot',
  };
}

export async function getFeedPosts(userId: string, limit = 10, offset = 0): Promise<Post[]> {
  try {
    const response = await api.get('/posts/feed', {
      params: { userId, limit, offset },
    });
    const data = response.data.data;

    return data.map(mapPost);
  } catch (error) {
    console.error('Error fetching live feed posts:', error);
    return [];
  }
}

export async function getNearbyFeedPosts(params: {
  latitude: number;
  longitude: number;
  radius?: number;
  limit?: number;
  offset?: number;
}): Promise<Post[]> {
  try {
    const response = await api.get('/feed/nearby', {
      params: {
        latitude: params.latitude,
        longitude: params.longitude,
        radius: params.radius ?? 5,
        limit: params.limit ?? 10,
        offset: params.offset ?? 0,
      },
    });

    return response.data.data.map(mapPost);
  } catch (error) {
    console.error('Error fetching nearby feed posts:', error);
    return [];
  }
}

export async function getPostById(postId: string): Promise<Post | null> {
  try {
    const response = await api.get(`/posts/${postId}`);
    const item = response.data.data;

    return mapPost(item);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    return null;
  }
}

export async function fetchPostComments(postId: string): Promise<Comment[]> {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    const data = response.data.data;
    return data.map((item: any) => ({
      id: item.id,
      userName: item.full_name,
      handle: '@' + item.username,
      avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      text: item.text_content,
      timestamp: formatRelativeTime(item.created_at),
      likes: item.likes_count || 0,
      distance: 'Nearby',
      replies: [],
    }));
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
}

export async function addPostComment(postId: string, userId: string, text: string): Promise<Comment | null> {
  try {
    const response = await api.post(`/posts/${postId}/comments`, {
      userId,
      textContent: text,
    });
    const item = response.data.data;
    return {
      id: item.id,
      userName: item.full_name,
      handle: '@' + item.username,
      avatar: item.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
      text: item.text_content,
      timestamp: formatRelativeTime(item.created_at),
      likes: item.likes_count || 0,
      distance: 'Nearby',
      replies: [],
    };
  } catch (error) {
    console.error('Error adding comment:', error);
    return null;
  }
}
