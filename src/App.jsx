import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import About from './pages/About';
import Contact from './pages/Contact';

// Auth
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PublicRoute } from './components/auth/PublicRoute';
import { StaffRoute } from './components/auth/StaffRoute';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignup';
import ForgotPassword from './pages/auth/ForgotPassword';
import StaffLogin from './pages/auth/StaffLogin';

// Dashboards
import UserDashboard from './pages/dashboard/UserDashboard';
import StaffDashboard from './pages/dashboard/StaffDashboard';
import ResourceCMS from './pages/dashboard/staff/ResourceCMS';
import ResourceEditor from './pages/dashboard/staff/ResourceEditor';

import { useAuthStore } from './store/authStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const { initializeAuth, isLoading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading application...</div>;
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/resource/category/:slug" element={<Resources />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Public Auth Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<UserSignup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/staff/login" element={<StaffLogin />} />
            </Route>

            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard />} />
            </Route>

            {/* Protected Staff Routes */}
            <Route element={<StaffRoute />}>
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/dashboard/resources" element={<ResourceCMS />} />
              <Route path="/staff/dashboard/resources/new" element={<ResourceEditor />} />
              <Route path="/staff/dashboard/resources/edit/:id" element={<ResourceEditor />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
