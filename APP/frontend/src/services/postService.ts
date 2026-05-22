import { api, formatRelativeTime } from './api';
import { Post, Comment } from '../types/social';

export async function getFeedPosts(userId: string): Promise<Post[]> {
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
    console.error('Error fetching live feed posts:', error);
    return [];
  }
}

export async function getPostById(postId: string): Promise<Post | null> {
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
