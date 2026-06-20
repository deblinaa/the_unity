import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { Edit, Trash2, Plus, Search, Eye, EyeOff } from 'lucide-react';

export default function ResourceCMS() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('resources')
        .update({ published: !currentStatus, published_at: !currentStatus ? new Date() : null })
        .eq('id', id);

      if (error) throw error;
      
      setResources(resources.map(res => 
        res.id === id ? { ...res, published: !currentStatus } : res
      ));
    } catch (error) {
      console.error('Error updating status:', error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setResources(resources.filter(res => res.id !== id));
    } catch (error) {
      console.error('Error deleting resource:', error.message);
    }
  };

  const filteredResources = resources.filter(res => {
    const safeTitle = res.title || '';
    const safeCategory = res.category || '';
    return safeTitle.toLowerCase().includes(searchTerm.toLowerCase()) || 
           safeCategory.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Management</h1>
          <p className="text-gray-500">Manage wellness articles and guides.</p>
        </div>
        <Link 
          to="/staff/dashboard/resources/new" 
          className="flex items-center gap-2 bg-primary-sage text-white px-4 py-2 rounded-md hover:bg-primary-sage/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Article
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-sage focus:border-transparent text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading resources...</div>
        ) : filteredResources.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No resources found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-3 font-medium">Title</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResources.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                      {res.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {res.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {res.published ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-medium text-xs">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600 font-medium text-xs">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(res.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleTogglePublish(res.id, res.published)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        title={res.published ? "Unpublish" : "Publish"}
                      >
                        {res.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <Link 
                        to={`/staff/dashboard/resources/edit/${res.id}`}
                        className="inline-block text-blue-500 hover:text-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(res.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
