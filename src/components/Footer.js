import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 md:py-8 bg-black text-black mt-12 md:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <p className="text-xs sm:text-sm text-black">&copy; {new Date().getFullYear()} Rohith Illuri. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 