import React, { useEffect } from 'react';
import logo from './todoslogo.png'
export default function Notification({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="notification">
     <img src={logo} alt=""/> {message} 
    </div>
  );
}
