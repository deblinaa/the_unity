import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useAuthStore } from '../../../store/authStore';
import { ArrowLeft, Save, FileText } from 'lucide-react';

const CATEGORIES = [
  'Mental Health',
  'Stress Management',
  'Meditation',
  'Self Care',
  'Campus Wellness',
  'Productivity',
  'Physical Wellness',
  'Relationships',
  'Sleep Health',
  'Study-Life Balance'
];

export default function ResourceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: CATEGORIES[0],
    excerpt: '',
    cover_image: 'bg-teal-100', // Default placeholder class
    content: '',
    published: false,
    read_time: 5
  });

  useEffect(() => {
    if (isEditing) {
      fetchResource();
    }
  }, [id]);

  const fetchResource = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error fetching resource:', error.message);
      alert('Failed to load resource.');
      navigate('/staff/dashboard/resources');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({ ...prev, content: value }));
  };

  const handleGenerateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      alert('Please fill in title, slug, and content.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...formData,
        author_id: user.id,
        published_at: formData.published && !formData.published_at ? new Date() : formData.published_at
      };

      if (isEditing) {
        const { error } = await supabase
          .from('resources')
          .update(payload)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('resources')
          .insert([payload]);
        if (error) throw error;
      }

      navigate('/staff/dashboard/resources');
    } catch (error) {
      console.error('Error saving resource:', error.message);
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  if (loading) return <div className="p-8">Loading editor...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/staff/dashboard/resources" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Article' : 'Create Article'}</h1>
          <p className="text-gray-500">Use the rich text editor to write your wellness content.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-sage focus:border-primary-sage"
                placeholder="E.g., Managing Exam Stress"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug <button type="button" onClick={handleGenerateSlug} className="text-xs text-blue-500 ml-2">Generate</button>
              </label>
              <input 
                type="text" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-sage focus:border-primary-sage bg-gray-50"
                placeholder="e.g., managing-exam-stress"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-sage focus:border-primary-sage"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (mins)</label>
              <input 
                type="number" 
                name="read_time" 
                value={formData.read_time} 
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-sage focus:border-primary-sage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (CSS Class/URL)</label>
              <input 
                type="text" 
                name="cover_image" 
                value={formData.cover_image} 
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-sage focus:border-primary-sage"
                placeholder="bg-teal-100 or https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
            <textarea 
              name="excerpt" 
              value={formData.excerpt} 
              onChange={handleChange}
              rows="2"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-primary-sage focus:border-primary-sage"
              placeholder="A brief summary of the article..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <div className="h-96 mb-12">
              <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={handleContentChange} 
                modules={modules}
                className="h-full"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                name="published" 
                checked={formData.published} 
                onChange={handleChange}
                className="rounded border-gray-300 text-primary-sage focus:ring-primary-sage"
              />
              <span className="text-sm font-medium text-gray-700">Publish immediately</span>
            </label>

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={() => navigate('/staff/dashboard/resources')}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2 bg-primary-sage text-white rounded-md hover:bg-primary-sage/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Article
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
