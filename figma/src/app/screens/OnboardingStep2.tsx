import { useNavigate } from 'react-router';
import { MapPin, Circle } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

export function OnboardingStep2() {
  const navigate = useNavigate();
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col bg-white">
        {/* Skip button */}
        <div className="flex justify-end p-6">
          <button 
            onClick={() => navigate('/signin')}
            className="text-gray-500 font-medium"
          >
            Skip
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="relative w-64 h-64 flex items-center justify-center mb-12">
            {/* Radius circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-4 border-purple-200 rounded-full opacity-40"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-purple-300 rounded-full opacity-60"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" fill="white" />
              </div>
            </div>
            
            {/* Dots representing posts */}
            <Circle className="absolute top-12 left-20 w-4 h-4 text-pink-500" fill="currentColor" />
            <Circle className="absolute top-20 right-16 w-4 h-4 text-orange-500" fill="currentColor" />
            <Circle className="absolute bottom-16 left-16 w-4 h-4 text-purple-500" fill="currentColor" />
            <Circle className="absolute bottom-20 right-20 w-4 h-4 text-pink-500" fill="currentColor" />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-4">
            Posts from Nearby
          </h2>
          <p className="text-gray-600 text-center text-lg leading-relaxed">
            See content only from people and places within 500 meters of your location.
          </p>
        </div>
        
        {/* Bottom section */}
        <div className="p-8">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          
          <button
            onClick={() => navigate('/onboarding/3')}
            className="w-full bg-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-purple-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
