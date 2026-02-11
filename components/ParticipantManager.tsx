
import React from 'react';
import { Participant } from '../types';

interface Props {
  participants: Participant[];
  isLoading: boolean;
  onRefresh: () => void;
  isAdmin?: boolean;
  onSetLunas?: (name: string) => void;
}

const ParticipantManager: React.FC<Props> = ({ participants, isLoading, onRefresh, isAdmin, onSetLunas }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-black text-slate-800">Daftar Peserta</h2>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
            {participants.length} Orang Terdaftar
          </p>
        </div>
        <button 
          onClick={onRefresh}
          disabled={isLoading}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
            isLoading 
              ? 'bg-slate-50 text-slate-300' 
              : 'bg-rose-50 text-rose-500 hover:bg-rose-100 active:scale-90 shadow-sm shadow-rose-100'
          }`}
        >
          <svg className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[800px] overflow-y-auto pr-2 scrollbar-thin">
        {participants.length === 0 && !isLoading ? (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Database Kosong</p>
          </div>
        ) : (
          participants.map((p) => {
            const isLunas = p.status === 'Lunas';
            return (
              <div 
                key={p.id} 
                className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-50 hover:border-rose-100 hover:shadow-md hover:shadow-rose-50/30 transition-all group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-xs font-black shadow-sm ${
                    isLunas ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {p.nama.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-slate-700 truncate">{p.nama}</h3>
                    <div className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 ${isLunas ? 'text-emerald-500' : 'text-rose-400'}`}>
                      {p.status}
                    </div>
                  </div>
                </div>
                
                {isAdmin && !isLunas && (
                  <button 
                    onClick={() => onSetLunas?.(p.nama)}
                    className="bg-emerald-50 text-emerald-600 px-3 py-2 rounded-xl text-[9px] font-bold uppercase tracking-widest hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm shadow-emerald-50 shrink-0"
                  >
                    Set Lunas
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ParticipantManager;
