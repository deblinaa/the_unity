import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-heading font-bold mb-6"
        >
          Contact Us
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          We're here to help. Reach out with any questions or concerns.
        </motion.p>
      </section>

      <section className="py-12 px-4 pb-32">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-3xl font-heading font-bold mb-8">Get in Touch</h2>
              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-sage bg-white" placeholder="Jane" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-sage bg-white" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-sage bg-white" placeholder="jane@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-sage bg-white resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <Button variant="primary" className="w-full py-4 text-lg">Send Message</Button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-sage/10 flex items-center justify-center text-primary-sage shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">support@theunity.com</p>
                    <p className="text-sm text-gray-500 mt-1">We aim to reply within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-sage/10 flex items-center justify-center text-primary-sage shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri from 8am to 5pm.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-sage/10 flex items-center justify-center text-primary-sage shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600">123 Wellness Way<br/>Campus District, CA 90210</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-12 border-t border-gray-100">
                <h4 className="font-bold mb-4">FAQ Preview</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-sm text-gray-900">Are counseling sessions confidential?</h5>
                    <p className="text-sm text-gray-500 mt-1">Yes, all our services are strictly confidential under HIPAA guidelines.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm text-gray-900">Do I need insurance?</h5>
                    <p className="text-sm text-gray-500 mt-1">Our basic student support services are fully funded by the university.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
