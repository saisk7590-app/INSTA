import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Home, Search, PlusSquare, Heart, User, Loader2 } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';
import { PostCard } from '../components/PostCard';

const mockPosts = [
  {
    id: 1,
    userImage: "https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBjYXN1YWx8ZW58MXx8fHwxNzc1MjM1NTE3fDA&ixlib=rb-4.1.0&q=80&w=200",
    userName: "Sarah Chen",
    distance: "150 m away",
    postImage: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MjczNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Best coffee spot in the neighborhood! ☕ Who wants to join me?",
    likes: 42,
    comments: 8
  },
  {
    id: 2,
    userImage: "https://images.unsplash.com/photo-1611095006856-19f5ffdca7f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwY2FzdWFsfGVufDF8fHx8MTc3NTIzNDk0Mnww&ixlib=rb-4.1.0&q=80&w=200",
    userName: "Mike Rodriguez",
    distance: "320 m away",
    postImage: "https://images.unsplash.com/photo-1524584830732-b69165ddba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc3NTI5MjkyNXww&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Night market is back! 🌮 Come check out all the amazing food stalls",
    likes: 128,
    comments: 23
  },
  {
    id: 3,
    userImage: "https://images.unsplash.com/photo-1545311630-51ea4a4c84de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwaGFwcHklMjBzbWlsaW5nfGVufDF8fHx8MTc3NTI5MjkyNnww&ixlib=rb-4.1.0&q=80&w=200",
    userName: "Emma Wilson",
    distance: "450 m away",
    postImage: "https://images.unsplash.com/photo-1774268503699-5fad483fa226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzc1MjkyOTI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Morning walk at the local park 🌿 The weather is perfect today!",
    likes: 67,
    comments: 12
  },
  {
    id: 4,
    userImage: "https://images.unsplash.com/photo-1554765345-6ad6a5417cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMG1hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzUyMDk4NTV8MA&ixlib=rb-4.1.0&q=80&w=200",
    userName: "James Park",
    distance: "280 m away",
    postImage: "https://images.unsplash.com/photo-1665482955116-8226c353a5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzUyNDE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Sunset view from my balcony 🌅 Living in this neighborhood is amazing",
    likes: 93,
    comments: 15
  },
];

export function HomeFeed() {
  const navigate = useNavigate();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 100;
    
    if (bottom && !isLoadingMore) {
      setIsLoadingMore(true);
      // Simulate loading more posts
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 1500);
    }
  };
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              NearBy
            </h1>
            <button 
              onClick={() => navigate('/notifications')}
              className="relative"
            >
              <Heart className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            </button>
          </div>
        </div>
        
        {/* Feed */}
        <div 
          className="flex-1 overflow-y-auto px-4 py-4"
          onScroll={handleScroll}
        >
          {mockPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
          
          {/* Loading indicator */}
          {isLoadingMore && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-purple-500 animate-spin" />
              <span className="ml-2 text-gray-500">Loading more posts...</span>
            </div>
          )}
          
          {/* Scroll indicator */}
          {!isLoadingMore && (
            <div className="text-center py-4 text-gray-400 text-sm">
              Scroll down for more posts
            </div>
          )}
        </div>
        
        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-purple-500">
              <Home className="w-6 h-6" fill="currentColor" />
              <span className="text-xs font-medium">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <Search className="w-6 h-6" />
              <span className="text-xs">Search</span>
            </button>
            <button 
              onClick={() => navigate('/create-post')}
              className="flex flex-col items-center gap-1 text-gray-400"
            >
              <PlusSquare className="w-6 h-6" />
              <span className="text-xs">Post</span>
            </button>
            <button 
              onClick={() => navigate('/notifications')}
              className="flex flex-col items-center gap-1 text-gray-400 relative"
            >
              <Heart className="w-6 h-6" />
              <span className="text-xs">Activity</span>
              <div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400">
              <User className="w-6 h-6" />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
