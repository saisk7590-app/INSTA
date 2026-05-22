import { api } from './api';
import { NotificationItemData } from '../types/social';

export type NotificationGroup = {
  title: string;
  items: NotificationItemData[];
};

export async function getNotifications(userId: string): Promise<NotificationGroup[]> {
  try {
    const response = await api.get(`/notifications?userId=${userId}`);
    const items: NotificationItemData[] = response.data.data;

    // Group items by relative time
    const today: NotificationItemData[] = [];
    const yesterday: NotificationItemData[] = [];
    const earlier: NotificationItemData[] = [];

    items.forEach((item) => {
      const timeStr = item.time || '';
      if (timeStr.endsWith('m') || timeStr.endsWith('h')) {
        today.push(item);
      } else if (timeStr === '1d') {
        yesterday.push(item);
      } else {
        earlier.push(item);
      }
    });

    const groups: NotificationGroup[] = [];
    if (today.length > 0) {
      groups.push({ title: 'Today', items: today });
    }
    if (yesterday.length > 0) {
      groups.push({ title: 'Yesterday', items: yesterday });
    }
    if (earlier.length > 0) {
      groups.push({ title: 'Earlier', items: earlier });
    }

    return groups;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}
