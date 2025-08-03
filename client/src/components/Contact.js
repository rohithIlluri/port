import React, { memo } from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-8 relative overflow-hidden" aria-label="Contact section">
      <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] via-white to-black/[0.01] rounded-lg"></div>
      <div className="relative bg-white/70 backdrop-blur-sm border border-black/5 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 p-8 lg:p-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl font-light mb-6 text-black/90">Get In Touch</h2>
          <div className="w-16 h-px bg-black/30 mx-auto mb-6"></div>
          <p className="text-sm text-black/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to collaborate? Feel free to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="mailto:rohith.illuri@gmail.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-black font-medium rounded-md hover:bg-black/80 transition-all duration-300 text-sm uppercase tracking-wide hover:scale-105 hover:shadow-lg transform shadow-md group"
            >
              <svg className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Say Hello
            </a>
            <a
              href="https://github.com/rohithIlluri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-black/20 text-black font-medium rounded-md hover:bg-black hover:text-black hover:border-black transition-all duration-300 text-sm uppercase tracking-wide hover:scale-105 hover:shadow-lg transform shadow-md group"
            >
              <svg className="w-4 h-4 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Contact); 