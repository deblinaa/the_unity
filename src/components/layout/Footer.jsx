import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-primary-black text-primary-white py-24 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        
        <div className="md:col-span-5 space-y-8">
          <Link to="/" className="flex items-center gap-3 text-3xl font-heading font-medium tracking-tight text-white">
            <img src="/logo.svg" alt="The Unity Logo" className="w-8 h-8 invert" />
            The Unity
          </Link>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            Thoughtful design and support for students who value clarity and distinction in their wellness journey.
          </p>
        </div>
        
        <div className="md:col-span-2">
          <h5 className="font-semibold text-white mb-8 uppercase tracking-widest text-xs">Platform</h5>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Our Story</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h5 className="font-semibold text-white mb-8 uppercase tracking-widest text-xs">Connect</h5>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h5 className="font-semibold text-white mb-8 uppercase tracking-widest text-xs">Legal</h5>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>

      </div>
      
      <div className="container mx-auto mt-24 pt-8 border-t border-neutral-dark flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium uppercase tracking-widest text-gray-500">
        <div>&copy; {new Date().getFullYear()} The Unity of Mind & Body.</div>
        <div>
          Crafted with <span className="text-red-500">♥</span> by <a href="https://anonical.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-white transition-colors lowercase">anonically22</a>
        </div>
      </div>
    </footer>
  );
}
