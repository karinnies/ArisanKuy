
import React, { useState, useEffect } from 'react';
import { AppSettings, Rule } from '../types';

interface Props {
  settings: AppSettings;
  rules: Rule[];
  onSaveSettings: (data: AppSettings) => Promise<void>;
  onSaveRules: (rules: string[]) => Promise<void>;
}

const AdminPanel: React.FC<Props> = ({ settings, rules, onSaveSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  // Sync local state when settings from prop changes (e.g. after refresh)
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await onSaveSettings(localSettings);
    setIsSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Settings Section */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          ⚙️ Konfigurasi Sistem
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin PIN</label>
            <input 
              type="password"
              value={localSettings.admin_pin}
              onChange={(e) => setLocalSettings({...localSettings, admin_pin: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 mt-2 font-black focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rekening Tujuan</label>
            <input 
              type="text"
              value={localSettings.rekening_tujuan}
              onChange={(e) => setLocalSettings({...localSettings, rekening_tujuan: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 mt-2 font-bold focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Admin (62xxx)</label>
            <input 
              type="text"
              value={localSettings.whatsapp_admin}
              onChange={(e) => setLocalSettings({...localSettings, whatsapp_admin: e.target.value})}
              className="w-full bg-slate-50 border-none rounded-2xl p-4 mt-2 font-bold focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <button 
            disabled={isSaving}
            onClick={handleSaveSettings}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-100 hover:bg-slate-800 transition-all mt-4 disabled:opacity-50"
          >
            {isSaving ? 'Menyimpan...' : 'Update Settings'}
          </button>
        </div>
      </div>

      {/* Rules Section - View Only for Now to prevent SheetDB free tier limits */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
        <h2 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
          📜 Daftar Aturan
        </h2>
        <div className="space-y-3">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="font-black text-orange-500">{idx + 1}</span>
              <p className="text-xs font-medium text-slate-600">{rule.Konten}</p>
            </div>
          ))}
          <p className="text-[10px] text-slate-400 italic text-center mt-4">
            *Untuk mengedit aturan, silakan hubungi developer atau edit langsung di Spreadsheet tab 'rules'.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
