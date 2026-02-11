
import React from 'react';
import { MonthWinner } from '../types';

interface Props {
  winners: MonthWinner[];
}

const WinnerList: React.FC<Props> = ({ winners }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-rose-100 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🏆</span>
        <div>
          <h2 className="text-lg font-black text-slate-800">Daftar Pemenang</h2>
          <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Update Real-time</p>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] scrollbar-thin">
        {winners.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-[10px] font-medium italic uppercase tracking-wider">Belum ada pemenang</p>
          </div>
        ) : (
          winners.map((mw, idx) => (
            <div key={idx} className="bg-rose-50/30 p-3 rounded-2xl border border-rose-50 flex justify-between items-center transition-all hover:bg-rose-50/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-white text-[10px] font-black shadow-sm shrink-0">
                  {/* Fix: Corrected Periode to periode to match MonthWinner interface */}
                  {mw.periode}
                </div>
                <span className="font-semibold text-xs text-slate-700 truncate">
                  {/* Fix: Corrected Nama_Pemenang to nama to match MonthWinner interface */}
                  {mw.nama}
                </span>
              </div>
              <span className="text-[7px] font-black text-emerald-600 uppercase bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                Lunas
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WinnerList;
