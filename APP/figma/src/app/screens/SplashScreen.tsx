import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MapPin } from 'lucide-react';
import { MobileContainer } from '../components/MobileContainer';

export function SplashScreen() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding/1');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <MobileContainer>
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-2xl mb-6">
            <MapPin className="w-12 h-12 text-purple-500" strokeWidth={2.5} />
          </div>
          <h1 className="text-white text-4xl font-bold mb-2">NearBy</h1>
          <p className="text-white/90 text-lg">Connect with your neighborhood</p>
        </div>
        
        {/* Loading indicator */}
        <div className="absolute bottom-20">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
