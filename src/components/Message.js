import React from 'react';

const Message = ({ variant, children }) => {
  const getAlertClasses = (variant) => {
    switch (variant) {
      case 'danger':
        return 'bg-black border-2 border-white text-white px-4 py-3 rounded';
      case 'success':
        return 'bg-black border-2 border-white text-white px-4 py-3 rounded';
      case 'warning':
        return 'bg-black border-2 border-white text-white px-4 py-3 rounded';
      case 'info':
        return 'bg-black border-2 border-white text-white px-4 py-3 rounded';
      default:
        return 'bg-white border-2 border-black text-black px-4 py-3 rounded';
    }
  };

  return (
    <div className={getAlertClasses(variant)}>
      {children}
    </div>
  );
};

export default Message;
