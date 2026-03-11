import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  autoPlay = true, 
  interval = 4000, 
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, images.length, interval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className={`bg-brand-grey rounded-2xl flex items-center justify-center ${className}`}>
        <span className="text-white/50">No images available</span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative rounded-2xl overflow-hidden ${className}`}>
        <img 
          src={images[0]} 
          alt="Product" 
          className="w-full h-full object-cover" 
        />
      </div>
    );
  }

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden group ${className}`}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(autoPlay)}
    >
      {/* Main Image */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Product image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronLeft size={20} />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-brand-green w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageCarousel;