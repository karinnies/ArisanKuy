
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
            Building the <span className="text-indigo-600">Future</span> <br />
            with Code & AI
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
            Hi, I'm Alex. A Senior Frontend Engineer obsessed with creating seamless digital experiences. Ask my AI assistant anything about my work!
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => document.getElementById('chat-trigger')?.click()}
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
            >
              Ask My AI Assistant
            </button>
            <a 
              href="#projects"
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all"
            >
              View Projects
            </a>
          </div>
        </div>
        
        <div className="mt-20 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
             <div className="w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <img 
              src="https://picsum.photos/1200/600" 
              alt="Developer Workspace" 
              className="w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
