import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface PostCardProps {
  userImage: string;
  userName: string;
  distance: string;
  postImage: string;
  caption: string;
  likes?: number;
  comments?: number;
}

export function PostCard({ 
  userImage, 
  userName, 
  distance, 
  postImage, 
  caption,
  likes = 0,
  comments = 0
}: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <img 
          src={userImage} 
          alt={userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold text-sm">{userName}</p>
          <p className="text-xs text-gray-500">{distance}</p>
        </div>
        <button className="text-gray-600">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <circle cx="10" cy="4" r="1.5"/>
            <circle cx="10" cy="10" r="1.5"/>
            <circle cx="10" cy="16" r="1.5"/>
          </svg>
        </button>
      </div>
      
      {/* Image */}
      <div className="w-full aspect-square bg-gray-100">
        <img 
          src={postImage} 
          alt="Post" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button className="hover:opacity-70 transition-opacity">
            <Heart className="w-6 h-6" />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <MessageCircle className="w-6 h-6" />
          </button>
          <button className="hover:opacity-70 transition-opacity">
            <Send className="w-6 h-6" />
          </button>
          <button className="ml-auto hover:opacity-70 transition-opacity">
            <Bookmark className="w-6 h-6" />
          </button>
        </div>
        
        {/* Likes */}
        {likes > 0 && (
          <p className="font-semibold text-sm mb-2">{likes.toLocaleString()} likes</p>
        )}
        
        {/* Caption */}
        <p className="text-sm">
          <span className="font-semibold mr-2">{userName}</span>
          {caption}
        </p>
        
        {/* Comments preview */}
        {comments > 0 && (
          <button className="text-sm text-gray-500 mt-2">
            View all {comments} comments
          </button>
        )}
      </div>
    </div>
  );
}
