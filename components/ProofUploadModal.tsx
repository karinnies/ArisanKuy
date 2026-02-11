
import React, { useState } from 'react';
import { Participant } from '../types';

interface Props {
  participant: Participant;
  onUpload: (id: string, file: File) => Promise<void>;
  onClose: () => void;
}

const ProofUploadModal: React.FC<Props> = ({ participant, onUpload, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[300] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl space-y-6">
        <div className="text-center">
          <h3 className="text-xl font-black text-slate-800">Bukti Pembayaran</h3>
          <p className="text-xs text-slate-400 font-medium mt-1">Upload bukti transfer untuk <span className="font-bold text-slate-600">{participant.nama}</span></p>
        </div>
        
        <div 
          onClick={() => document.getElementById('file-input')?.click()}
          className="aspect-square w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 hover:border-rose-200 transition-all group overflow-hidden"
        >
          {file ? (
            <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
          ) : (
            <>
              <span className="text-4xl mb-2 grayscale group-hover:grayscale-0 transition-all">📸</span>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pilih Gambar</p>
            </>
          )}
          <input 
            id="file-input" 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Batal</button>
          <button 
            disabled={!file || loading}
            onClick={async () => {
              if (file) {
                setLoading(true);
                await onUpload(participant.id, file);
                setLoading(false);
              }
            }}
            className="flex-1 bg-emerald-500 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-50 disabled:opacity-50"
          >
            {loading ? 'Sinking...' : 'Konfirmasi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProofUploadModal;
