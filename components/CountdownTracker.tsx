
import React, { useState, useEffect } from 'react';

const CountdownTracker: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ deadline: '', draw: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();

      const getTargetDate = (day: number) => {
        let target = new Date(year, month, day);
        if (now > target) target = new Date(year, month + 1, day);
        const diff = target.getTime() - now.getTime();
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / 1000 / 60) % 60);
        return `${d}h ${h}m ${m}s`;
      };

      setTimeLeft({
        deadline: getTargetDate(5),
        draw: getTargetDate(10)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl p-6 border border-rose-100 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mb-1">Deadline Bayar (Tgl 5)</p>
          <h4 className="text-xl font-black text-slate-800">{timeLeft.deadline}</h4>
        </div>
        <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">⏳</div>
      </div>
      <div className="bg-white rounded-2xl p-6 border border-amber-100 flex items-center justify-between shadow-sm">
        <div>
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">Hari Kocokan (Tgl 10)</p>
          <h4 className="text-xl font-black text-slate-800">{timeLeft.draw}</h4>
        </div>
        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">🎲</div>
      </div>
    </div>
  );
};

export default CountdownTracker;
