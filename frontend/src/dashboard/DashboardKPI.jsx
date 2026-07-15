import React from 'react';
import { useSelector } from 'react-redux';
import { FileText, AlertCircle, Phone, Layers } from 'lucide-react';

export default function DashboardKPI() {
  const leads = useSelector(state => state.leads.list);
  const loading = useSelector(state => state.leads.loading);

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const contactCount = leads.filter(l => l.type === 'contact').length;
  const dreamLandCount = leads.filter(l => l.type === 'dream_land').length;

  const kpis = [
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: <FileText size={24} />,
      color: 'text-slate-200',
      iconBg: 'bg-slate-800/50',
      subText: `${contactCount} Callbacks / ${dreamLandCount} Demands`
    },
    {
      title: 'New Leads',
      value: newLeads,
      icon: <AlertCircle size={24} />,
      color: 'text-yellow-400',
      iconBg: 'bg-yellow-500/10 border border-yellow-500/20',
      subText: 'Leads requiring review'
    },
    {
      title: 'Callbacks Requested',
      value: contactCount,
      icon: <Phone size={24} />,
      color: 'text-blue-400',
      iconBg: 'bg-blue-500/10 border border-blue-500/20',
      subText: '"Want to Know More" forms'
    },
    {
      title: 'Property Demands',
      value: dreamLandCount,
      icon: <Layers size={24} />,
      color: 'text-[#7fff00]',
      iconBg: 'bg-green-500/10 border border-green-500/20',
      subText: 'Custom requirements forms'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {kpis.map((kpi, idx) => (
        <div 
          key={idx} 
          className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 relative overflow-hidden group hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{kpi.title}</p>
              <p className={`text-3xl font-extrabold mt-2 ${kpi.color}`}>
                {loading ? '...' : kpi.value}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${kpi.iconBg} ${kpi.color}`}>
              {kpi.icon}
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
            {kpi.subText}
          </p>
        </div>
      ))}
    </div>
  );
}
