import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { projects } from '@/data/projects';
import { api } from '@/services/api';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { MapPin, Calendar, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];
  const { lang = 'en' } = useParams<{ lang: string }>();
  const [filter, setFilter] = useState<string>('All');
  const [projectList, setProjectList] = useState(projects);
  const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
  const categories = ['All', 'Residential', 'Commercial', 'Industrial'];
  const filtered = filter === 'All' ? projectList : projectList.filter(p => p.category === filter);

  useEffect(() => {
    api.getProjects(currentLanguage).then(data => {
      if (data.length) setProjectList(data);
    }).catch(() => setProjectList(projects));
  }, [currentLanguage]);

  const getProjectImages = (project: any) => {
    return [project.image, ...(project.images || [])];
  };

  const nextImage = (projectId: string, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (projectId: string, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  return (
    <>
      <Helmet>
        <title>Projects | LIXI Energy Systems</title>
        <meta name="description" content="Explore our completed solar and battery storage installations across EU, Africa, and Caribbean." />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        {/* Hero */}
        <section className="py-24 grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-h2 text-brand-white mb-6">
              Our Projects
            </motion.h1>
            <p className="text-xl text-brand-white/70 max-w-3xl mx-auto mb-12">
              Real installations. Real results. From residential homes to industrial microgrids.
            </p>

            {/* Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-6 py-3 rounded-full font-bold transition-all ${
                    filter === cat 
                      ? 'bg-brand-green text-brand-black' 
                      : 'bg-brand-grey text-brand-white hover:bg-brand-greyMid'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project, index) => {
                const projectImages = getProjectImages(project);
                const currentIndex = imageIndexes[project.id] || 0;
                return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card glass hover className="h-full overflow-hidden group cursor-pointer" onClick={() => navigate(`/${lang}/projects/${project.id}`)}>
                    <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-brand-greyMid">
                      <img 
                        src={projectImages[currentIndex]} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {projectImages.length > 1 && (
                        <>
                          <button onClick={() => prevImage(project.id, projectImages.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
                            <ChevronLeft size={20} />
                          </button>
                          <button onClick={() => nextImage(project.id, projectImages.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full">
                            <ChevronRight size={20} />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {projectImages.map((_, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-brand-green' : 'bg-white/50'}`} />
                            ))}
                          </div>
                        </>
                      )}
                      <div className="absolute top-4 right-4">
                        <Badge variant="green">{project.category}</Badge>
                      </div>
                    </div>

                    <h3 className="font-display text-2xl text-brand-white mb-3">
                      {project.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-brand-white/70 text-sm">
                        <MapPin size={16} className="mr-2 text-brand-green" />
                        <span className="mr-2">{project.flag}</span>
                        {project.location}, {project.country}
                      </div>
                      <div className="flex items-center text-brand-white/70 text-sm">
                        <Zap size={16} className="mr-2 text-brand-green" />
                        {project.system} • {project.capacity}
                      </div>
                      <div className="flex items-center text-brand-white/70 text-sm">
                        <Calendar size={16} className="mr-2 text-brand-green" />
                        {project.year}
                      </div>
                    </div>

                    <p className="text-brand-white/70 text-sm">
                      {project.description}
                    </p>
                  </Card>
                </motion.div>
              );})}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-brand-grey">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '1,200+', label: 'Systems Installed' },
                { value: '15 MW', label: 'Total Capacity' },
                { value: '3', label: 'Continents' },
                { value: '99.9%', label: 'Uptime' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-5xl font-display text-brand-green mb-2">{stat.value}</div>
                  <div className="text-brand-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;
