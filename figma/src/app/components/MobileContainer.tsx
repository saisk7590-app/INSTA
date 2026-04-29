import { ReactNode } from 'react';

interface MobileContainerProps {
  children: ReactNode;
  className?: string;
}

export function MobileContainer({ children, className = '' }: MobileContainerProps) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
      <div className={`relative w-full max-w-[1080px] h-screen max-h-[1920px] bg-white shadow-2xl overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}
