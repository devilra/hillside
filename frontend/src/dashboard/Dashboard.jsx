import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  LogOut, Home, RefreshCw, AlertCircle, CheckCircle, 
  Plus, Pencil, Trash2, HelpCircle, LayoutDashboard, Globe,
  Flame, Rocket, Gem, FileText
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { logout } from '../store/slices/authSlice.js';
import API_URL from '../app';

const POPULAR_ICONS = [
  'Mountain', 'FileCheck', 'TrendingUp', 'Home', 'Shield', 
  'MapPin', 'Trees', 'Compass', 'Award', 'Sparkles', 'Heart'
];

const AMENITIES_LIST = [
  'Gymnasium', 'Swimming Pool', 'Sports Facility', 'Indoor Games',
  'Children\'s Play Area', 'Club House', 'Cafeteria', 'Rain Water Harvesting',
  'Intercom', '24 X 7 Security'
];

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const token = useSelector(state => state.auth.token);
  const email = useSelector(state => state.auth.email) || 'Admin';

  // Tab State
  const [activeTab, setActiveTab] = useState('fast_moving'); // 'fast_moving' | 'latest_launch' | 'exclusive'

  // Projects CMS state
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [editingProject, setEditingProject] = useState(null); // stores project template or object
  const [projectDeleteConfirm, setProjectDeleteConfirm] = useState(null);

  // Auto redirect to login page if no auth token is stored
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    
    fetchProjects();
  }, [token, navigate, activeTab]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Projects CMS API calls
  const fetchProjects = async () => {
    setProjectLoading(true);
    setProjectError(null);
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        setProjectError('Failed to fetch projects.');
      }
    } catch (err) {
      setProjectError('Failed to connect to backend server for projects.');
    } finally {
      setProjectLoading(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!editingProject.title || !editingProject.location || !editingProject.routeSubpath) {
      alert('Title, Location, and Route Subpath are required.');
      return;
    }

    const isEdit = !!editingProject.id;
    const url = isEdit
      ? `${API_URL}/api/projects/${editingProject.id}`
      : `${API_URL}/api/projects`;
    const method = isEdit ? 'PUT' : 'POST';

    const formData = new FormData();
    formData.append('type', activeTab);
    formData.append('title', editingProject.title);
    formData.append('author', editingProject.author || '');
    formData.append('location', editingProject.location);
    formData.append('routeSubpath', editingProject.routeSubpath);
    formData.append('priceToken', editingProject.priceToken || '');
    formData.append('status', editingProject.status || 'Ready to Move');
    formData.append('possessionDate', editingProject.possessionDate || '');
    formData.append('totalApts', editingProject.totalApts || '');
    formData.append('launchTimeline', editingProject.launchTimeline || '');
    formData.append('reraId', editingProject.reraId || '');
    formData.append('amenities', JSON.stringify(editingProject.amenities || []));
    formData.append('description', editingProject.description || '');

    if (editingProject.mainImageFile) {
      formData.append('mainImage', editingProject.mainImageFile);
    }
    if (editingProject.galleryFiles) {
      for (let i = 0; i < editingProject.galleryFiles.length; i++) {
        formData.append('galleryImages', editingProject.galleryFiles[i]);
      }
    }

    setProjectLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        setEditingProject(null);
        fetchProjects();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to save project.');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error connecting to backend server.');
    } finally {
      setProjectLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectDeleteConfirm) return;
    try {
      const response = await fetch(`${API_URL}/api/projects/${projectDeleteConfirm.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        setProjectDeleteConfirm(null);
        fetchProjects();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete project.');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Error connecting to backend server.');
    }
  };

  const handleAmenityCheckboxChange = (amenityName) => {
    const currentList = editingProject.amenities || [];
    const newList = currentList.includes(amenityName)
      ? currentList.filter(item => item !== amenityName)
      : [...currentList, amenityName];
    setEditingProject({ ...editingProject, amenities: newList });
  };

  // Filter projects by current active tab
  const filteredProjects = projects.filter(p => p.type === activeTab);

  // Dynamic headers
  const getTabHeaderTitle = () => {
    if (activeTab === 'fast_moving') return 'Premium 1-Acre Estates Manager';
    if (activeTab === 'latest_launch') return 'Elite 1.5-Acre Estates Manager';
    if (activeTab === 'exclusive') return 'Exclusive Projects Manager';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#080f0d] text-slate-100 flex font-sans antialiased">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-64 bg-[#0a1411] border-r border-[#142822] flex flex-col justify-between h-screen sticky top-0 shrink-0 z-40">
        
        {/* Top Branding Section */}
        <div>
          <div className="p-6 border-b border-[#142822] flex items-center gap-3.5">
            <div className="bg-[#7fff00]/10 border border-[#7fff00]/30 rounded-2xl p-2.5 text-[#7fff00] shadow-md shadow-[#7fff00]/5">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <h1 className="text-md font-extrabold text-white tracking-wider uppercase">Hillsite</h1>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">Control Desk</p>
            </div>
          </div>

          {/* Navigation Menus in Sidebar */}
          <nav className="p-4 space-y-2 mt-4">

            <button
              onClick={() => setActiveTab('fast_moving')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === 'fast_moving'
                  ? 'bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5'
                  : 'text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent'
              }`}
            >
              <Flame size={18} className={activeTab === 'fast_moving' ? 'text-[#7fff00]' : ''} />
              <span>Premium 1-Acre Estates</span>
            </button>

            <button
              onClick={() => setActiveTab('latest_launch')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === 'latest_launch'
                  ? 'bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5'
                  : 'text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent'
              }`}
            >
              <Rocket size={18} className={activeTab === 'latest_launch' ? 'text-[#7fff00]' : ''} />
              <span>Elite 1.5-Acre Estates</span>
            </button>

            <button
              onClick={() => setActiveTab('exclusive')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === 'exclusive'
                  ? 'bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5'
                  : 'text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent'
              }`}
            >
              <Gem size={18} className={activeTab === 'exclusive' ? 'text-[#7fff00]' : ''} />
              <span>Exclusive Projects</span>
            </button>
            
            <a
              href="/"
              className="w-full flex items-center gap-3 text-slate-400 hover:text-white hover:bg-[#11241f]/40 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border border-transparent"
            >
              <Globe size={18} />
              <span>Back to Site</span>
            </a>
          </nav>
        </div>

        {/* Bottom User Info & Logout */}
        <div className="p-4 border-t border-[#142822] space-y-4">
          <div className="flex flex-col px-2">
            <span className="text-xs font-bold text-white tracking-wide truncate">{email}</span>
            <span className="text-[9px] text-[#7fff00] uppercase font-bold tracking-widest mt-0.5">Administrator</span>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-950/20 hover:bg-red-900/30 text-red-300 border border-red-900/30 py-2.5 rounded-xl text-xs font-bold transition-all duration-250 cursor-pointer outline-none active:scale-[0.98]"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 min-h-screen bg-[#080f0d] p-8 md:p-12 overflow-y-auto">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-[#142822]">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{getTabHeaderTitle()}</h2>
            <p className="text-sm text-slate-400 mt-1">
              Manage listings published under the {activeTab === 'fast_moving' ? 'Premium 1-Acre Estates' : activeTab === 'latest_launch' ? 'Elite 1.5-Acre Estates' : 'Exclusive Projects'} properties carousel.
            </p>
          </div>
          
          <button
            onClick={() => setEditingProject({ 
              title: '', author: '', location: '', routeSubpath: '', priceToken: '', 
              status: 'Ready to Move', possessionDate: '', totalApts: '', launchTimeline: '', 
              reraId: '', amenities: [], description: '', mainImageFile: null, galleryFiles: null 
            })}
            className="flex items-center gap-2 bg-[#7fff00] hover:bg-[#6ee600] text-slate-950 px-5 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-[#7fff00]/10 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={16} />
            Add Listing
          </button>
        </div>

        {/* Global Connec        {projectError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <p className="text-sm">{projectError}</p>
          </div>
        )}

        {/* Dynamic Display Area */}
        {projectLoading ? (
          <div className="flex items-center justify-center py-40">
            <RefreshCw size={32} className="animate-spin text-slate-500" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-[#0a1411]/20 border border-[#142822] rounded-3xl p-16 text-center shadow-inner">
            <p className="text-slate-400 font-medium mb-1">No project listings found for this category.</p>
            <p className="text-xs text-slate-500">Click "+ Add Listing" to create your first dynamic property listing.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-[#0a1411]/50 border border-[#142822] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#1e3c33] hover:bg-[#0c1815]/60 hover:shadow-xl hover:shadow-black/25 transition-all duration-300 group"
              >
                <div>
                  {/* Cover image with status badge */}
                  <div className="relative overflow-hidden h-[190px] bg-slate-950">
                    <img 
                      src={project.mainImage || 'https://placehold.co/320x200/e2e8f0/94a3b8?text=Property'} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.target.src = `https://placehold.co/320x200/e2e8f0/94a3b8?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                    {project.status && (
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-[#7fff00] text-[10px] font-bold px-3 py-1.5 rounded-full border border-emerald-950/40">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[11px] text-slate-450 font-semibold truncate">By {project.author || 'Admin'}</span>
                      <span className="text-[11px] text-emerald-400 font-bold">{project.routeSubpath}</span>
                    </div>
                    
                    <h3 className="text-base font-extrabold text-white leading-snug tracking-tight truncate group-hover:text-[#7fff00] transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <span>📍</span> {project.location}
                    </p>
                    
                    <p className="text-[#7fff00] font-black text-base pt-1">
                      {project.priceToken || 'Price on request'}
                    </p>

                    {/* Display specs if any */}
                    {(project.launchTimeline || project.totalApts) && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-450 pt-1.5 border-t border-[#142822]/60">
                        {project.launchTimeline && <span>{project.launchTimeline}</span>}
                        {project.launchTimeline && project.totalApts && <span className="w-px h-2.5 bg-[#142822]"></span>}
                        {project.totalApts && <span>{project.totalApts}</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2.5 border-t border-[#142822]/80 p-5 pt-4 justify-end bg-slate-950/20">
                  <button
                    onClick={() => setEditingProject({ 
                      ...project, 
                      amenities: JSON.parse(project.amenities || '[]'),
                      mainImageFile: null,
                      galleryFiles: null
                    })}
                    className="flex items-center gap-1.5 bg-[#12231e] hover:bg-[#1a342c] text-slate-200 px-4 py-2 rounded-xl text-xs font-bold border border-[#1d3a31]/55 transition-colors cursor-pointer outline-none"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => setProjectDeleteConfirm(project)}
                    className="flex items-center gap-1.5 bg-red-950/20 hover:bg-red-900/30 text-red-300 border border-red-900/25 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer outline-none"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>



      {/* ─── MODAL: MODIFY DYNAMIC LISTING & CONTENT ─── */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a1411] border border-[#1c3d33] rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-thin">
            <h3 className="text-xl font-bold text-white mb-6 tracking-tight border-b border-[#142822] pb-4">
              Modify Dynamic Listing & Content
            </h3>
            
            <form onSubmit={handleSaveProject} className="space-y-6">
              
              {/* Row 1: Title and Author */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Scenic Valley Plots"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Developer / Author
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Hillsite Developers"
                    value={editingProject.author}
                    onChange={(e) => setEditingProject({ ...editingProject, author: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Location and Route Subpath */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yelagiri Hills"
                    value={editingProject.location}
                    onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Route Subpath (verbatim) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /scenic-valley"
                    value={editingProject.routeSubpath}
                    onChange={(e) => setEditingProject({ ...editingProject, routeSubpath: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Pricing and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Pricing / Description Token
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 25.Cr or 45 L Onwards"
                    value={editingProject.priceToken}
                    onChange={(e) => setEditingProject({ ...editingProject, priceToken: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Status Target
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-3 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237fff00%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:0.9rem_0.9rem] bg-[right_1rem_center] bg-no-repeat"
                  >
                    <option value="Ready to Move" className="bg-[#0a1411]">Ready to Move</option>
                    <option value="Under Construction" className="bg-[#0a1411]">Under Construction</option>
                    <option value="New Launch" className="bg-[#0a1411]">New Launch</option>
                    <option value="Assisted" className="bg-[#0a1411]">Assisted</option>
                    <option value="Verified" className="bg-[#0a1411]">Verified</option>
                  </select>
                </div>
              </div>

              {/* Section B: Overview Fields */}
              <div className="border-t border-[#142822]/80 pt-4">
                <h4 className="text-xs font-bold text-emerald-450 uppercase tracking-widest mb-3.5">
                  Section B: Overview Page Target Fields (Centreparkcontent)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9px] text-slate-450 font-bold mb-1 uppercase tracking-wider">
                      Possession Date String
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nov'19 or Immediate"
                      value={editingProject.possessionDate}
                      onChange={(e) => setEditingProject({ ...editingProject, possessionDate: e.target.value })}
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-3 py-2 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-450 font-bold mb-1 uppercase tracking-wider">
                      Total Launched Apts / Area
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2500 or 1200 sq ft"
                      value={editingProject.totalApts}
                      onChange={(e) => setEditingProject({ ...editingProject, totalApts: e.target.value })}
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-3 py-2 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-450 font-bold mb-1 uppercase tracking-wider">
                      Launch Timeline / Config
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Feb'17 or 2,3 BHK"
                      value={editingProject.launchTimeline}
                      onChange={(e) => setEditingProject({ ...editingProject, launchTimeline: e.target.value })}
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-3 py-2 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="block text-[9px] text-slate-450 font-bold mb-1 uppercase tracking-wider">
                    RERA ID Registry Numbers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. P51700000506, P51700000596"
                    value={editingProject.reraId}
                    onChange={(e) => setEditingProject({ ...editingProject, reraId: e.target.value })}
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Amenities Checkboxes */}
              <div className="border-t border-[#142822]/80 pt-4">
                <label className="block text-[10px] text-slate-450 font-bold mb-2.5 uppercase tracking-widest">
                  Select Available Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AMENITIES_LIST.map((amenity) => (
                    <label 
                      key={amenity} 
                      className="flex items-center gap-2 text-xs text-slate-350 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={(editingProject.amenities || []).includes(amenity)}
                        onChange={() => handleAmenityCheckboxChange(amenity)}
                        className="w-4 h-4 rounded border-[#1b3d33] bg-[#060c0a] text-[#7fff00] focus:ring-0 cursor-pointer accent-[#7fff00]"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Detailed Description Block */}
              <div className="border-t border-[#142822]/80 pt-4">
                <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                  Detailed Description Block
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter detailed description block content..."
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-3 text-xs focus:border-[#7fff00]/60 outline-none transition-colors resize-none"
                />
              </div>

              {/* Cover Image and Gallery Image Upload */}
              <div className="border-t border-[#142822]/80 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Main Cover Image *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditingProject({ ...editingProject, mainImageFile: e.target.files[0] })}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#1b3d33] file:text-xs file:font-bold file:bg-[#12231e] file:text-white hover:file:bg-[#1a342c] file:cursor-pointer"
                  />
                  {editingProject.mainImage && !editingProject.mainImageFile && (
                    <div className="mt-2 text-[10px] text-emerald-400 flex items-center gap-1.5 truncate">
                      <span>Current:</span>
                      <a href={editingProject.mainImage} target="_blank" rel="noreferrer" className="underline truncate">
                        {editingProject.mainImage}
                      </a>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Gallery Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setEditingProject({ ...editingProject, galleryFiles: e.target.files })}
                    className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#1b3d33] file:text-xs file:font-bold file:bg-[#12231e] file:text-white hover:file:bg-[#1a342c] file:cursor-pointer"
                  />
                  {editingProject.galleryImages && !editingProject.galleryFiles && (
                    <div className="mt-2 text-[10px] text-slate-450 truncate">
                      Gallery size: {JSON.parse(editingProject.galleryImages || '[]').length} images
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-6 border-t border-[#142822] mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="bg-[#12231e] hover:bg-[#1a342c] text-slate-350 px-5 py-3 rounded-xl text-xs font-bold border border-[#1d3a31]/55 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={projectLoading}
                  className="bg-[#7fff00] hover:bg-[#6ee600] disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 px-6 py-3 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-md shadow-[#7fff00]/10 flex items-center gap-2"
                >
                  {projectLoading ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" /> Saving Listing...
                    </>
                  ) : (
                    'Save Card'
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL: DELETE PROJECT LISTING CONFIRMATION ─── */}
      {projectDeleteConfirm && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a1411] border border-red-950/60 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative animate-scale-in">
            <h3 className="text-md font-bold text-red-400 mb-2.5">Delete Project Listing?</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to permanently delete the listing <strong className="text-slate-200 font-semibold">{projectDeleteConfirm.title}</strong>? This property listing will immediately disappear from the public home page.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setProjectDeleteConfirm(null)}
                className="bg-[#12231e] hover:bg-[#1a342c] text-slate-350 px-4 py-2 rounded-xl text-xs font-bold border border-[#1d3a31]/50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="bg-red-650 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
