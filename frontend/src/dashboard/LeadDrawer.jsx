import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, Phone, Calendar, MapPin, Trash2 } from 'lucide-react';
import { updateLeadStatusAsync } from '../store/slices/leadsSlice.js';

export default function LeadDrawer({ lead, onClose, onDeleteConfirm }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  if (!lead) return null;

  const handleStatusChange = (e) => {
    dispatch(updateLeadStatusAsync(lead.id, e.target.value, token));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
      {/* Side panel container */}
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl animate-slide-in">
        <div>
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="text-base font-bold text-white">Lead Details Inspection</h3>
              <p className="text-xs text-slate-400 mt-0.5">Reference ID: #{lead.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-lg font-bold p-1 hover:bg-slate-800 rounded-lg w-8 h-8 flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Core Client details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Client Name</p>
              <p className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                <User size={13} className="text-green-400" />
                {lead.name}
              </p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone Number</p>
              <p className="text-sm font-semibold text-white mt-1 flex items-center gap-1.5">
                <Phone size={13} className="text-blue-400" />
                {lead.phone}
              </p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Submitted On</p>
              <p className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-1.5">
                <Calendar size={13} className="text-slate-500" />
                {new Date(lead.createdAt || lead.created_at).toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</p>
              <div className="mt-1">
                <select
                  value={lead.status}
                  onChange={handleStatusChange}
                  className="bg-slate-900 border border-slate-700 text-xs text-white rounded px-2 py-0.5 focus:outline-none focus:border-green-500 cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="ignored">Ignored</option>
                </select>
              </div>
            </div>
          </div>

          {/* Specification fields */}
          <div className="border-t border-slate-800/80 pt-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Inquiry Specifications</h4>
            
            {lead.type === 'contact' ? (
              <div className="space-y-3 bg-slate-950/20 border border-slate-800 rounded-2xl p-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">TARGET CITY</p>
                  <p className="text-xs text-slate-200 mt-1 flex items-center gap-1">
                    <MapPin size={12} className="text-slate-500" />
                    {lead.city || 'Dombivali'}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">PROJECT DETAILS</p>
                  <p className="text-xs text-slate-200 mt-1">{lead.subtitle || 'Lodha Group Centre Park'}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 bg-slate-950/20 border border-slate-800 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold">LAND SIZE REQUIREMENT</p>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">
                      {lead.landSize || lead.land_size || 'Not Specified'} {lead.unitSize || lead.unit_size || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold">BUILD OPTION</p>
                    <p className="text-xs text-slate-200 mt-1 font-semibold">
                      {lead.houseOption || lead.house_option || 'Not Specified'}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">LAND TYPE SELECTIONS</p>
                  <p className="text-xs text-slate-300 mt-1">{lead.landType || lead.land_type || '—'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold">LANDSCAPE SELECTIONS</p>
                  <p className="text-xs text-slate-300 mt-1">{lead.landscape || '—'}</p>
                </div>
                <div className="border-t border-slate-800/60 pt-3">
                  <p className="text-[10px] text-[#7fff00] font-bold">CUSTOM DREAM LAND REQUIREMENTS</p>
                  <p className="text-xs text-slate-200 mt-2 bg-slate-900 border border-slate-800 rounded-xl p-3 leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                    {lead.requirements || 'No custom requirement notes provided.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Drawer actions */}
        <div className="border-t border-slate-800 pt-4 mt-6 flex justify-between gap-3">
          <button
            onClick={() => onDeleteConfirm(lead)}
            className="bg-red-950/50 hover:bg-red-800 border border-red-900/50 text-red-300 hover:text-white px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Trash2 size={13} />
            Delete Record
          </button>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
