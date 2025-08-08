import React, { memo } from 'react';
import Reveal from '../ui/Reveal';

const Hero = () => {
  return (
    <section id="about" className="py-8 relative" aria-label="About section">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-black/[0.01] to-black/[0.02] rounded-lg"></div>
      <Reveal className="relative bg-white/60 backdrop-blur-sm border border-black/5 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-8 lg:p-10">
        <div className="text-center lg:text-left">
          <Reveal as="div" delay={50} className="mb-6">
            <span className="text-sm font-medium text-black/70 uppercase tracking-wider">Welcome to my Portfolio</span>
          </Reveal>
          <Reveal as="h1" delay={120} className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-8 leading-tight text-black/90">
            Building the future through 
            <span className="font-bold block text-black">Code & Innovation</span>
          </Reveal>
          <Reveal as="p" delay={200} className="text-base lg:text-lg text-black/80 leading-relaxed mb-10 max-w-3xl mx-auto lg:mx-0">
            Graduate student passionate about creating minimalist, functional applications and exploring machine learning. 
            I focus on building scalable, efficient, and elegant solutions that make a difference.
          </Reveal>
          <Reveal as="div" delay={260} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <a 
              href="#projects" 
              className="inline-flex items-center justify-center px-6 py-3 bg-black text-black font-medium rounded-sm hover:bg-black/80 transition-all duration-300 text-sm uppercase tracking-wide hover:scale-105 hover:shadow-lg transform shadow-md focus:ring-2 focus:ring-black/20 focus:ring-offset-2 group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0l-4-4m4 4l-4 4"></path>
              </svg>
              Explore My Work
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 border border-black/20 text-black font-medium rounded-sm hover:bg-black hover:text-black hover:border-black transition-all duration-300 text-sm uppercase tracking-wide hover:scale-105 hover:shadow-lg transform shadow-md focus:ring-2 focus:ring-black/20 focus:ring-offset-2 group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.418 8-9.936 8.037L7 20l-4-4 4-4-4-4 7-.037C15.582 8 21 12.582 21 12z"></path>
              </svg>
              Let's Connect
            </a>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
};

export default memo(Hero); 