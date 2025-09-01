import { useState, useCallback } from 'react';

export const usePageLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => {
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const triggerLoader = useCallback((duration: number = 1200) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, duration);
  }, []);

  return {
    isLoading,
    showLoader,
    hideLoader,
    triggerLoader,
  };
};
