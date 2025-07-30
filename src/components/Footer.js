import React from 'react';

const Footer = () => {
  return (
    <footer className="py-4 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 text-center">
        <p className="text-xs">&copy; {new Date().getFullYear()} Rohith Illuri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 