
import React from 'react';
import { Participant } from '../types';

interface Props {
  participants: Participant[];
  isAdmin: boolean;
  onLunasClick: (p: Participant) => void;
}

const ParticipantGrid: React.FC<Props> = ({ participants, isAdmin, onLunasClick }) => {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Daftar Anggota</h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Status pembayaran real-time anggota ArisanKuy.</p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black text-rose-500">{participants.filter(p => p.status === 'Lunas').length}</span>
          <span className="text-xs text-slate-300 font-bold uppercase ml-2">/ {participants.length} Lunas</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {participants.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-rose-100 hover:shadow-md transition-all flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${
                p.status === 'Lunas' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300 border border-slate-100'
              }`}>
                {p.nama.charAt(0).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700">{p.nama}</h4>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide">{p.noWa}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {p.status === 'Lunas' ? (
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </div>
              ) : isAdmin ? (
                <button 
                  onClick={() => onLunasClick(p)}
                  className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-rose-600 shadow-sm"
                >
                  Set Lunas
                </button>
              ) : (
                <span className="text-[9px] font-bold text-rose-300 uppercase tracking-widest bg-rose-50 px-2 py-1 rounded-md">Belum</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantGrid;
