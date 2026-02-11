
import React from 'react';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Nexus AI Dashboard',
    description: 'A real-time analytics platform integrated with multiple LLM providers for data prediction.',
    image: 'https://picsum.photos/id/1/600/400',
    tags: ['React', 'D3.js', 'Node.js'],
    link: '#'
  },
  {
    id: 2,
    title: 'E-Commerce Ultra',
    description: 'Headless e-commerce solution with sub-second page loads and custom checkout flows.',
    image: 'https://picsum.photos/id/2/600/400',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    link: '#'
  },
  {
    id: 3,
    title: 'Design System Forge',
    description: 'Automated documentation generator for React design systems using AI to write components.',
    image: 'https://picsum.photos/id/3/600/400',
    tags: ['TypeScript', 'Gemini API', 'PostCSS'],
    link: '#'
  }
];

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Selected Works</h2>
        <p className="text-slate-600">A glimpse into some of my most challenging and rewarding projects.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <a 
                href={project.link} 
                className="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
              >
                Learn More 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
