import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-primary-white border-b border-gray-200">
      <div className="container mx-auto h-24 flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link to="/" className="flex items-center gap-3 text-2xl font-heading font-medium tracking-tight text-primary-black">
            <img src="/logo.svg" alt="The Unity Logo" className="w-8 h-8" />
            The Unity
          </Link>
          <div className="hidden md:flex gap-10 text-xs font-semibold tracking-wide uppercase text-gray-500 relative">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`relative hover:text-primary-black transition-colors py-2 ${isActive ? 'text-primary-black' : ''}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary-black"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/contact" className="text-xs font-semibold tracking-wide uppercase text-gray-500 hover:text-primary-black transition-colors">
            Contact
          </Link>
          <Link to="/login">
            <Button variant="outline" className="px-6 py-2.5">Get Started</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-primary-black">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary-white border-b border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-lg font-heading font-medium text-primary-black hover:opacity-70 transition-opacity"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/contact" 
                className="text-lg font-heading font-medium text-primary-black hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
