import React, { memo } from 'react';
import { COMPONENT_STYLES, FONT_SIZES } from '../../constants/theme';

const Hero = () => {
  return (
    <section id="hero" className={COMPONENT_STYLES.section.base} aria-label="Hero section">
      <div className={COMPONENT_STYLES.section.container}>
        <h1 className={`${FONT_SIZES['4xl']} lg:${FONT_SIZES['5xl']} font-bold text-black mb-8`}>
          Rohith Illuri
        </h1>
        
        <div className="mb-8">
          <h2 className={`${FONT_SIZES.lg} font-bold text-black mb-3`}>about</h2>
          <div className="space-y-2 text-black/70">
            <p>tldr;self-taught developer by shipping things on the internet</p>
            <p>into tech and physics – things that shape the expanding universe</p>
            <p>fascinated by space, science, and ideas that expand the mind</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className={`${FONT_SIZES.lg} font-bold text-black mb-3`}>Socials</h2>
          <div className="flex space-x-3">
            <a href="#" className={COMPONENT_STYLES.button.icon}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className={COMPONENT_STYLES.button.icon}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.047-1.032-3.047-1.032 0-1.26 1.317-1.26 2.676v4.939h-3.493v-9.26c0-2.791 1.672-3.458 3.888-3.458 1.112 0 2.04.059 2.58.064v2.994h-.057c-1.126-.107-1.379.537-1.379 1.18v4.4h3.493z"/>
              </svg>
            </a>
            <a href="#" className={COMPONENT_STYLES.button.icon}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className={COMPONENT_STYLES.button.icon}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-1.608-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 1.804 4.37a.07.07 0 0 0-.032.027C.533 6.726-.32 9.1-.32 9.1a20.02 20.02 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.9 14.9 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a20.087 20.087 0 0 0 6.002-3.03a19.75 19.75 0 0 0 1.01-1.466a.07.07 0 0 0-.032-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <a href="#" className={COMPONENT_STYLES.button.icon}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2 0v12h20V4H2z"/>
                <path d="M2 4l10 7 10-7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero); 