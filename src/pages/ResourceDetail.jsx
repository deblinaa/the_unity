import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Share2, Calendar } from 'lucide-react';

export default function ResourceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [relatedResources, setRelatedResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchResource = async () => {
    try {
      setLoading(true);
      // Fetch the specific resource
      const { data, error } = await supabase
        .from('resources')
        .select(`*, profiles(full_name, avatar_url, bio)`)
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (error) throw error;
      if (!data) {
        navigate('/resources');
        return;
      }

      setResource(data);

      // Increment views
      await supabase
        .from('resources')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

      // Fetch related resources (same category, excluding current)
      const { data: relatedData } = await supabase
        .from('resources')
        .select('title, slug, cover_image, category, read_time')
        .eq('category', data.category)
        .eq('published', true)
        .neq('id', data.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (relatedData) {
        setRelatedResources(relatedData);
      }
    } catch (error) {
      console.error('Error fetching resource:', error.message);
      navigate('/resources');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">Loading article...</div>;
  }

  if (!resource) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <div className="mb-8">
          <Link to="/resources" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-sage transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Resources
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 text-center">
          <Link 
            to={`/resource/category/${resource.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="inline-block px-3 py-1 bg-primary-sage/10 text-primary-sage text-sm font-semibold rounded-full mb-4 hover:bg-primary-sage/20 transition-colors uppercase tracking-wider"
          >
            {resource.category}
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6 leading-tight"
          >
            {resource.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                {resource.profiles?.avatar_url ? (
                  <img src={resource.profiles.avatar_url} alt="author" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-teal-100 text-teal-800 font-bold">
                    {resource.profiles?.full_name?.charAt(0) || 'S'}
                  </div>
                )}
              </div>
              <span className="font-medium text-gray-900">{resource.profiles?.full_name || 'Staff Writer'}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(resource.published_at || resource.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {resource.read_time || 5} min read
            </div>
            
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {resource.views + 1 || 1} views
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className={`w-full aspect-video rounded-2xl mb-12 shadow-md overflow-hidden relative ${resource.cover_image?.startsWith('bg-') ? resource.cover_image : 'bg-gray-100'}`}
        >
          {!resource.cover_image?.startsWith('bg-') && resource.cover_image && (
            <img src={resource.cover_image} alt={resource.title} className="w-full h-full object-cover" />
          )}
          {resource.cover_image?.startsWith('bg-') && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-opacity-20 text-black text-9xl font-bold font-heading">
                {resource.category.split(' ')[0]}
              </div>
            </div>
          )}
        </motion.div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mb-12">
          {/* Prose styling for the rich text from quill */}
          <div 
            className="prose prose-lg prose-teal max-w-none text-gray-700 
                       prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900 
                       prose-a:text-primary-sage prose-a:no-underline hover:prose-a:underline
                       prose-img:rounded-xl prose-img:shadow-sm"
            dangerouslySetInnerHTML={{ __html: resource.content }}
          />
        </div>

        {/* Related Articles */}
        {relatedResources.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold font-heading text-gray-900 mb-8 border-b border-gray-200 pb-4">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedResources.map((res) => (
                <Link key={res.slug} to={`/resources/${res.slug}`} className="group block bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all">
                  <div className={`h-32 ${res.cover_image?.startsWith('bg-') ? res.cover_image : 'bg-gray-100'} relative`}>
                    {!res.cover_image?.startsWith('bg-') && res.cover_image && (
                      <img src={res.cover_image} alt={res.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 group-hover:text-primary-sage transition-colors line-clamp-2 mb-2">{res.title}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" /> {res.read_time || 5} min read
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
