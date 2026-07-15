import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart3 } from 'lucide-react';

export default function DashboardChart() {
  const leads = useSelector(state => state.leads.list);

  // Group leads by date (createdAt)
  const counts = {};
  leads.slice(0, 30).forEach(lead => {
    const dateStr = new Date(lead.createdAt || lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    counts[dateStr] = (counts[dateStr] || 0) + 1;
  });

  const dates = Object.keys(counts).reverse().slice(-7); // Last 7 active days
  const values = dates.map(d => counts[d]);
  
  const finalDates = dates.length > 0 ? dates : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const finalValues = dates.length > 0 ? values : [0, 0, 0, 0, 0, 0, 0];
  const maxVal = Math.max(...finalValues, 1);

  return (
    <div className="bg-slate-950/30 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <BarChart3 size={16} className="text-[#7fff00]" />
            Inquiry Volume History
          </h3>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-md text-slate-400">Last 7 Active Days</span>
        </div>
        
        {/* SVG custom bar chart */}
        <div className="h-44 w-full flex items-end justify-between px-2 pt-4 pb-2 relative border-b border-slate-800">
          {/* Horizontal grid lines */}
          <div className="absolute inset-x-0 top-1/4 border-t border-slate-800/35 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-2/4 border-t border-slate-800/35 pointer-events-none"></div>
          <div className="absolute inset-x-0 top-3/4 border-t border-slate-800/35 pointer-events-none"></div>

          {finalValues.map((val, idx) => {
            const percentHeight = (val / maxVal) * 80; // Scale maximum bar to 80% height
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-10">
                <div 
                  className="relative w-8 sm:w-12 bg-gradient-to-t from-green-500/20 to-[#7fff00]/80 rounded-t-lg transition-all duration-300 hover:brightness-110" 
                  style={{ height: `${percentHeight}%`, minHeight: val > 0 ? '8px' : '2px' }}
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-[10px] text-white font-bold py-1 px-2 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-md">
                    {val} lead{val !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* X Axis Labels */}
        <div className="flex justify-between px-2 mt-2 text-[10px] text-slate-500 font-semibold">
          {finalDates.map((lbl, idx) => (
            <div key={idx} className="flex-1 text-center truncate px-1">
              {lbl}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
