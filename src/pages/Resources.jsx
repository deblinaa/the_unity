import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { Search, ArrowRight, Clock, Eye } from 'lucide-react';
import { getRandomDoodle } from '../utils/doodle';
import { Link, useParams, useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'Mental Health', 'Stress Management', 'Meditation', 'Self Care', 'Campus Wellness', 'Productivity', 'Physical Wellness', 'Relationships', 'Sleep Health', 'Study-Life Balance'];

export default function Resources() {
  const { slug } = useParams(); // For category filter if routed via /resource/category/:slug
  const navigate = useNavigate();

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // If slug is present, it's a category. We map it back to the Category name.
    if (slug) {
      const matchedCategory = CATEGORIES.find(c => c.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug);
      if (matchedCategory) {
        setActiveCategory(matchedCategory);
      } else {
        setActiveCategory('All');
      }
    } else {
      setActiveCategory('All');
    }
  }, [slug]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const { data, error } = await supabase
        .from('resources')
        .select(`*, profiles(full_name, avatar_url)`)
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      navigate('/resources');
    } else {
      navigate(`/resource/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`);
    }
  };

  const filteredResources = resources.filter(res => {
    const safeTitle = res.title || '';
    const safeCategory = res.category || '';
    const safeExcerpt = res.excerpt || '';
    
    const matchesSearch = safeTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          safeExcerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || safeCategory === activeCategory;
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

      <section className="py-8 px-4 border-b border-gray-100 bg-white">
        <div className="container mx-auto flex flex-wrap justify-center gap-3 max-w-4xl">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-primary-sage text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 flex-grow">
        <div className="container mx-auto max-w-6xl">
          {errorMsg ? (
            <div className="text-center py-20 text-red-500">
              <p className="font-bold">Error loading resources:</p>
              <p>{errorMsg}</p>
              <p className="mt-4 text-sm text-gray-500">Did you run the newrundb.txt SQL script in Supabase?</p>
            </div>
          ) : loading ? (
            <div className="text-center py-20 text-gray-500">Loading resources...</div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No resources found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((res, idx) => (
                <motion.div key={res.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                  <Link to={`/resources/${res.slug}`}>
                    <Card className="h-full group cursor-pointer hover:border-primary-sage/50 transition-colors flex flex-col bg-white overflow-hidden shadow-sm hover:shadow-md">
                      <div className={`h-48 ${res.cover_image?.startsWith('bg-') ? res.cover_image : 'bg-gray-100'} flex items-center justify-center p-6 overflow-hidden relative`}>
                        {!res.cover_image?.startsWith('bg-') && res.cover_image && (
                           <img src={res.cover_image} alt={res.title} className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        <img src={getRandomDoodle()} alt="Resource doodle" className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10" />
                      </div>
                      <CardContent className="pt-6 flex-grow flex flex-col">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-medium text-primary-sage uppercase tracking-wider px-2 py-1 bg-primary-sage/10 rounded-md">
                            {res.category}
                          </span>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {res.read_time || 5} min read</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-3 group-hover:text-primary-sage transition-colors line-clamp-2">{res.title}</CardTitle>
                        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                          {res.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                              {res.profiles?.avatar_url ? (
                                <img src={res.profiles.avatar_url} alt="author" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-800 text-xs font-bold">
                                  {res.profiles?.full_name?.charAt(0) || 'S'}
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-medium text-gray-700">{res.profiles?.full_name || 'Staff Writer'}</span>
                          </div>
                          
                          <div className="flex items-center text-sm font-medium text-gray-900 group-hover:text-primary-sage transition-colors">
                            Read <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
