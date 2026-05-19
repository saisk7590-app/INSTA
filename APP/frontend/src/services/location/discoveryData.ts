import { Creator, NearbyItem, SearchCategory, SearchResult, SearchSuggestion } from '../../types/social';

export const nearbyTrending: NearbyItem[] = [
  {
    id: 'n1',
    title: 'Street Food Crawl',
    subtitle: '12 friends checking in now',
    distance: '400 m',
    category: 'Activity',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200',
    meta: 'Tonight until 11:30 PM',
  },
  {
    id: 'n2',
    title: 'Moonrise Rooftop',
    subtitle: 'Packed live set and creator meetup',
    distance: '1.1 km',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200',
    meta: 'Trending in your radius',
  },
  {
    id: 'n3',
    title: 'Third Wave Lab',
    subtitle: 'Creator-friendly coffee spot',
    distance: '650 m',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200',
    meta: '23 people saved this place',
  },
];

export const hashtags: SearchSuggestion[] = [
  { id: 'h1', label: '#nightmarket' },
  { id: 'h2', label: '#rooftopjam' },
  { id: 'h3', label: '#coffeehop' },
  { id: 'h4', label: '#hyderabadcreatives' },
];

export const creators: Creator[] = [
  {
    id: 'u1',
    name: 'Aarya',
    handle: '@aarya.moves',
    avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300',
    distance: '300 m',
    vibe: 'Dance clips + local jams',
    badge: 'Creator',
    mutuals: '12 mutual connections',
  },
  {
    id: 'u2',
    name: 'Kabir',
    handle: '@kabirwalks',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    distance: '900 m',
    vibe: 'Photo walks and pop-ups',
    badge: 'Creator',
    mutuals: '8 mutual connections',
  },
  {
    id: 'u3',
    name: 'Noor',
    handle: '@noor.eats',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    distance: '1.4 km',
    vibe: 'Hidden food spots nearby',
    badge: 'Business',
    mutuals: '5 mutual connections',
  },
];

export const nearbyEvents: NearbyItem[] = [
  {
    id: 'e1',
    title: 'Vinyl Listening Session',
    subtitle: 'Lo-fi set at 9 PM',
    distance: '0.9 km',
    category: 'Event',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
    meta: '32 interested',
  },
  {
    id: 'e2',
    title: 'Sunrise Run Club',
    subtitle: 'Meet by the lake entrance',
    distance: '2.1 km',
    category: 'Activity',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=1200',
    meta: 'Starts at 6:00 AM',
  },
];

export const nearbyBusinesses: NearbyItem[] = [
  {
    id: 'b1',
    title: 'Brew Block',
    subtitle: 'Coffee, pastries, creator tables',
    distance: '450 m',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200',
    meta: '4.8 rating',
  },
  {
    id: 'b2',
    title: 'Frame Theory',
    subtitle: 'Photo studio + workshop space',
    distance: '1.7 km',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200',
    meta: 'Open till midnight',
  },
];

export const recentSearches = ['Moonrise Rooftop', '#nightmarket', 'Brew Block'];
export const trendingSearches = ['Open mic tonight', 'Jubilee Hills coffee', '#hyderabadcreatives'];

export const searchTabs: SearchCategory[] = ['Top', 'Users', 'Places', 'Hashtags', 'Businesses'];

export const searchResults: SearchResult[] = [
  { id: 'r1', type: 'user', title: 'Aarya Singh', subtitle: '@aarya.moves • Dance clips + local jams', distance: '300 m' },
  { id: 'r2', type: 'place', title: 'Moonrise Rooftop', subtitle: 'Live set, cocktails, crowd energy', distance: '1.1 km' },
  { id: 'r3', type: 'hashtag', title: '#nightmarket', subtitle: '4.3k local posts in the last 24h' },
  { id: 'r4', type: 'business', title: 'Brew Block', subtitle: 'Coffee, creator tables, 4.8 rating', distance: '450 m' },
  { id: 'r5', type: 'post', title: 'Sunset set at Brew Block', subtitle: 'Trending nearby post from @nishar' },
];
