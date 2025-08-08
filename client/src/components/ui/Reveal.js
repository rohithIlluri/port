import React, { useEffect, useRef, useState } from 'react';

/**
 * Bidirectional on-scroll reveal wrapper.
 * - Fades in and lifts content with Apple-like easing
 * - Works for both upward and downward scrolling
 * - Respects prefers-reduced-motion
 * - Handles edge cases and cleanup properly
 */
const Reveal = ({ children, as: Tag = 'div', delay = 0, className = '', direction = 'up' }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            // Keep observing for re-entry when scrolling back up
          }
        });
      },
      { 
        rootMargin: '0px 0px -15% 0px', 
        threshold: [0, 0.1, 0.5, 1.0] 
      }
    );

    observer.observe(element);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasAnimated]);

  // Reset animation when element goes out of view (for bidirectional)
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
      
      if (isOutOfView && hasAnimated) {
        setIsVisible(false);
        setHasAnimated(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasAnimated]);

  const getTransformClass = () => {
    if (direction === 'down') {
      return isVisible ? 'translate-y-0' : 'translate-y-4';
    }
    if (direction === 'left') {
      return isVisible ? 'translate-x-0' : 'translate-x-4';
    }
    if (direction === 'right') {
      return isVisible ? 'translate-x-0' : '-translate-x-4';
    }
    // Default: up
    return isVisible ? 'translate-y-0' : '-translate-y-4';
  };

  return (
    <Tag
      ref={ref}
      className={[
        'transform will-change-transform',
        'transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        isVisible ? 'opacity-100' : 'opacity-0',
        getTransformClass(),
        className,
      ].join(' ')}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;

