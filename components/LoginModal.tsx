
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

interface Props {
  auth: any;
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ auth, onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [configError, setConfigError] = useState(false);

  const handleSubmit = async () => {
    if (!email || !pass) {
      alert("Harap isi email dan password!");
      return;
    }
    
    setLoading(true);
    setConfigError(false);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Akun berhasil dibuat! Silakan login.");
        setIsRegister(false);
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        onClose();
      }
    } catch (e: any) {
      console.error("Firebase Auth Error:", e.code, e.message);
      
      if (e.code === 'auth/configuration-not-found') {
        setConfigError(true);
      } else if (e.code === 'auth/email-already-in-use') {
        alert("Email ini sudah terdaftar. Silakan gunakan menu Login.");
      } else if (e.code === 'auth/weak-password') {
        alert("Password terlalu lemah. Gunakan minimal 6 karakter.");
      } else if (e.code === 'auth/invalid-email') {
        alert("Format email tidak valid.");
      } else if (e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
        alert("Email atau password salah. Pastikan Anda sudah mendaftar.");
      } else {
        alert("Terjadi kesalahan: " + e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (configError) {
    return (
      <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[500] flex items-center justify-center p-6">
        <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-md shadow-2xl space-y-6 animate-in zoom-in-95">
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">⚠️</div>
            <h2 className="text-xl font-black text-slate-800">Konfigurasi Diperlukan</h2>
            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
              Firebase Auth belum diaktifkan di backend Anda. Ikuti langkah ini untuk memperbaikinya:
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Buka Firebase Console proyek Anda.",
              "Pilih menu 'Authentication' di sidebar kiri.",
              "Klik tab 'Sign-in method'.",
              "Klik 'Add new provider' dan pilih 'Email/Password'.",
              "Aktifkan (Enable) lalu klik 'Save'."
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="bg-amber-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>
                <p className="text-[11px] font-semibold text-slate-600 leading-tight">{step}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setConfigError(false)}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all"
          >
            Saya Sudah Mengaktifkannya, Coba Lagi
          </button>
          
          <button onClick={onClose} className="w-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">Tutup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[500] flex items-center justify-center p-6">
      <div className="bg-white rounded-[2.5rem] p-10 w-full max-w-sm shadow-2xl space-y-8 animate-in zoom-in-95">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-800">
            {isRegister ? 'Daftar Admin' : 'Admin Login'}
          </h2>
          <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mt-2">
            {isRegister ? 'Buat akun pengelola arisan' : 'Masuk ke dashboard grup'}
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Alamat Email</label>
            <input 
              type="email" placeholder="admin@arisanku.com"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              value={email} onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" placeholder="••••••••"
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              value={pass} onChange={e => setPass(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-2xl shadow-slate-200 disabled:opacity-50"
          >
            {loading ? 'Sesaat...' : (isRegister ? 'Buat Akun Sekarang' : 'Masuk ke Dashboard')}
          </button>
          
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-[10px] font-bold text-rose-500 uppercase tracking-widest hover:text-rose-600 transition-colors"
          >
            {isRegister ? 'Sudah punya akun? Login saja' : 'Belum punya akun? Daftar gratis'}
          </button>
          
          <button onClick={onClose} className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Tutup</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
