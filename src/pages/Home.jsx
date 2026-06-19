import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { getRandomDoodle } from '../utils/doodle';
import { services } from '../data/services';
import { resources } from '../data/resources';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-primary-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 lg:pt-48 lg:pb-32 px-4 border-b border-gray-100">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              className="flex-1"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">The Unity of Mind & Body</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-6xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tight text-primary-black mb-8 leading-[1.1]">
                Thoughtful design for your inner clarity and distinction.
              </motion.h1>
              <motion.div variants={fadeUp} className="flex gap-4 items-center">
                <Link to="/services"><Button variant="accent">Explore Services</Button></Link>
                <Link to="/about" className="text-sm font-semibold tracking-wide uppercase hover:underline underline-offset-4">Read Our Story</Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 w-full max-w-lg lg:max-w-none flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
               <div className="relative w-full aspect-[4/3] bg-neutral-light overflow-hidden">
                 <img src={getRandomDoodle()} alt="Hero" className="absolute inset-0 w-full h-full object-contain p-8" />
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section (Alternating Layout) */}
      <section className="py-32 bg-primary-white">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-24 flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium text-primary-black">Crafted with absolute clarity, and purpose.</h2>
          </motion.div>

          <div className="space-y-32">
            {services.map((service, index) => {
              const isEven = index % 2 !== 0;
              return (
                <motion.div 
                  key={service.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  variants={fadeUp}
                  className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}
                >
                  <div className="flex-1 w-full">
                     <div className="relative w-full aspect-[4/3] bg-neutral-light overflow-hidden">
                        <img src={getRandomDoodle()} alt={service.title} className="absolute inset-0 w-full h-full object-contain p-12" />
                     </div>
                  </div>
                  <div className="flex-1 w-full">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4 block">0{index + 1}</span>
                    <h3 className="text-4xl font-heading font-medium mb-6">{service.title}</h3>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">{service.description}</p>
                    <ul className="space-y-3 mb-10 border-l border-gray-200 pl-6">
                      {service.benefits.map((b, i) => (
                        <li key={i} className="text-gray-600">{b}</li>
                      ))}
                    </ul>
                    <Link to="/services" className="text-sm font-semibold tracking-wide uppercase hover:underline underline-offset-4">Learn More &rarr;</Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise List Layout */}
      <section className="py-32 bg-primary-black text-primary-white">
        <div className="container mx-auto">
          <motion.h2 
             initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
             className="text-6xl md:text-7xl font-heading font-medium mb-24"
          >
            Expertise
          </motion.h2>

          <div className="border-t border-neutral-dark">
            {[
              { title: 'Mental Health Support', desc: 'Professional counseling tailored for students.' },
              { title: 'Academic Stress Management', desc: 'Strategies to handle burnout and deadlines.' },
              { title: 'Community Wellness', desc: 'Group sessions to foster connection.' },
              { title: 'Mindfulness Practices', desc: 'Guided meditation and grounding techniques.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="py-12 border-b border-neutral-dark flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-neutral-dark/30 transition-colors px-4 -mx-4"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <h3 className="text-3xl md:text-4xl font-heading font-medium">{item.title}</h3>
                  <span className="hidden md:block text-neutral-dark text-4xl font-light">/</span>
                </div>
                <p className="text-gray-300 max-w-md text-lg md:text-xl md:text-right">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Quote */}
      <section className="py-32 bg-primary-white border-b border-gray-100">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 block">Student Stories</span>
            <h3 className="text-3xl md:text-5xl font-heading font-medium text-primary-black leading-tight mb-12">
              "Working with The Unity was a great experience from start to finish. They really understood what we wanted to achieve and helped turn our ideas into something that felt polished, premium, and true to our brand."
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neutral-light overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Student" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-primary-black text-sm uppercase tracking-wider">Isabella Ross</div>
                <div className="text-gray-500 text-sm">University Student</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resource Grid Layout */}
      <section className="py-32 bg-primary-white">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-4xl md:text-5xl font-heading font-medium">Featured Reading</h2>
            <Link to="/resources" className="text-sm font-semibold tracking-wide uppercase hover:underline underline-offset-4">View All &rarr;</Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
             {resources.slice(0, 4).map((res, idx) => (
                <motion.div key={res.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: idx * 0.1 }} className="group">
                   <div className="relative w-full aspect-square bg-neutral-light mb-6 overflow-hidden">
                      <img src={getRandomDoodle()} alt={res.title} className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">{res.category}</div>
                   <h4 className="text-xl font-heading font-medium text-primary-black leading-snug group-hover:underline underline-offset-4 decoration-1">{res.title}</h4>
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-accent-yellow text-primary-black text-center border-y border-primary-black">
        <div className="container mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl font-heading font-medium mb-12 leading-none tracking-tight">
              Want to start a new journey with us?
            </h2>
            <Button variant="primary">Let's Talk &rarr;</Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
