import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds (e.g. 100, 200)
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number; // in milliseconds
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 600,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const currentElem = elementRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [once]);

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
      case 'down':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8';
      case 'left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8';
      case 'right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8';
      case 'none':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all ease-out ${getDirectionClasses()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};
