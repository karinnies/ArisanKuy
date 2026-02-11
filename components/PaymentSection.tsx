
import React from 'react';
import { AppSettings, Rule } from '../types';

interface Props {
  settings: AppSettings;
  rules: Rule[];
}

const PaymentSection: React.FC<Props> = ({ settings, rules }) => {
  const WA_NUMBER = settings.whatsapp_admin || "6281234567890";
  const REK_INFO = settings.rekening_tujuan || "BCA 8820-XXXX-XX";
  const message = encodeURIComponent("Halo Admin, saya mau konfirmasi pembayaran arisan!");
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${message}`;

  return (
    <div className="space-y-6">
      {/* Rules Card */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800">
          📜 Aturan Main
        </h2>
        <div className="space-y-4">
          {rules.length > 0 ? rules.map((rule, idx) => (
            <div key={idx} className="flex gap-4 group">
              <span className="w-6 h-6 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {rule.Konten || "Belum diisi."}
              </p>
            </div>
          )) : (
            <p className="text-xs text-slate-400 italic font-medium">Data aturan belum tersedia.</p>
          )}
        </div>
      </div>

      {/* Payment Info Card */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
        <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800">
          💳 Iuran Arisan
        </h2>
        
        <div className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-50">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(REK_INFO)}`} 
                alt="Payment QR" 
                className="w-12 h-12"
              />
            </div>
            <div className="flex-1">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-1">Metode Transfer</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700 text-sm">{REK_INFO}</span>
                <button 
                  onClick={() => { navigator.clipboard.writeText(REK_INFO); alert("Disalin!"); }}
                  className="text-slate-300 hover:text-rose-400 transition-colors text-xs"
                >
                  Salin
                </button>
              </div>
            </div>
          </div>

          <a 
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-50 hover:bg-[#1ebe57] transition-all"
          >
            <span>Kirim Bukti</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
