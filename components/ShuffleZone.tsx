
import React, { useState } from 'react';
import { Participant } from '../types';

interface Props {
  participants: Participant[];
  onSaveWinner: (name: string) => Promise<void>;
  isAdmin?: boolean;
}

const ShuffleZone: React.FC<Props> = ({ participants, onSaveWinner, isAdmin }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const startShuffle = () => {
    if (participants.length === 0) {
      alert("Tidak ada peserta lunas yang tersedia!");
      return;
    }
    setIsShuffling(true);
    setFinalWinner(null);
    let counter = 0;
    const duration = 2500; 
    const intervalTime = 80;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setDisplayName(participants[randomIndex].nama);
      counter += intervalTime;
      if (counter >= duration) {
        clearInterval(interval);
        const winnerIndex = Math.floor(Math.random() * participants.length);
        const winner = participants[winnerIndex].nama;
        setDisplayName(winner);
        setFinalWinner(winner);
        setIsShuffling(false);
      }
    }, intervalTime);
  };

  const handleSave = async () => {
    if (!finalWinner) return;
    setIsSaving(true);
    await onSaveWinner(finalWinner);
    setIsSaving(false);
    setFinalWinner(null);
    setDisplayName(null);
  };

  if (!isAdmin && !finalWinner) {
     return (
        <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-[1.5rem] p-8 text-white shadow-xl shadow-rose-100 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">✨</div>
           <h2 className="text-xl font-black mb-2">Siap untuk Beruntung?</h2>
           <p className="text-xs opacity-90 leading-relaxed font-medium">Pengundian akan dilakukan oleh Admin segera setelah semua peserta melunasi iuran.</p>
           <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30 backdrop-blur-sm">
             <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
             {participants.length} Kandidat Siap Menang
           </div>
        </div>
     );
  }

  return (
    <div className="bg-white rounded-[1.5rem] p-8 shadow-sm border border-rose-100 text-center relative overflow-hidden">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Area Pengundian Arisan</p>
      
      <div className="flex flex-col items-center justify-center min-h-[120px] mb-8">
        {isShuffling ? (
          <div className="text-3xl font-black text-rose-500 animate-bounce bg-rose-50 px-12 py-6 rounded-3xl border border-rose-100">
            {displayName}
          </div>
        ) : finalWinner ? (
          <div className="space-y-2 animate-in zoom-in duration-500 bg-emerald-50 px-12 py-8 rounded-[2rem] border border-emerald-100">
            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Selamat! Pemenang Baru: 🎉</p>
            <h3 className="text-3xl font-black text-slate-800">{finalWinner}</h3>
          </div>
        ) : (
          <div className="text-slate-300 flex flex-col items-center gap-3">
            <span className="text-6xl drop-shadow-sm">🎲</span>
            <p className="text-[11px] font-medium tracking-wide uppercase">{participants.length} Peserta Berhak Diundi</p>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="max-w-xs mx-auto flex flex-col gap-3">
          <button
            onClick={startShuffle}
            disabled={isShuffling || isSaving}
            className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 ${
              isShuffling || isSaving
                ? 'bg-slate-100 text-slate-300' 
                : 'bg-rose-500 text-white shadow-rose-100 hover:bg-rose-600'
            }`}
          >
            {isShuffling ? 'Sedang Mengocok...' : 'Mulai Kocokan Sekarang'}
          </button>

          {finalWinner && !isShuffling && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest bg-emerald-500 text-white shadow-lg shadow-emerald-50 hover:bg-emerald-600 active:scale-95 transition-all animate-in slide-in-from-top-2"
            >
              {isSaving ? 'Menyimpan...' : 'Konfirmasi Pemenang'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ShuffleZone;
