import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, LayoutDashboard, Calendar, Users, Settings, BookOpen } from 'lucide-react';

const StaffDashboard = () => {
  const { user, role, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-teal-400">Staff Portal</h1>
        </div>
        
        <div className="p-4 border-b border-slate-700">
          <p className="text-sm text-slate-400">Logged in as</p>
          <p className="font-medium text-white truncate">{user?.email}</p>
          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-900 text-teal-200 border border-teal-800">
            {role || 'Staff'}
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 px-3 py-2 bg-slate-700 text-white rounded-md transition-colors">
            <LayoutDashboard className="h-5 w-5 text-slate-400" />
            Overview
          </a>
          
          {(role === 'Admin' || role === 'Therapist' || role === 'Counselor' || role === 'Wellness Coach') && (
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors">
              <Calendar className="h-5 w-5 text-slate-400" />
              Bookings
            </a>
          )}

          {(role === 'Admin' || role === 'Content Manager' || role === 'Counselor') && (
            <a href="/staff/dashboard/resources" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors">
              <BookOpen className="h-5 w-5 text-slate-400" />
              Resources
            </a>
          )}

          {(role === 'Admin') && (
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors">
              <Users className="h-5 w-5 text-slate-400" />
              Users
            </a>
          )}

          {(role === 'Admin' || role === 'Developer') && (
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md transition-colors">
              <Settings className="h-5 w-5 text-slate-400" />
              System Configuration
            </a>
          )}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-700 hover:bg-red-900/50 hover:text-red-400 text-slate-300 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 md:hidden">
           <h1 className="text-xl font-bold text-teal-400">Staff Portal</h1>
           <button onClick={handleSignOut} className="text-slate-400 hover:text-white">
             <LogOut className="h-6 w-6" />
           </button>
        </header>

        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Welcome to the Staff Portal</h2>
            
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
              <p className="text-slate-300">
                You are currently logged in with the <strong className="text-teal-400">{role || 'Staff'}</strong> role.
              </p>
              <p className="text-slate-400 mt-2 text-sm">
                Use the sidebar to navigate to your authorized sections. 
                If you believe you are missing access to certain areas, please contact the administrator.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
