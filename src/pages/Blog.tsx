import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { blogPosts } from '@/data/blog';
import { api } from '@/services/api';
import { IMAGES } from '@/data/images';
import { Clock, Calendar } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState(blogPosts);

  useEffect(() => {
    api.getBlogPosts().then(data => {
      if (data.length) setPosts(data);
    }).catch(() => setPosts(blogPosts));
  }, []);

  return (
    <>
      <Helmet><title>Blog | LIXI Energy Systems</title></Helmet>
      <div className="pt-20 bg-[#060a07] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-4">Blog & Resources</h1>
            <p className="text-xl text-white/60">Expert insights on solar energy, battery storage, and sustainable power</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-2xl overflow-hidden border border-white/5 hover:border-brand-green/30 transition-all duration-500 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image || IMAGES.solar_panels_roof} 
                        alt={post.title} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                          {post.category}
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#0d1410] p-6 flex-1 flex flex-col">
                      <h2 className="text-white text-xl font-bold mb-3 group-hover:text-brand-green transition-colors">{post.title}</h2>
                      <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
