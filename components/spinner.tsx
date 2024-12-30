import { useState, useEffect } from "react";

export default function LoadingSpinner() {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true); 
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inset-0 flex items-center justify-center">
      {!showMessage ? (
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      ) : (
        <div className="text-center text-gray-800 font-semibold">
          Log in to store chat history
        </div>
      )}
    </div>
  );
}
