import React from 'react';
import Reveal from '../ui/Reveal';

const Footer = () => {
  return (
    <footer className="py-6 md:py-8 bg-white/80 backdrop-blur-sm border-t border-black/10 mt-12 md:mt-16">
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <p className="text-xs sm:text-sm text-black/70">&copy; {new Date().getFullYear()} Rohith Illuri. All rights reserved.</p>
      </Reveal>
    </footer>
  );
};

export default Footer; 