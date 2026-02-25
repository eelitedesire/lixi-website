import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from '@/data/blog';
import { IMAGES } from '@/data/images';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const blogImages: Record<string, string> = {
  'lifepo4-vs-nmc': IMAGES.battery_cells_close,
  'mppt-explained': IMAGES.solar_panels_close,
  'electricity-trading': IMAGES.energy_trading,
  'off-grid-vs-grid-tie': IMAGES.home_energy_independence,
  'catl-cells': IMAGES.catl_factory,
  'deye-inverter-setup': IMAGES.inverter_install,
};

const BlogPost = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <div className="pt-20 min-h-screen bg-[#060a07] text-white flex items-center justify-center">Post not found</div>;

  return (
    <>
      <Helmet><title>{post.title} | LIXI Blog</title></Helmet>
      <div className="pt-20 bg-[#060a07] min-h-screen">
        <article className="max-w-4xl mx-auto px-6 py-24">
          <Link to={`/${currentLanguage}/blog`} className="inline-flex items-center text-brand-green hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} className="mr-2" /> Back to Blog
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-block bg-brand-green/20 text-brand-green px-4 py-2 rounded-full text-sm font-bold mb-6">
              {post.category}
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-white/40 mb-8">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden mb-12 h-96">
              <img 
                src={blogImages[post.slug] || IMAGES.solar_panels_roof} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060a07] via-transparent to-transparent" />
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-white/80 leading-relaxed whitespace-pre-line text-lg">{post.content}</div>
            </div>
          </motion.div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;
