import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import {Github} from "lucide-react";

interface LoginButtonProps extends ButtonProps {
  className?: string;
}
const LoginButton: React.FC<LoginButtonProps> = ({ className, ...props }) => {

  return (
    <Button
      variant="default"
      size="lg"
      className={`w-full max-w-sm font-semibold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl ${className}`}
      {...props}
    >
      <Github className="mr-2 w-6 h-6" />
      Login with GitHub
    </Button>   
  );
};

export { LoginButton };
