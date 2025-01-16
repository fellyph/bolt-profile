import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ 
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.3
            }}
            className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center sm:inset-0"
          >
            <div className="w-full max-w-lg mx-auto sm:my-8">
              <div className="relative bg-white rounded-t-xl sm:rounded-xl shadow-xl p-6 overflow-hidden">
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
                  <p className="text-gray-600 mt-2">
                    Have a project in mind? Let's discuss how we can work together.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}