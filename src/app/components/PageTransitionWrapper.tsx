"use client"

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import PageLoader from './PageLoader';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
}

const PageTransitionWrapper = ({ children }: PageTransitionWrapperProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Don't show loader on initial load
    if (currentPath && currentPath !== pathname) {
      setIsLoading(true);

      // Hide loader after animation completes (reduced time to prevent lagging)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1200);

      return () => clearTimeout(timer);
    }

    setCurrentPath(pathname);
  }, [pathname, currentPath]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <PageLoader
            key="page-loader"
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {children}
    </>
  );
};

export default PageTransitionWrapper;
