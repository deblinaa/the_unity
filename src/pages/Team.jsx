import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { team } from '../data/team';
import { Card, CardContent, CardTitle } from '../components/ui/Card';

export default function Team() {
  const [activeFilter, setActiveFilter] = useState('All');
  const specialties = ['All', ...new Set(team.map(m => m.specialty))];

  const filteredTeam = team.filter(m => activeFilter === 'All' || m.specialty === activeFilter);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 bg-blue-50 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-heading font-bold mb-6"
        >
          Meet The Team
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Dedicated professionals committed to your wellbeing.
        </motion.p>
      </section>

      <section className="py-12 px-4 border-b border-gray-100">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => setActiveFilter(spec)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === spec ? 'bg-primary-sage text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {spec}
            </button>
          ))}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTeam.map((member, idx) => (
              <motion.div key={member.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
                <Card className="text-center group overflow-hidden border-transparent hover:border-gray-200 hover:shadow-lg transition-all h-full">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 relative">
                      <div className="absolute inset-0 bg-primary-sage/10 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay" />
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardTitle className="mb-1">{member.name}</CardTitle>
                    <p className="text-primary-sage font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{member.specialty}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
