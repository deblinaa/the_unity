import React from 'react';
import { motion } from 'framer-motion';
import { getRandomDoodle } from '../utils/doodle';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="pt-32 pb-24 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-heading font-bold mb-8"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            The Unity of Mind & Body was born from a simple belief: no student should have to navigate the pressures of academic life alone.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16 max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <h2 className="text-3xl font-heading font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide accessible, high-quality mental health resources and professional support to students globally. We aim to destigmatize seeking help and foster a culture of holistic wellbeing.
              </p>
              <h2 className="text-3xl font-heading font-bold mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                A world where every student has the tools and community they need to thrive mentally, emotionally, and academically.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
               <img src={getRandomDoodle()} alt="About Doodle" className="w-full max-w-md mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-heading font-bold mb-16">Our Core Values</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Empathy', desc: 'We approach every interaction with understanding and without judgment.' },
              { title: 'Accessibility', desc: 'Support should be available whenever and wherever it is needed.' },
              { title: 'Community', desc: 'Healing and growth happen best when we support one another.' }
            ].map((value, idx) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <div className="w-16 h-16 bg-primary-sage/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-sage">{idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
