import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projects } from '@/data/projects';
import { api } from '@/services/api';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { MapPin, Calendar, Zap, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language.split('-')[0];
  const [projectList, setProjectList] = useState(projects);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    api.getProjects().then(data => {
      if (data.length) setProjectList(data);
    }).catch(() => setProjectList(projects));
  }, []);

  const project = projectList.find(p => p.id === id);

  if (!project) {
    return (
      <div className="pt-20 bg-brand-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-brand-white mb-4">Project Not Found</h1>
          <Button onClick={() => navigate(`/${currentLanguage}/projects`)}>Back to Projects</Button>
        </div>
      </div>
    );
  }

  const allImages = [project.image, ...(project.images || [])];

  return (
    <>
      <Helmet>
        <title>{project.title} | LIXI Energy Systems</title>
        <meta name="description" content={project.description} />
      </Helmet>

      <div className="pt-20 bg-brand-black min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={() => navigate(`/${currentLanguage}/projects`)} className="flex items-center text-brand-green hover:text-brand-greenDim mb-8 transition">
            <ArrowLeft className="mr-2" size={20} />
            Back to Projects
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div>
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-brand-greyMid mb-4">
                <img 
                  src={allImages[currentImageIndex]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button onClick={() => setCurrentImageIndex((currentImageIndex - 1 + allImages.length) % allImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => setCurrentImageIndex((currentImageIndex + 1) % allImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition">
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
              
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((img, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)} className={`relative h-20 rounded-lg overflow-hidden ${i === currentImageIndex ? 'ring-2 ring-brand-green' : ''}`}>
                      <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div>
              <Badge variant="green" className="mb-4">{project.category}</Badge>
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-5xl text-brand-white mb-6">
                {project.title}
              </motion.h1>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-brand-white text-lg">
                  <MapPin size={20} className="mr-3 text-brand-green" />
                  <span className="mr-2">{project.flag}</span>
                  {project.location}, {project.country}
                </div>
                <div className="flex items-center text-brand-white text-lg">
                  <Zap size={20} className="mr-3 text-brand-green" />
                  {project.system} • {project.capacity}
                </div>
                <div className="flex items-center text-brand-white text-lg">
                  <Calendar size={20} className="mr-3 text-brand-green" />
                  {project.year}
                </div>
              </div>

              <div className="bg-brand-grey border border-brand-greyMid rounded-2xl p-6 mb-8">
                <h2 className="font-display text-2xl text-brand-white mb-4">Project Overview</h2>
                <p className="text-brand-white/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => navigate(`/${currentLanguage}/quote`)} variant="primary">Get Similar Quote</Button>
                <Button onClick={() => navigate(`/${currentLanguage}/contact`)} variant="outline">Contact Us</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
