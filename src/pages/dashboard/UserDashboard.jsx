import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, User, Calendar, Bookmark, Settings } from 'lucide-react';

const UserDashboard = () => {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">My Dashboard</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1 md:col-span-3 lg:col-span-1 flex flex-col items-center text-center">
            <div className="h-20 w-20 bg-teal-100 rounded-full flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-teal-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900">
              {user?.user_metadata?.full_name || 'User'}
            </h2>
            <p className="text-slate-500 text-sm mb-6">{user?.email}</p>
            <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Settings className="h-4 w-4" />
              Account Settings
            </button>
          </div>

          {/* Quick Actions / Stats */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1 md:col-span-2 flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-50 p-4 rounded-lg flex items-center gap-4">
                <div className="p-3 bg-teal-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-teal-900">Upcoming Bookings</p>
                  <p className="text-2xl font-bold text-teal-700">0</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Bookmark className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Saved Resources</p>
                  <p className="text-2xl font-bold text-blue-700">0</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
