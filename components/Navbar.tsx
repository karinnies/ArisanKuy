
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Alex.AI
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Home</a>
            <a href="#skills" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Skills</a>
            <a href="#projects" className="text-slate-600 hover:text-indigo-600 transition-colors font-medium">Projects</a>
            <a href="mailto:alex@example.com" className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-all font-medium shadow-sm">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
