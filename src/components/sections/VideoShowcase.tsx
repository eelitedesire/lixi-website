import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

interface VideoShowcaseProps {
  title?: string;
  subtitle?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  description?: string;
}

const VideoShowcase = ({ 
  title = 'See LIXI in Action',
  subtitle = 'Experience the Future',
  videoUrl = '',
  thumbnailUrl = '',
  description = 'Discover how LIXI battery systems are transforming energy storage worldwide.'
}: VideoShowcaseProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <section className="py-24 bg-[#060a07] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,200,83,0.08),transparent_60%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="mono-label text-brand-green">{subtitle}</span>
          <h2 className="text-white mt-2 text-5xl lg:text-6xl font-bold">
            {title}
          </h2>
          <p className="text-white/60 text-lg mt-4 max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video bg-[#0d1410]">
            {!isPlaying ? (
              <>
                <img 
                  src={thumbnailUrl || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200'} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <button
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <div className="w-24 h-24 rounded-full bg-brand-green/90 backdrop-blur flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play size={36} className="text-brand-black ml-1" fill="currentColor" />
                  </div>
                </button>
              </>
            ) : (
              <iframe
                src={getEmbedUrl(videoUrl)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          
          <div className="absolute -z-10 top-8 left-1/2 -translate-x-1/2 w-[90%] h-full bg-brand-green/20 rounded-3xl blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase;
