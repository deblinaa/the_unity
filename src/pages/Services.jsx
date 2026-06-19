import React from 'react';
import { motion } from 'framer-motion';
import { services } from '../data/services';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CheckCircle, Palette, Users, Leaf } from 'lucide-react';
import { getRandomDoodle } from '../utils/doodle';

export default function Services() {
  const serviceIcons = { 'Palette': Palette, 'Users': Users, 'Leaf': Leaf };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 bg-gray-50 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-heading font-bold mb-6"
        >
          Our Services
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Professional, confidential, and tailored support for your wellbeing.
        </motion.p>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => {
              const Icon = serviceIcons[service.icon];
              return (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                >
                  <Card className="h-full border-gray-100 hover:border-primary-sage/30 hover:shadow-xl transition-all group">
                    <div className="h-48 bg-gray-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                       <img src={getRandomDoodle()} alt="Service Doodle" className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl mb-4">
                        <Icon className="w-6 h-6 text-primary-sage" />
                        {service.title}
                      </CardTitle>
                      <p className="text-gray-600 mb-6">{service.description}</p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-gray-900 uppercase tracking-wide">Key Benefits</h4>
                        <ul className="space-y-2">
                          {service.benefits.map((b, i) => (
                            <li key={i} className="flex gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-primary-sage shrink-0 mt-0.5" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <Button variant="outline" className="w-full">Book Session</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary-sage text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold mb-6">Ready to take the first step?</h2>
          <Button className="bg-white text-primary-sage hover:bg-gray-50 px-8 py-3">Book an Initial Consultation</Button>
        </div>
      </section>
    </div>
  );
}
