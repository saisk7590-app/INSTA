import { useNavigate } from 'react-router';
import { Users } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

export function OnboardingStep1() {
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
          <div className="w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-12">
            <Users className="w-32 h-32 text-purple-500" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-3xl font-bold text-center mb-4">
            Welcome to NearBy
          </h2>
          <p className="text-gray-600 text-center text-lg leading-relaxed">
            Discover what's happening around you. Connect with your local community.
          </p>
        </div>
        
        {/* Bottom section */}
        <div className="p-8">
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
          
          <button
            onClick={() => navigate('/onboarding/2')}
            className="w-full bg-purple-500 text-white py-4 rounded-2xl font-semibold text-lg hover:bg-purple-600 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
