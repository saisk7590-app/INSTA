import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, Image as ImageIcon, MapPin } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

export function PostCreation() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [hasImage, setHasImage] = useState(false);
  
  const handlePost = () => {
    // In a real app, this would upload the post
    navigate('/home');
  };
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button 
            onClick={() => navigate('/home')}
            className="text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Create Post</h1>
          <button 
            onClick={handlePost}
            className="text-purple-500 font-semibold"
          >
            Post
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Image Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Photo
            </label>
            <div 
              onClick={() => setHasImage(!hasImage)}
              className="w-full aspect-square bg-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border-2 border-dashed border-gray-300"
            >
              {!hasImage ? (
                <>
                  <ImageIcon className="w-16 h-16 text-gray-400 mb-3" />
                  <p className="text-gray-500 font-medium">Tap to upload photo</p>
                  <p className="text-gray-400 text-sm mt-1">or drag and drop</p>
                </>
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MjczNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Preview"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white font-medium">Tap to change</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Caption */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={4}
            />
          </div>
          
          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Location
            </label>
            <div className="flex items-center gap-3 px-4 py-4 bg-purple-50 border border-purple-200 rounded-xl">
              <MapPin className="w-5 h-5 text-purple-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-900">Nearby</p>
                <p className="text-xs text-purple-600">Visible within 500 m radius</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your post will be visible to people within 500 meters of your current location.
            </p>
          </div>
          
          {/* Additional Options */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between px-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-700">Tag People</span>
              <span className="text-gray-400">›</span>
            </button>
            
            <button className="w-full flex items-center justify-between px-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <span className="text-sm font-medium text-gray-700">Add Music</span>
              <span className="text-gray-400">›</span>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
