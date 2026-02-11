
import React from 'react';
import { Skill } from '../types';

const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'TypeScript', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend' },
  { name: 'Node.js / Express', level: 85, category: 'Backend' },
  { name: 'Gemini AI / LLMs', level: 80, category: 'Tools' },
  { name: 'Figma', level: 75, category: 'Design' },
];

const Skills: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Competencies</h2>
        <p className="text-slate-600">Technological stack I master to build high-end applications.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {SKILLS.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-slate-700">{skill.name}</span>
              <span className="text-sm text-indigo-600 font-medium">{skill.level}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
