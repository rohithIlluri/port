import React, { memo } from 'react';


const Hero = () => {
  return (
    <section id="about" className="py-4 relative liquid-wave group" aria-label="About section">
      <div className="bg-white p-6 lg:p-8 relative z-20 shadow-lg border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-500">
        <div className="text-center lg:text-left">
          {/* <div className="mb-6 group-hover:scale-105 transition-transform duration-300">
            <span className="text-sm font-medium text-black/70 uppercase tracking-wider group-hover:text-black/90 transition-colors duration-300">Welcome to my Portfolio</span>
          </div> */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-8 leading-tight text-black/90 group-hover:text-black transition-colors duration-300">
            Just  
            <span className="font-bold block text-black group-hover:scale-105 transition-transform duration-300">Ship it.</span>
            </h1>
          {/* <p className="text-base lg:text-lg text-black/80 leading-relaxed mb-10 max-w-3xl mx-auto lg:mx-0 group-hover:text-black/90 transition-colors duration-300"> */}
            self taught developer, passionate about building products that make a difference.
          {/* </p> */}

         
        </div>
      </div>
    </section>
  );
};

export default memo(Hero); 