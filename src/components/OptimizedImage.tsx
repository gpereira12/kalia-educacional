import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  blurDataURL?: string;
  priority?: boolean;
  aspectRatio?: string;
}

const OptimizedImage = ({
  src,
  alt,
  fallbackSrc = "/cia-de-jesus/sem-imagem.png",
  blurDataURL,
  priority = false,
  sizes,
  aspectRatio,
  className,
  ...props
}: OptimizedImageProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error' | 'fallback-loading' | 'fallback-loaded' | 'failed'>(priority ? 'loading' : 'loading');
  const [inView, setInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    if (status === 'fallback-loading') {
      setStatus('fallback-loaded');
    } else {
      setStatus('loaded');
    }
  };

  const handleError = () => {
    if (status === 'error' || status === 'fallback-loading' || status === 'failed') {
      setStatus('failed');
      return;
    }
    
    if (src === fallbackSrc || !fallbackSrc) {
      setStatus('failed');
    } else {
      setStatus('error');
      // Briefly set to fallback-loading to trigger the change
      setTimeout(() => setStatus('fallback-loading'), 0);
    }
  };

  const imgSrc = (status === 'error' || status === 'fallback-loading' || status === 'fallback-loaded' || status === 'failed') 
    ? (status === 'failed' ? "" : fallbackSrc) 
    : src;

  const isLoaded = status === 'loaded' || status === 'fallback-loaded';


  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)} style={{ aspectRatio }}>

      {/* Main Image */}
      {inView && (
        <img
          src={imgSrc}
          alt={alt}
          sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
