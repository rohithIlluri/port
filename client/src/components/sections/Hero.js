import React, { memo } from 'react';


const Hero = () => {
  return (
    <section id="about" className="py-8 relative liquid-wave group" aria-label="About section">
      <div className="glass-card p-8 lg:p-10 relative z-20 hover:glow transition-all duration-500">
        <div className="text-center lg:text-left">
          <div className="mb-6 group-hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-medium text-black/70 uppercase tracking-wider group-hover:text-black/90 transition-colors duration-300">Welcome to my Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-8 leading-tight text-black/90 group-hover:text-black transition-colors duration-300">
            Building the future through 
            <span className="font-bold block text-black group-hover:scale-105 transition-transform duration-300">Code & Innovation</span>
          </h1>
          <p className="text-base lg:text-lg text-black/80 leading-relaxed mb-10 max-w-3xl mx-auto lg:mx-0 group-hover:text-black/90 transition-colors duration-300">
            Graduate student passionate about creating minimalist, functional applications and exploring machine learning. 
            I focus on building scalable, efficient, and elegant solutions that make a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start group-hover:scale-105 transition-transform duration-300">
            <a 
              href="#projects" 
              className="liquid-button inline-flex items-center justify-center px-6 py-3 text-black font-medium rounded-lg text-sm uppercase tracking-wide focus:ring-2 focus:ring-black/20 focus:ring-offset-2 group/btn hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0l-4-4m4 4l-4 4"></path>
              </svg>
              Explore My Work
            </a>
            <a 
              href="#contact" 
              className="liquid-button inline-flex items-center justify-center px-6 py-3 border border-black/20 text-black font-medium rounded-lg text-sm uppercase tracking-wide focus:ring-2 focus:ring-black/20 focus:ring-offset-2 group/btn hover:scale-110 hover:shadow-2xl transition-all duration-300"
            >
              <svg className="w-4 h-4 mr-2 group-hover/btn:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-9.936 8.037L7 20l-4-4 4-4-4-4 7-.037C15.582 8 21 12.582 21 12z"></path>
              </svg>
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero); 