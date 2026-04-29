import { useNavigate } from 'react-router';
import { MapPin, Navigation } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

export function OnboardingStep3() {
  const navigate = useNavigate();
  
  const handleAllow = () => {
    // In a real app, this would request location permission
    navigate('/signin');
  };
  
  const handleNotNow = () => {
    navigate('/signin');
  };
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col bg-white">
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-12 relative">
            <Navigation className="w-32 h-32 text-purple-500" strokeWidth={1.5} />
            <div className="absolute top-8 right-12">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-4">
            Enable Location
          </h2>
          <p className="text-gray-600 text-center text-lg leading-relaxed mb-2">
            We need your location to show you nearby posts and connect you with your local community.
          </p>
          <p className="text-gray-500 text-center text-sm">
            Your exact location is never shared publicly.
          </p>
        </div>
        
        {/* Bottom section */}
        <div className="p-8">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
          </div>
          
          <button
            onClick={handleAllow}
            className="w-full bg-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-purple-600 transition-colors mb-3"
          >
            Allow Location Access
          </button>
          
          <button
            onClick={handleNotNow}
            className="w-full bg-gray-100 text-gray-700 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Not Now
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
