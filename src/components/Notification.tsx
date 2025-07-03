import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

export const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  const isSuccess = type === 'success';
  
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-slide-in ${
      isSuccess 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      {isSuccess ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      <span className="font-medium">{message}</span>
    </div>
  );
};