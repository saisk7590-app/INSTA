import {
  AnalyticsStat,
  Comment,
  NotificationGroup,
  Post,
  SavedCollection,
  Story,
} from '../../types/social';

export const stories: Story[] = [
  { id: '1', name: 'You', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
  { id: '2', name: 'Aarav', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300', ringColors: ['#7C5CFF', '#31D0AA'] },
  { id: '3', name: 'Mia', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300', ringColors: ['#FF6B8A', '#7C5CFF'] },
  { id: '4', name: 'Rehan', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', ringColors: ['#FFB84D', '#7C5CFF'] },
  { id: '5', name: 'Tara', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300', ringColors: ['#31D0AA', '#7C5CFF'] },
];

export const posts: Post[] = [
  {
    id: 'p1',
    userName: 'Nisha Rao',
    handle: '@nishar',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    distance: '1.2 km away',
    timestamp: '12 min ago',
    media: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200',
    caption: 'Sunset set at Brew Block. Whole street is out tonight.',
    likes: 184,
    comments: 29,
    shares: 11,
    saves: 42,
    location: 'Banjara Hills',
  },
  {
    id: 'p2',
    userName: 'Arjun Malhotra',
    handle: '@arjunlive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    distance: '780 m away',
    timestamp: '24 min ago',
    media: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
    caption: 'Open mic started early. Anyone around Jubilee Hills should pull up.',
    likes: 267,
    comments: 54,
    shares: 18,
    saves: 74,
    location: 'Jubilee Hills',
  },
  {
    id: 'p3',
    userName: 'Sana Kapoor',
    handle: '@sanak',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
    distance: '2.4 km away',
    timestamp: '1 hr ago',
    media: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200',
    caption: 'Late-night skate run by the lake. Neon everywhere.',
    likes: 321,
    comments: 41,
    shares: 23,
    saves: 96,
    location: 'Necklace Road',
  },
];

export const notificationGroups: NotificationGroup[] = [
  {
    title: 'Today',
    items: [
      {
        id: 'nt1',
        type: 'alert',
        title: 'Crowd spike near Moonrise Rooftop',
        description: '28 new people checked in within the last 15 minutes.',
        time: '8m',
        avatar: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=300',
        unread: true,
      },
      {
        id: 'nt2',
        type: 'like',
        title: 'Aarya liked your Reel',
        description: 'Your coffee crawl post is gaining traction nearby.',
        time: '19m',
        avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300',
      },
    ],
  },
  {
    title: 'Yesterday',
    items: [
      {
        id: 'ny1',
        type: 'mention',
        title: 'Kabir mentioned you',
        description: 'Tagged you in a photo walk invite.',
        time: '1d',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
      },
      {
        id: 'ny2',
        type: 'message',
        title: 'New message from Noor',
        description: 'Shared a hidden dessert pop-up with you.',
        time: '1d',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
      },
    ],
  },
  {
    title: 'Earlier',
    items: [
      {
        id: 'ne1',
        type: 'follow',
        title: 'Sana started following you',
        description: 'You both have 8 mutual connections nearby.',
        time: '4d',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300',
      },
    ],
  },
];

export const feedAnalytics: AnalyticsStat[] = [
  { id: 'a1', label: 'Pulse score', value: '94', tone: 'primary' },
  { id: 'a2', label: 'Friends nearby', value: '18', tone: 'accent' },
  { id: 'a3', label: 'Hotspots live', value: '7', tone: 'warning' },
];

export const commentsByPost: Record<string, Comment[]> = {
  p1: [
    {
      id: 'c1',
      userName: 'Kabir Khan',
      handle: '@kabirwalks',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
      text: 'This lane looks unreal tonight. Dropping by in 15.',
      timestamp: '2m',
      likes: 12,
      distance: '0.8 km',
      replies: [
        {
          id: 'c1-r1',
          userName: 'Nisha Rao',
          handle: '@nishar',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
          text: 'Come before the DJ switches sets.',
          timestamp: '1m',
          likes: 4,
          distance: '1.2 km',
        },
      ],
    },
    {
      id: 'c2',
      userName: 'Aarya Singh',
      handle: '@aarya.moves',
      avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300',
      text: '@saikiran.now should save this for the weekend map.',
      timestamp: '9m',
      likes: 8,
      distance: '0.3 km',
    },
  ],
  p2: [
    {
      id: 'c3',
      userName: 'Noor Ali',
      handle: '@noor.eats',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
      text: 'The sound check was already fire when I walked past.',
      timestamp: '12m',
      likes: 6,
      distance: '1.4 km',
    },
  ],
  p3: [],
  trend_n1: [
    {
      id: 'tc1',
      userName: 'Mia Fernandes',
      handle: '@mia.afterdark',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
      text: 'The kebab line is moving fast tonight. Worth it.',
      timestamp: '5m',
      likes: 16,
      distance: '0.5 km',
    },
  ],
  trend_n2: [
    {
      id: 'tc2',
      userName: 'Arjun Malhotra',
      handle: '@arjunlive',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
      text: 'Crowd is building near the deck. Best view is on the right side.',
      timestamp: '3m',
      likes: 10,
      distance: '1.1 km',
    },
  ],
};

export function getCommentsForThread(threadId: string) {
  return commentsByPost[threadId] ?? [];
}

export const savedCollectionsData: SavedCollection[] = [
  {
    id: 's1',
    title: 'Nightlife radar',
    count: 18,
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
    accent: '#7C5CFF',
  },
  {
    id: 's2',
    title: 'Coffee runs',
    count: 12,
    cover: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200',
    accent: '#31D0AA',
  },
  {
    id: 's3',
    title: 'Hidden gems',
    count: 9,
    cover: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
    accent: '#FFB84D',
  },
];
