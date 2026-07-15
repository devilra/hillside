import React from 'react';

export default function Container({ children, className = "" }) {
  return (
    <div className={`max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 w-full ${className}`}>
      {children}
    </div>
  );
}