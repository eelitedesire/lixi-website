import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const About = () => (
  <>
    <Helmet><title>About Us | LIXI Energy Systems</title></Helmet>
    <div className="pt-20 bg-brand-black min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-h2 text-brand-white mb-8">
          About LIXI Energy Systems
        </motion.h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-brand-white/70 mb-6">
            LIXI Energy Systems is a premium provider of lithium battery storage solutions, part of the HelioAegis GmbH group based in Liechtenstein.
          </p>
          <p className="text-brand-white/70 mb-6">
            We specialize in advanced LiFePO4 battery systems for residential, commercial, and industrial applications, with service centers across EU, Africa, and the Caribbean.
          </p>
          <h2 className="font-display text-h3 text-brand-white mt-12 mb-6">Our Mission</h2>
          <p className="text-brand-white/70 mb-6">
            To accelerate the global transition to renewable energy by providing safe, reliable, and profitable energy storage solutions.
          </p>
          <h2 className="font-display text-h3 text-brand-white mt-12 mb-6">Group Structure</h2>
          <ul className="text-brand-white/70 space-y-2">
            <li>HelioAegis GmbH i.G. - Group HQ (Liechtenstein)</li>
            <li>Förner Technik - EU Service Center (Germany)</li>
            <li>buyAfraction Ltd. - Africa Service Center (Mauritius)</li>
            <li>CAYTECH Ltd. - Caribbean Service Center (Cayman Islands)</li>
          </ul>
        </div>
      </div>
    </div>
  </>
);

export default About;
