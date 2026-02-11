
import React from 'react';

interface Props {
  // Fix: Changed rules type to string[] to match GroupData and App.tsx usage
  rules: string[];
}

const RulesCard: React.FC<Props> = ({ rules }) => {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <h2 className="text-lg font-black mb-6 flex items-center gap-2 text-slate-800">
        📜 Aturan Main
      </h2>
      <div className="space-y-4 flex-1">
        {rules.length > 0 ? rules.map((rule, idx) => (
          <div key={idx} className="flex gap-4 group">
            <span className="w-6 h-6 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
              {idx + 1}
            </span>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              {/* Fix: rule is now a string instead of an object with Konten property */}
              {rule || "Belum diisi."}
            </p>
          </div>
        )) : (
          <p className="text-xs text-slate-400 italic font-medium">Data aturan belum tersedia.</p>
        )}
      </div>
    </div>
  );
};

export default RulesCard;
