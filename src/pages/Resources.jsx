import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resources } from '../data/resources';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { Search, ArrowRight } from 'lucide-react';
import { getRandomDoodle } from '../utils/doodle';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mental Health', 'Personal Growth', 'Mindfulness'];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <section className="pt-32 pb-20 bg-pink-50 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-heading font-bold mb-6"
        >
          Resources
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Tools, guides, and articles to help you build healthier habits.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto relative"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-sage text-lg"
          />
        </motion.div>
      </section>

      <section className="py-12 px-4 border-b border-gray-100">
        <div className="container mx-auto flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary-sage text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto">
          {filteredResources.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No resources found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredResources.map((res, idx) => (
                <motion.div key={res.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                  <Card className="h-full group cursor-pointer hover:border-primary-sage/30 transition-colors">
                    <div className={`h-48 ${res.image} flex items-center justify-center p-6 overflow-hidden`}>
                      <img src={getRandomDoodle()} alt="Resource doodle" className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 text-xs font-medium text-primary-sage mb-3 uppercase tracking-wider">
                        <span>{res.category}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="text-gray-500">{res.readTime}</span>
                      </div>
                      <CardTitle className="text-xl mb-4 group-hover:text-primary-sage transition-colors">{res.title}</CardTitle>
                      <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-primary-sage transition-colors mt-auto">
                        Read Article <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
