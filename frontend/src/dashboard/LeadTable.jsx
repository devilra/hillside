import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, SlidersHorizontal, Calendar, Phone, 
  MapPin, Eye, CheckSquare, Trash2, AlertCircle
} from 'lucide-react';
import { 
  setActiveTab, setSearchTerm, setStatusFilter, 
  updateLeadStatusAsync 
} from '../store/slices/leadsSlice.js';

export default function LeadTable({ onInspectLead, onConfirmDelete }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  
  const leads = useSelector(state => state.leads.list);
  const loading = useSelector(state => state.leads.loading);
  const activeTab = useSelector(state => state.leads.activeTab);
  const searchTerm = useSelector(state => state.leads.searchTerm);
  const statusFilter = useSelector(state => state.leads.statusFilter);

  // Calculate Tab counts
  const contactCount = leads.filter(l => l.type === 'contact').length;
  const dreamLandCount = leads.filter(l => l.type === 'dream_land').length;

  // Filter lists based on tab, status, and search query
  const filteredLeads = leads.filter(lead => {
    const matchesTab = lead.type === activeTab;
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchLower) ||
      lead.phone.toLowerCase().includes(searchLower) ||
      (lead.city && lead.city.toLowerCase().includes(searchLower)) ||
      (lead.requirements && lead.requirements.toLowerCase().includes(searchLower)) ||
      (lead.landSize && lead.landSize.toLowerCase().includes(searchLower)) ||
      (lead.land_size && lead.land_size.toLowerCase().includes(searchLower));

    return matchesTab && matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id, currentStatus) => {
    const nextStatus = currentStatus === 'new' ? 'contacted' : 'new';
    dispatch(updateLeadStatusAsync(id, nextStatus, token));
  };

  return (
    <div className="bg-slate-950/20 border border-slate-800 rounded-3xl overflow-hidden">
      
      {/* Control Panel (Tabs, Search, Status filters) */}
      <div className="p-5 border-b border-slate-800 flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-4 bg-slate-950/40">
        
        {/* Tabs */}
        <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex gap-1 self-start">
          <button
            onClick={() => dispatch(setActiveTab('contact'))}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'contact' ? 'bg-[#7fff00] text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Callback Requests ({contactCount})
          </button>
          <button
            onClick={() => dispatch(setActiveTab('dream_land'))}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'dream_land' ? 'bg-[#7fff00] text-slate-950 shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Property Demands ({dreamLandCount})
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Text Search */}
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-slate-500" size={16} />
            <input
              type="text"
              placeholder="Search name, phone..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="bg-slate-900 border border-slate-800 pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-green-500 w-full sm:w-56 transition-all"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative flex items-center">
            <SlidersHorizontal className="absolute left-3 text-slate-500" size={14} />
            <select
              value={statusFilter}
              onChange={(e) => dispatch(setStatusFilter(e.target.value))}
              className="bg-slate-900 border border-slate-800 pl-9 pr-8 py-2 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-green-500 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:0.75rem_0.75rem] bg-[right_0.75rem_center] bg-no-repeat w-full"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="ignored">Ignored</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 border-4 border-[#7fff00]/20 border-t-[#7fff00] rounded-full animate-spin"></div>
            <span className="text-sm font-semibold">Retrieving lead records...</span>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
            <AlertCircle size={40} className="text-slate-600" />
            <span className="text-sm font-bold text-slate-400">No matching leads found</span>
            <span className="text-xs text-slate-600">Try adjusting your filters or search term.</span>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/10">
                <th className="px-6 py-4">Submitted At</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Phone</th>
                {activeTab === 'contact' ? (
                  <>
                    <th className="px-6 py-4">City</th>
                    <th className="px-6 py-4">Project / Subtitle</th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4">Land Size</th>
                    <th className="px-6 py-4">Land Types</th>
                  </>
                )}
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className={`hover:bg-slate-800/40 transition-colors group cursor-pointer ${
                    lead.status === 'new' ? 'font-semibold bg-green-500/[0.01]' : ''
                  }`}
                  onClick={() => onInspectLead(lead)}
                >
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(lead.createdAt || lead.created_at).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-200 font-medium">
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${lead.status === 'new' ? 'bg-yellow-400 animate-pulse' : 'bg-transparent'}`}></div>
                      {lead.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono whitespace-nowrap">
                    {lead.phone}
                  </td>
                  {activeTab === 'contact' ? (
                    <>
                      <td className="px-6 py-4 text-slate-300">
                        {lead.city || '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]">
                        {lead.subtitle || '—'}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 text-slate-300 whitespace-nowrap">
                        {lead.landSize || lead.land_size ? `${lead.landSize || lead.land_size} ${lead.unitSize || lead.unit_size}` : '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-400 truncate max-w-[200px]">
                        {lead.landType || lead.land_type || '—'}
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      lead.status === 'new' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                      lead.status === 'contacted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {lead.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleUpdateStatus(lead.id, lead.status)}
                        title="Toggle Contact Status"
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors cursor-pointer border border-slate-700"
                      >
                        <CheckSquare size={13} />
                      </button>
                      <button
                        onClick={() => onInspectLead(lead)}
                        title="Inspect Details"
                        className="p-1.5 bg-slate-800 hover:bg-[#7fff00] hover:text-slate-950 text-slate-300 rounded-lg transition-colors cursor-pointer border border-slate-700"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => onConfirmDelete(lead)}
                        title="Delete Record"
                        className="p-1.5 bg-red-950/60 hover:bg-red-800 text-red-300 hover:text-white rounded-lg transition-colors cursor-pointer border border-red-900/40"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
