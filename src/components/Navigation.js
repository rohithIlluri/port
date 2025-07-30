import React from 'react';

const Navigation = ({ isMenuOpen, toggleMenu }) => {
  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-24">
          <div className="flex-shrink-0">
            <a href="#about" className="text-3xl font-bold tracking-tight text-black hover:text-black/80 transition-colors duration-200">
              Rohith Illuri
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-16">
            <a href="#about" className="text-black/70 hover:text-black transition-colors duration-200 font-medium text-base uppercase tracking-wide relative group pb-1">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full opacity-100"></span>
            </a>
            <a href="#skills" className="text-black/70 hover:text-black transition-colors duration-200 font-medium text-base uppercase tracking-wide relative group pb-1">
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full opacity-100"></span>
            </a>
            <a href="#projects" className="text-black/70 hover:text-black transition-colors duration-200 font-medium text-base uppercase tracking-wide relative group pb-1">
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full opacity-100"></span>
            </a>
            <a href="#contact" className="text-black/70 hover:text-black transition-colors duration-200 font-medium text-base uppercase tracking-wide relative group pb-1">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-200 group-hover:w-full opacity-100"></span>
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="p-3 rounded-md text-black/70 hover:text-black hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all duration-200">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-8 pt-3 pb-6 space-y-3 border-t border-black/10 bg-white/98">
          <a href="#about" onClick={toggleMenu} className="block px-4 py-3 rounded-md text-base font-medium text-black/70 hover:text-black hover:bg-black/5 transition-all duration-200">About</a>
          <a href="#skills" onClick={toggleMenu} className="block px-4 py-3 rounded-md text-base font-medium text-black/70 hover:text-black hover:bg-black/5 transition-all duration-200">Skills</a>
          <a href="#projects" onClick={toggleMenu} className="block px-4 py-3 rounded-md text-base font-medium text-black/70 hover:text-black hover:bg-black/5 transition-all duration-200">Projects</a>
          <a href="#contact" onClick={toggleMenu} className="block px-4 py-3 rounded-md text-base font-medium text-black/70 hover:text-black hover:bg-black/5 transition-all duration-200">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 