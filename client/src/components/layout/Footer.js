import React from 'react';
import { COMPONENT_STYLES, FONT_SIZES } from '../../constants/theme';

const Footer = () => {
  return (
    <footer className="py-1 md:py-2 bg-white border-t border-gray-200 mt-4 md:mt-6 relative z-20 group shadow-lg border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <p className={`text-xs sm:text-sm text-black/70 group-hover:text-black/90 group-hover:font-medium transition-all duration-300`}>
          &copy; {new Date().getFullYear()} Rohith Illuri. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 