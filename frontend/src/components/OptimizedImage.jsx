import React, { useState } from 'react';

/**
 * OptimizedImage component for ultra-fast Cloudinary CDN delivery
 * Automatically injects f_auto, q_auto, width scaling, and smooth shimmer loading state.
 */
export default function OptimizedImage({
  src,
  alt = 'Cozy Cup item',
  className = '',
  containerClassName = '',
  width = 800,
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to ensure Cloudinary url has f_auto, q_auto, and optimal width scaling
  const getOptimizedSrc = (url) => {
    if (!url || typeof url !== 'string') return url;
    if (url.includes('res.cloudinary.com')) {
      // If already has f_auto,q_auto, return directly or inject width limit
      if (!url.includes('f_auto,q_auto')) {
        return url.replace('/image/upload/', `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
      }
      return url;
    }
    return url;
  };

  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Shimmer Placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#EBE5D8] animate-pulse flex items-center justify-center">
          <svg className="w-6 h-6 text-[#201B15]/20 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      )}

      {/* Main Image */}
      <img
        src={optimizedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
}
