import { useState, useCallback } from 'react';
export const useErrorHandler = (initialState = null) => {
  const [error, setError] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const handleError = useCallback((error) => {
    console.error('Error caught by useErrorHandler:', error);
    setError(error.message || 'An unexpected error occurred');
    setIsLoading(false);
  }, []);
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  const executeWithErrorHandling = useCallback(async (asyncFunction, ...args) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await asyncFunction(...args);
      setIsLoading(false);
      return result;
    } catch (error) {
      handleError(error);
      return null;
    }
  }, [handleError]);
  return {
    error,
    isLoading,
    handleError,
    clearError,
    executeWithErrorHandling
  };
};
