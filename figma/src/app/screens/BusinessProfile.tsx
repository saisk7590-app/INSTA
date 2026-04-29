import { useNavigate } from 'react-router';
import { ArrowLeft, Phone, MapPin as MapPinIcon, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

const businessData = {
  name: "The Local Bakery",
  tagline: "Fresh baked goods every morning",
  bannerImage: "https://images.unsplash.com/photo-1649436401481-f4128d7a3585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllcyUyMGRpc3BsYXl8ZW58MXx8fHwxNzc1MjkyOTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  logoImage: "https://images.unsplash.com/photo-1705830337569-47a1a24b0ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBjYXN1YWx8ZW58MXx8fHwxNzc1MjM1NTE3fDA&ixlib=rb-4.1.0&q=80&w=200",
  distance: "250 m away",
  description: "Artisan bakery specializing in sourdough bread, croissants, and custom cakes. Family-owned since 2015.",
  posts: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1649436401481-f4128d7a3585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllcyUyMGRpc3BsYXl8ZW58MXx8fHwxNzc1MjkyOTI3fDA&ixlib=rb-4.1.0&q=80&w=600",
      likes: 45,
      comments: 8
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc1MjczNDQyfDA&ixlib=rb-4.1.0&q=80&w=600",
      likes: 32,
      comments: 5
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1524584830732-b69165ddba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc3NTI5MjkyNXww&ixlib=rb-4.1.0&q=80&w=600",
      likes: 67,
      comments: 12
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1774268503699-5fad483fa226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHBhcmslMjBuYXR1cmV8ZW58MXx8fHwxNzc1MjkyOTI1fDA&ixlib=rb-4.1.0&q=80&w=600",
      likes: 28,
      comments: 4
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1665482955116-8226c353a5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjaXR5JTIwc2t5bGluZXxlbnwxfHx8fDE3NzUyNDE4MTJ8MA&ixlib=rb-4.1.0&q=80&w=600",
      likes: 54,
      comments: 9
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1764391785553-a42d650feac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMHNob3AlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzUyOTI5Mjd8MA&ixlib=rb-4.1.0&q=80&w=600",
      likes: 39,
      comments: 7
    },
  ]
};

export function BusinessProfile() {
  const navigate = useNavigate();
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col bg-white">
        {/* Header with back button */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4">
          <button 
            onClick={() => navigate('/home')}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Banner */}
          <div className="relative w-full h-64 bg-gray-200">
            <img 
              src={businessData.bannerImage}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            {/* Logo overlapping banner */}
            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 bg-white rounded-3xl shadow-xl border-4 border-white overflow-hidden">
                <img 
                  src={businessData.logoImage}
                  alt={businessData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Name and distance */}
            <h1 className="text-2xl font-bold mb-1">{businessData.name}</h1>
            <p className="text-sm text-gray-500 mb-2">{businessData.distance}</p>
            <p className="text-gray-700 mb-4">{businessData.tagline}</p>
            
            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors">
                <Phone className="w-4 h-4" />
                Call
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl font-medium hover:bg-purple-600 transition-colors">
                <MapPinIcon className="w-4 h-4" />
                Directions
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Visit
              </button>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">About</h2>
              <p className="text-gray-700 leading-relaxed">{businessData.description}</p>
            </div>
            
            {/* Posts grid */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4">Posts</h2>
              <div className="grid grid-cols-2 gap-2">
                {businessData.posts.map((post) => (
                  <div key={post.id} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
                    <img 
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <div className="flex items-center gap-1 text-white">
                        <Heart className="w-5 h-5" fill="white" />
                        <span className="font-medium">{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white">
                        <MessageCircle className="w-5 h-5" fill="white" />
                        <span className="font-medium">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
