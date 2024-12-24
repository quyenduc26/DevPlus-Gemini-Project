import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';

import Image from 'next/image';

interface LoginButtonProps extends ButtonProps {
  className?: string;
  icon: string;
  provider: string;
}
const LoginButton: React.FC<LoginButtonProps> = ({
  className,
  icon,
  provider,
  ...props
}) => {
  return (
    <>
      <Button
        variant="default"
        size="lg"
        className={`w-full max-w-sm transform font-semibold shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${className}`}
        {...props}
      >
        <Image src={icon} alt={provider + ' logo'} className="h-6 w-6" />
        Login with {provider}
      </Button>
    </>
  );
};

export { LoginButton };
