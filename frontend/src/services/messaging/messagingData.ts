import { ChatMessage, Conversation } from '../../types/social';

export const conversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Kabir',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    lastMessage: 'Let’s meet near the food stalls in 10.',
    time: '2m',
    online: true,
    unreadCount: 3,
    distance: '0.7 km',
  },
  {
    id: 'c2',
    name: 'Noor',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    lastMessage: 'Sending the spot pin now.',
    time: '18m',
    online: false,
    unreadCount: 0,
    distance: '1.4 km',
  },
  {
    id: 'c3',
    name: 'Aarya',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300',
    lastMessage: 'That rooftop set looked unreal.',
    time: '1h',
    online: true,
    unreadCount: 1,
    distance: '0.3 km',
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  c1: [
    { id: 'm1', type: 'text', text: 'You still around Jubilee Hills?', mine: false, timestamp: '8:10 PM' },
    { id: 'm2', type: 'text', text: 'Yep, at Brew Block for another 20.', mine: true, timestamp: '8:12 PM' },
    { id: 'm3', type: 'media', media: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200', mine: false, timestamp: '8:13 PM' },
    { id: 'm4', type: 'voice', text: '0:18 voice note', mine: true, timestamp: '8:14 PM' },
  ],
  c2: [{ id: 'm1', type: 'text', text: 'Dessert pop-up starts at 9.', mine: false, timestamp: '6:42 PM' }],
  c3: [{ id: 'm1', type: 'text', text: 'Want to collab on a local guide?', mine: false, timestamp: '5:18 PM' }],
};
