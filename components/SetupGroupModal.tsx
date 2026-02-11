
import React, { useState } from 'react';
import { setDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

interface Props {
  user: any;
  db: any;
  onClose: () => void;
}

const SetupGroupModal: React.FC<Props> = ({ user, db, onClose }) => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [iuran, setIuran] = useState(100000);
  const [wa, setWa] = useState('');
  const [rek, setRek] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !slug || !wa || !rek) {
      alert("Harap isi semua data!");
      return;
    }

    setLoading(true);
    try {
      const groupRef = doc(db, "groups", slug);
      await setDoc(groupRef, {
        name,
        slug,
        adminId: user.uid,
        iuran: Number(iuran),
        waAdmin: wa,
        rekening: rek,
        rules: [
          "Bayar iuran paling lambat tanggal 5 setiap bulan.",
          "Pengundian dilakukan setiap tanggal 10.",
          "Peserta yang sudah menang tidak diundi lagi.",
          "Bukti transfer wajib diunggah ke sistem."
        ],
        createdAt: serverTimestamp()
      });
      
      // Redirect to the new group URL
      window.location.search = `?g=${slug}`;
    } catch (e) {
      console.error(e);
      alert("Gagal membuat grup. Pastikan slug belum digunakan.");
    } finally {
      setLoading(false);
    }
  };

  const updateSlug = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''));
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[600] flex items-center justify-center p-6 overflow-y-auto">
      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-lg shadow-2xl space-y-8 animate-in zoom-in-95 my-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl mx-auto mb-4">🏗️</div>
          <h2 className="text-2xl font-black text-slate-800">Setup Grup Baru</h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-2">Konfigurasi Arisan Anda</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-full">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Nama Grup Arisan</label>
            <input 
              type="text" placeholder="Misal: Arisan Keluarga Cemara"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-medium mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
              value={name} onChange={e => updateSlug(e.target.value)}
            />
          </div>
          
          <div className="col-span-full">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Unique Link (Slug)</label>
            <div className="flex items-center gap-2 bg-slate-100 p-4 rounded-xl mt-1">
              <span className="text-slate-400 text-xs font-medium">arisanku.com/?g=</span>
              <input 
                type="text"
                className="bg-transparent border-none text-sm font-bold text-rose-600 outline-none flex-grow"
                value={slug} onChange={e => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Iuran (Rp)</label>
            <input 
              type="number"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-medium mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
              value={iuran} onChange={e => setIuran(Number(e.target.value))}
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">No. WhatsApp Admin</label>
            <input 
              type="text" placeholder="62812xxxx"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-medium mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
              value={wa} onChange={e => setWa(e.target.value)}
            />
          </div>

          <div className="col-span-full">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Informasi Rekening</label>
            <input 
              type="text" placeholder="Nama Bank - No. Rekening - A.N"
              className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm font-medium mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
              value={rek} onChange={e => setRek(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            disabled={loading}
            onClick={handleCreate}
            className="flex-grow bg-slate-900 text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl disabled:opacity-50"
          >
            {loading ? 'Creating Group...' : 'Create & Open Dashboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetupGroupModal;
