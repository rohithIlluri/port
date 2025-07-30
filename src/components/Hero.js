import React from 'react';

const Hero = () => {
  return (
    <section id="about" className="py-8">
      <div className="text-center lg:text-left">
        <div className="mb-2">
          <span className="text-sm font-medium text-black/70 uppercase tracking-wider">Hello, I'm</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-4 leading-tight text-black/90">
          Developer & 
          <span className="font-bold block text-black">Learner</span>
        </h1>
        <p className="text-sm lg:text-base text-black/80 leading-relaxed mb-6 max-w-2xl mx-auto lg:mx-0">
          Graduate student passionate about creating minimalist, functional applications and exploring machine learning. Building scalable, efficient, and elegant solutions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
          <a 
            href="#projects" 
            className="inline-flex items-center justify-center px-4 py-2 bg-black text-black font-medium rounded-none hover:bg-black/90 transition-all duration-200 text-xs sm:text-sm uppercase tracking-wide hover:scale-105 transform shadow-lg"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-4 py-2 border border-black text-black font-medium rounded-none hover:bg-black hover:text-white transition-all duration-200 text-xs sm:text-sm uppercase tracking-wide hover:scale-105 transform shadow-lg"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero; 