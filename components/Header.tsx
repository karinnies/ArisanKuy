
import React from 'react';

interface Props {
  // Fix: Added missing groupName prop to match usage in App.tsx
  groupName?: string;
  onAdminClick: () => void;
  isAdmin: boolean;
}

const Header: React.FC<Props> = ({ groupName, onAdminClick, isAdmin }) => {
  return (
    <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-40 border-b border-rose-50 px-6 py-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-rose-400 to-rose-300 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-rose-100">
            ✨
          </div>
          <h1 className="text-xl font-black bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
            {groupName || 'ArisanKuy'}
          </h1>
        </div>
        
        <button 
          onClick={onAdminClick}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all ${
            isAdmin 
              ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' 
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
          }`}
        >
          {isAdmin ? 'Logout' : 'Admin'}
          <span className="text-sm">{isAdmin ? '🔓' : '🔒'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
