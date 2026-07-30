import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  LogOut,
  Home,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Plus,
  Pencil,
  Trash2,
  HelpCircle,
  LayoutDashboard,
  Globe,
  Flame,
  Rocket,
  Video as VideoIcon,
  Gem,
  FileText,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { logout } from "../store/slices/authSlice.js";
import API_URL from "../app";

const POPULAR_ICONS = [
  "Mountain",
  "FileCheck",
  "TrendingUp",
  "Home",
  "Shield",
  "MapPin",
  "Trees",
  "Compass",
  "Award",
  "Sparkles",
  "Heart",
];

const AMENITIES_LIST = [
  "Gymnasium",
  "Swimming Pool",
  "Sports Facility",
  "Indoor Games",
  "Children's Play Area",
  "Club House",
  "Cafeteria",
  "Rain Water Harvesting",
  "Intercom",
  "24 X 7 Security",
];

const getGalleryImagesArray = (galleryImages) => {
  if (!galleryImages) return [];
  if (Array.isArray(galleryImages)) return galleryImages;
  try {
    return JSON.parse(galleryImages);
  } catch (e) {
    return [];
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email) || "Admin";

  // Tab State
  const [activeTab, setActiveTab] = useState("fast_moving"); // 'fast_moving' | 'latest_launch' | 'exclusive'

  // Projects CMS state
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectError, setProjectError] = useState(null);
  const [editingProject, setEditingProject] = useState(null); // stores project template or object
  const [projectDeleteConfirm, setProjectDeleteConfirm] = useState(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoUploadProgress, setVideoUploadProgress] = useState(0);
  const [uploadingVideoName, setUploadingVideoName] = useState("");
  const [videoUploadError, setVideoUploadError] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [mainImageUploading, setMainImageUploading] = useState(false);
  const [mainImageUploadError, setMainImageUploadError] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState("");

  // Auto redirect to login page if no auth token is stored
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProjects();
  }, [token, navigate, activeTab]);

  // Sync youtubeInput with editingProject.youtubeEmbeds
  useEffect(() => {
    if (editingProject) {
      const embeds = editingProject.youtubeEmbeds || [];
      const currentParsed = youtubeInput
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
      const isSame =
        embeds.length === currentParsed.length &&
        embeds.every((val, idx) => val === currentParsed[idx]);
      if (!isSame) {
        setYoutubeInput(Array.isArray(embeds) ? embeds.join(", ") : "");
      }
    } else {
      setYoutubeInput("");
    }
  }, [editingProject?.youtubeEmbeds]);

  const handleYoutubeChange = (e) => {
    const value = e.target.value;
    setYoutubeInput(value);

    const parsed = value
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    setEditingProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        youtubeEmbeds: parsed,
      };
    });
  };

  const handleYoutubePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const input = e.target;
    const currentVal = input.value;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    const urls = pastedText
      .split(/[\s,\n]+/)
      .map((u) => u.trim())
      .filter(Boolean);
    if (urls.length === 0) return;

    const formattedPaste = urls.join(", ");

    let newVal = "";
    if (currentVal) {
      const before = currentVal.substring(0, selectionStart);
      const after = currentVal.substring(selectionEnd);

      const needsCommaBefore = before && !before.trim().endsWith(",");
      const needsCommaAfter = after && !after.trim().startsWith(",");

      newVal =
        before +
        (needsCommaBefore ? ", " : "") +
        formattedPaste +
        (needsCommaAfter ? ", " : "") +
        after;
    } else {
      newVal = formattedPaste;
    }

    setYoutubeInput(newVal);

    const parsed = newVal
      .split(",")
      .map((url) => url.trim())
      .filter(Boolean);

    setEditingProject((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        youtubeEmbeds: parsed,
      };
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
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
        setProjectError("Failed to fetch projects.");
      }
    } catch (err) {
      setProjectError("Failed to connect to backend server for projects.");
    } finally {
      setProjectLoading(false);
    }
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();

    if (videoUploading) {
      alert("Video is still uploading. Please wait until upload completes.");
      return;
    }

    if (
      !editingProject.title?.trim() ||
      !editingProject.location?.trim() ||
      !editingProject.routeSubpath?.trim()
    ) {
      alert("Title, Location, and Route Subpath are required.");
      return;
    }

    const isEdit = Boolean(editingProject.id);

    const url = isEdit
      ? `${API_URL}/api/projects/${editingProject.id}`
      : `${API_URL}/api/projects`;

    const method = isEdit ? "PUT" : "POST";

    const projectData = {
      type: activeTab,
      title: editingProject.title || "",
      author: editingProject.author || "",
      location: editingProject.location || "",
      routeSubpath: editingProject.routeSubpath || "",
      priceToken: editingProject.priceToken || "",
      status: editingProject.status || "Ready to Move",
      possessionDate: editingProject.possessionDate || "",
      totalApts: editingProject.totalApts || "",
      launchTimeline: editingProject.launchTimeline || "",
      reraId: editingProject.reraId || "",
      ownerName: editingProject.ownerName || "",
      area: editingProject.area || "",
      waterSource: editingProject.waterSource || "",
      fencingType: editingProject.fencingType || "",
      landSketch: editingProject.landSketch || "",
      fmv: editingProject.fmv || "",
      nearestRoad: editingProject.nearestRoad || "",
      distanceToMainRoad: editingProject.distanceToMainRoad || "",
      connectionRoadWidth: editingProject.connectionRoadWidth || "",
      roadType: editingProject.roadType || "",
      ebConnectivity: editingProject.ebConnectivity || "",
      legalVerification: editingProject.legalVerification || "",
      view360: editingProject.view360 || "",
      videos: editingProject.videos || [],
      youtubeEmbeds: editingProject.youtubeEmbeds || [],
      amenities: editingProject.amenities || [],
      description: editingProject.description || "",
      mainImage: editingProject.mainImage || "",
      galleryImages: getGalleryImagesArray(editingProject.galleryImages),
    };

    try {
      setProjectLoading(true);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save project.");
      }

      console.log("Project saved:", data);

      setEditingProject(null);

      await fetchProjects();

      alert(
        isEdit
          ? "Project updated successfully."
          : "Project created successfully.",
      );
    } catch (error) {
      console.error("Project save error:", error);

      alert(error.message || "Error connecting to backend server.");
    } finally {
      setProjectLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    if (!projectDeleteConfirm) return;
    try {
      const response = await fetch(
        `${API_URL}/api/projects/${projectDeleteConfirm.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.ok) {
        setProjectDeleteConfirm(null);
        fetchProjects();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error connecting to backend server.");
    }
  };

  const handleVideoUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    // Reset input so same video can be selected again later if needed

    event.target.value = "";
    if (files.length === 0) return;
    if (videoUploading) {
      alert("Please wait until the current video upload is completed.");
      return;
    }
    const currentVideos = editingProject?.videos || [];
    // Backend max 20 videos
    if (currentVideos.length + files.length > 20) {
      alert(
        `Maximum 20 videos allowed. You already have ${currentVideos.length} video(s).`,
      );
      return;
    }
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("videos", file);
    });
    try {
      setVideoUploading(true);
      setVideoUploadProgress(0);
      setVideoUploadError("");
      setUploadingVideoName(
        files.length === 1
          ? files[0].name
          : `${files.length} videos uploading...`,
      );
      const response = await axios.post(
        `${API_URL}/api/projects/upload-videos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            setVideoUploadProgress(percent);
          },
        },
      );
      const uploadedVideos = response.data?.videos || [];
      if (uploadedVideos.length === 0) {
        throw new Error("Server did not return uploaded videos.");
      }
      // We only save server paths in Project form state
      const uploadedPaths = uploadedVideos.map((video) => video.path);
      setEditingProject((prev) => ({
        ...prev,

        videos: [...(prev?.videos || []), ...uploadedPaths],
      }));
      setVideoUploadProgress(100);
    } catch (error) {
      console.error("Video upload failed:", error);

      setVideoUploadError(
        error.response?.data?.message ||
          error.message ||
          "Video upload failed.",
      );
    } finally {
      setVideoUploading(false);
      setUploadingVideoName("");
    }
  };

  const handleDeleteVideo = async (videoPath) => {
    if (!videoPath) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this video?",
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/projects/delete-video`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          videoPath,
        },
      });

      setEditingProject((prev) => ({
        ...prev,
        videos: (prev?.videos || []).filter((video) => video !== videoPath),
      }));
    } catch (error) {
      console.error("Video delete failed:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete video.",
      );
    }
  };

  const handleMainImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (mainImageUploading) {
      alert("Please wait until the current image upload is completed.");
      return;
    }

    const formData = new FormData();
    formData.append("mainImage", file);

    try {
      setMainImageUploading(true);
      setMainImageUploadError("");

      const response = await axios.post(
        `${API_URL}/api/projects/upload-main-image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const uploadedImage = response.data?.image;
      if (!uploadedImage || !uploadedImage.path) {
        throw new Error("Server did not return uploaded image details.");
      }

      setEditingProject((prev) => ({
        ...prev,
        mainImage: uploadedImage.path,
      }));
    } catch (error) {
      console.error("Main image upload failed:", error);
      setMainImageUploadError(
        error.response?.data?.message ||
          error.message ||
          "Main image upload failed.",
      );
    } finally {
      setMainImageUploading(false);
    }
  };

  const handleDeleteMainImage = async () => {
    const imagePath = editingProject.mainImage;
    if (!imagePath) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this main image?",
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/projects/delete-main-image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          imagePath,
        },
      });

      setEditingProject((prev) => ({
        ...prev,
        mainImage: "",
      }));
    } catch (error) {
      console.error("Main image delete failed:", error);
      alert("Failed to delete main image from server.");
    }
  };

  const handleGalleryImagesUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (files.length === 0) return;

    if (galleryUploading) {
      alert("Please wait until the current upload is completed.");
      return;
    }

    const currentGallery = getGalleryImagesArray(editingProject?.galleryImages);
    if (currentGallery.length + files.length > 30) {
      alert(
        `Maximum 30 gallery images allowed. You already have ${currentGallery.length} image(s).`,
      );
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("galleryImages", file);
    });

    try {
      setGalleryUploading(true);
      setGalleryUploadError("");

      const response = await axios.post(
        `${API_URL}/api/projects/upload-gallery-images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const uploadedImages = response.data?.images || [];
      if (uploadedImages.length === 0) {
        throw new Error("Server did not return uploaded gallery images.");
      }

      const uploadedPaths = uploadedImages.map((img) => img.path);
      setEditingProject((prev) => {
        const existing = getGalleryImagesArray(prev?.galleryImages);
        return {
          ...prev,
          galleryImages: [...existing, ...uploadedPaths],
        };
      });
    } catch (error) {
      console.error("Gallery images upload failed:", error);
      setGalleryUploadError(
        error.response?.data?.message ||
          error.message ||
          "Gallery images upload failed.",
      );
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleDeleteGalleryImage = async (imagePath) => {
    if (!imagePath) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?",
    );
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/api/projects/delete-gallery-image`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          imagePath,
        },
      });

      setEditingProject((prev) => {
        const existing = getGalleryImagesArray(prev?.galleryImages);
        return {
          ...prev,
          galleryImages: existing.filter((img) => img !== imagePath),
        };
      });
    } catch (error) {
      console.error("Gallery image delete failed:", error);
      alert("Failed to delete gallery image from server.");
    }
  };

  const handleAmenityCheckboxChange = (amenityName) => {
    const currentList = editingProject.amenities || [];
    const newList = currentList.includes(amenityName)
      ? currentList.filter((item) => item !== amenityName)
      : [...currentList, amenityName];
    setEditingProject({ ...editingProject, amenities: newList });
  };

  // Filter projects by current active tab
  const filteredProjects = projects.filter((p) => p.type === activeTab);

  // Dynamic headers
  const getTabHeaderTitle = () => {
    if (activeTab === "fast_moving") return "Premium 1-Acre Estates Manager";
    if (activeTab === "latest_launch") return "Elite 1.5-Acre Estates Manager";
    if (activeTab === "exclusive") return "Exclusive Projects Manager";
    if (activeTab === "small_plot") return "Small Plots from below 25 Cents";
    return "";
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
              <h1 className="text-md font-extrabold text-white tracking-wider uppercase">
                Hillsite
              </h1>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-0.5">
                Control Desk
              </p>
            </div>
          </div>

          {/* Navigation Menus in Sidebar */}
          <nav className="p-4 space-y-2 mt-4">
            <button
              onClick={() => setActiveTab("small_plot")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === "small_plot"
                  ? "bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5"
                  : "text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent"
              }`}
            >
              <Flame
                size={18}
                className={activeTab === "small_plot" ? "text-[#7fff00]" : ""}
              />
              <span>Small below 25cents</span>
            </button>
            <button
              onClick={() => setActiveTab("fast_moving")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === "fast_moving"
                  ? "bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5"
                  : "text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent"
              }`}
            >
              <Flame
                size={18}
                className={activeTab === "fast_moving" ? "text-[#7fff00]" : ""}
              />
              <span>Premium 1-Acre Estates</span>
            </button>

            <button
              onClick={() => setActiveTab("latest_launch")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === "latest_launch"
                  ? "bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5"
                  : "text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent"
              }`}
            >
              <Rocket
                size={18}
                className={
                  activeTab === "latest_launch" ? "text-[#7fff00]" : ""
                }
              />
              <span>Elite 1.5-Acre Estates</span>
            </button>

            <button
              onClick={() => setActiveTab("exclusive")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 text-left outline-none cursor-pointer border ${
                activeTab === "exclusive"
                  ? "bg-[#11241f] border-[#1b3d33] text-white shadow-md shadow-[#7fff00]/5"
                  : "text-slate-400 hover:text-white hover:bg-[#11241f]/20 border-transparent"
              }`}
            >
              <Gem
                size={18}
                className={activeTab === "exclusive" ? "text-[#7fff00]" : ""}
              />
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
            <span className="text-xs font-bold text-white tracking-wide truncate">
              {email}
            </span>
            <span className="text-[9px] text-[#7fff00] uppercase font-bold tracking-widest mt-0.5">
              Administrator
            </span>
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
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {getTabHeaderTitle()}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Manage listings published under the{" "}
              {activeTab === "fast_moving"
                ? "Premium 1-Acre Estates"
                : activeTab === "latest_launch"
                  ? "Elite 1.5-Acre Estates"
                  : activeTab === "small_plot"
                    ? "Small Plots from below 25 Cents"
                    : "Exclusive Projects"}{" "}
              properties carousel.
            </p>
          </div>

          <button
            onClick={() =>
              setEditingProject({
                title: "",
                author: "",
                location: "",
                routeSubpath: "",
                priceToken: "",
                status: "Ready to Move",
                possessionDate: "",
                totalApts: "",
                launchTimeline: "",
                reraId: "",
                amenities: [],
                description: "",
                // Land Details
                ownerName: "",
                area: "",
                waterSource: "",
                fencingType: "",
                landSketch: "",
                fmv: "",
                nearestRoad: "",
                distanceToMainRoad: "",
                connectionRoadWidth: "",
                roadType: "",
                ebConnectivity: "",
                legalVerification: "",
                // Video paths
                videos: [],
                youtubeEmbeds: [],
                // 360 View
                view360: "",
                mainImage: "",
                galleryImages: [],
              })
            }
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
            <p className="text-slate-400 font-medium mb-1">
              No project listings found for this category.
            </p>
            <p className="text-xs text-slate-500">
              Click "+ Add Listing" to create your first dynamic property
              listing.
            </p>
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
                      src={
                        project.mainImage ||
                        "https://placehold.co/320x200/e2e8f0/94a3b8?text=Property"
                      }
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
                      <span className="text-[11px] text-slate-450 font-semibold truncate">
                        By {project.author || "Admin"}
                      </span>
                      <span className="text-[11px] text-emerald-400 font-bold">
                        {project.routeSubpath}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-white leading-snug tracking-tight truncate group-hover:text-[#7fff00] transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <span>📍</span> {project.location}
                    </p>

                    <p className="text-[#7fff00] font-black text-base pt-1">
                      {project.priceToken || "Price on request"}
                    </p>

                    {/* Display specs if any */}
                    {(project.launchTimeline || project.totalApts) && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-450 pt-1.5 border-t border-[#142822]/60">
                        {project.launchTimeline && (
                          <span>{project.launchTimeline}</span>
                        )}
                        {project.launchTimeline && project.totalApts && (
                          <span className="w-px h-2.5 bg-[#142822]"></span>
                        )}
                        {project.totalApts && <span>{project.totalApts}</span>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2.5 border-t border-[#142822]/80 p-5 pt-4 justify-end bg-slate-950/20">
                  <button
                    onClick={() =>
                      setEditingProject({
                        ...project,
                        amenities:
                          typeof project.amenities === "string"
                            ? JSON.parse(project.amenities || "[]")
                            : project.amenities || [],
                        youtubeEmbeds: project.youtubeEmbeds || [],
                        mainImage: project.mainImage || "",
                        galleryImages: getGalleryImagesArray(
                          project.galleryImages,
                        ),
                      })
                    }
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
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        title: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        author: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        location: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        routeSubpath: e.target.value,
                      })
                    }
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
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        priceToken: e.target.value,
                      })
                    }
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Status Target
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        status: e.target.value,
                      })
                    }
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-3 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%237fff00%22%20stroke-width%3D%222%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-[length:0.9rem_0.9rem] bg-[right_1rem_center] bg-no-repeat"
                  >
                    <option value="Ready to Move" className="bg-[#0a1411]">
                      Ready to Move
                    </option>
                    <option value="Under Construction" className="bg-[#0a1411]">
                      Under Construction
                    </option>
                    <option value="New Launch" className="bg-[#0a1411]">
                      New Launch
                    </option>
                    <option value="Assisted" className="bg-[#0a1411]">
                      Assisted
                    </option>
                    <option value="Verified" className="bg-[#0a1411]">
                      Verified
                    </option>
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
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          possessionDate: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          totalApts: e.target.value,
                        })
                      }
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
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          launchTimeline: e.target.value,
                        })
                      }
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
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        reraId: e.target.value,
                      })
                    }
                    className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                  />
                </div>
              </div>

              {/* ───────── LAND PROPERTY DETAILS ───────── */}
              <div className="border-t border-[#142822]/80 pt-5">
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Land Property Details
                  </h4>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Enter ownership, land, road and verification information.
                  </p>
                </div>
                {/* Owner Name + Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Land Owner Name
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Anandh"
                      value={editingProject.ownerName || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          ownerName: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Land Area
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. 1.25 Acres"
                      value={editingProject.area || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          area: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                </div>
                {/* Water Source + Fencing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Bore / Well / Water Source
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Bore & Well"
                      value={editingProject.waterSource || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          waterSource: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Fencing Type
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Chain Fenced"
                      value={editingProject.fencingType || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          fencingType: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                </div>
                {/* Land Sketch + FMV */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Sketch of the Land
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Available"
                      value={editingProject.landSketch || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          landSketch: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      FMV / Cost of Land
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. 1.80 L per cent"
                      value={editingProject.fmv || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          fmv: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                </div>
                {/* Nearest Road + Distance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Nearest Road
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Nilavoor Main Road"
                      value={editingProject.nearestRoad || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          nearestRoad: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Distance to Main Road
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. 2 Km"
                      value={editingProject.distanceToMainRoad || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          distanceToMainRoad: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                </div>
                {/* Connection Road Width + Road Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Connection Road Width
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. 15 to 20 ft"
                      value={editingProject.connectionRoadWidth || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          connectionRoadWidth: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Road Type
                    </label>

                    <input
                      type="text"
                      placeholder="e.g. Mud Road / Cement Road"
                      value={editingProject.roadType || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          roadType: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                    />
                  </div>
                </div>
                {/* EB + Legal Verification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      EB Connectivity
                    </label>

                    <select
                      value={editingProject.ebConnectivity || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          ebConnectivity: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none"
                    >
                      <option value="">Select EB Connectivity</option>
                      <option value="Available">Available</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                      Legal Verification
                    </label>

                    <select
                      value={editingProject.legalVerification || ""}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          legalVerification: e.target.value,
                        })
                      }
                      className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none"
                    >
                      <option value="">Select Verification</option>
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Not Verified">Not Verified</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* 360 View */}
              <div>
                <label className="block text-[9px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                  360° View URL
                </label>

                <input
                  type="text"
                  placeholder="Paste 360° property view URL"
                  value={editingProject.view360 || ""}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      view360: e.target.value,
                    })
                  }
                  className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                />
              </div>

              {/* YouTube Videos Input */}
              <div className="border-t border-[#142822]/80 pt-5">
                <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-widest">
                  YouTube Videos (Paste URLs to auto comma-separate)
                </label>
                <input
                  type="text"
                  placeholder="Paste YouTube watch/share/embed URLs (comma separated)"
                  value={youtubeInput}
                  onChange={handleYoutubeChange}
                  onPaste={handleYoutubePaste}
                  className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-2.5 text-xs focus:border-[#7fff00]/60 outline-none transition-colors"
                />
                <p className="text-[9px] text-slate-500 mt-1">
                  Supports multiple URLs. Paste links to automatically add comma
                  separation.
                </p>
              </div>

              {/* ───────── PROPERTY VIDEO UPLOAD ───────── */}
              <div className="border-t border-[#142822]/80 pt-5">
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                    Property Videos
                  </h4>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Upload property walkthrough or land videos. Videos are
                    uploaded immediately after selection.
                  </p>
                </div>

                {/* Upload Input */}
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold mb-1.5 uppercase tracking-wider">
                    Upload Videos
                  </label>

                  <input
                    type="file"
                    multiple
                    disabled={videoUploading}
                    accept="video/mp4,video/webm,video/quicktime,video/x-msvideo,video/x-matroska"
                    onChange={handleVideoUpload}
                    className={`
        w-full text-xs
        file:mr-4
        file:py-2
        file:px-4
        file:rounded-xl
        file:border
        file:text-xs
        file:font-bold
        transition-all

        ${
          videoUploading
            ? `
              text-slate-600
              cursor-not-allowed
              file:bg-slate-800
              file:border-slate-700
              file:text-slate-500
              file:cursor-not-allowed
            `
            : `
              text-slate-400
              cursor-pointer
              file:bg-[#12231e]
              file:border-[#1b3d33]
              file:text-white
              hover:file:bg-[#1a342c]
              file:cursor-pointer
            `
        }
      `}
                  />

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px] text-slate-500">
                      MP4, WEBM, MOV, AVI and MKV supported.
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {(editingProject.videos || []).length} / 20 videos
                    </p>
                  </div>
                </div>

                {/* ───── CURRENT UPLOAD PROGRESS ───── */}
                {videoUploading && (
                  <div className="mt-5 bg-[#060c0a] border border-[#1b3d33] rounded-2xl p-4">
                    <div className="flex items-center gap-4">
                      {/* Circular Progress */}
                      <div
                        className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: `conic-gradient(
              #7fff00 ${videoUploadProgress * 3.6}deg,
              #142822 0deg
            )`,
                        }}
                      >
                        {/* Inner circle */}
                        <div className="absolute w-[46px] h-[46px] bg-[#060c0a] rounded-full" />

                        <span className="relative z-10 text-[10px] font-black text-white">
                          {videoUploadProgress}%
                        </span>
                      </div>

                      {/* Upload Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <VideoIcon
                            size={15}
                            className="text-[#7fff00] shrink-0"
                          />

                          <p className="text-xs font-bold text-white truncate">
                            {uploadingVideoName}
                          </p>
                        </div>

                        <p className="text-[10px] text-slate-500 mt-1">
                          Uploading video to server...
                        </p>

                        {/* Horizontal progress */}
                        <div className="w-full h-1.5 bg-[#142822] rounded-full overflow-hidden mt-2">
                          <div
                            className="h-full bg-[#7fff00] rounded-full transition-all duration-300"
                            style={{
                              width: `${videoUploadProgress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 bg-amber-500/5 border border-amber-500/10 rounded-xl px-3 py-2">
                      <p className="text-[10px] text-amber-300">
                        Please wait. You can upload another video after this
                        upload completes.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {videoUploadError && !videoUploading && (
                  <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle
                        size={14}
                        className="text-red-400 shrink-0 mt-0.5"
                      />

                      <p className="text-[10px] text-red-300">
                        {videoUploadError}
                      </p>
                    </div>
                  </div>
                )}

                {/* ───── UPLOADED VIDEO GRID ───── */}
                {(editingProject.videos || []).length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Uploaded Videos
                      </p>

                      <span className="text-[10px] text-emerald-400 font-bold">
                        {(editingProject.videos || []).length} uploaded
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(editingProject.videos || []).map((videoPath, index) => (
                        <div
                          key={`${videoPath}-${index}`}
                          className="relative bg-[#060c0a] border border-[#1b3d33] rounded-2xl p-3 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-[#7fff00]/10 border border-[#7fff00]/20 flex items-center justify-center shrink-0">
                              <LucideIcons.Video
                                size={19}
                                className="text-[#7fff00]"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <LucideIcons.CheckCircle2
                                  size={12}
                                  className="text-emerald-400 shrink-0"
                                />

                                <span className="text-[10px] text-emerald-400 font-bold">
                                  Uploaded
                                </span>
                              </div>

                              <p
                                className="text-[11px] text-white truncate mt-1"
                                title={videoPath}
                              >
                                {videoPath.split("/").pop()}
                              </p>

                              <p className="text-[9px] text-slate-600 truncate mt-0.5">
                                {videoPath}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleDeleteVideo(videoPath)}
                              disabled={videoUploading}
                              className="
        w-9 h-9
        rounded-xl
        bg-red-500/10
        border border-red-500/20
        text-red-400
        hover:bg-red-500/20
        hover:text-red-300
        disabled:opacity-40
        disabled:cursor-not-allowed
        flex items-center
        justify-center
        transition-colors
        cursor-pointer
        shrink-0
      "
                              title="Delete video"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                        checked={(editingProject.amenities || []).includes(
                          amenity,
                        )}
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
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-[#060c0a] border border-[#1b3d33] text-white rounded-xl px-4 py-3 text-xs focus:border-[#7fff00]/60 outline-none transition-colors resize-none"
                />
              </div>

              {/* Cover Image and Gallery Image Upload */}
              <div className="border-t border-[#142822]/80 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Main Cover Image *
                  </label>
                  {mainImageUploading ? (
                    <div className="h-28 bg-[#060c0a] border border-dashed border-[#1b3d33] rounded-xl flex items-center justify-center text-xs text-slate-400">
                      <RefreshCw className="animate-spin mr-2 h-4 w-4 text-emerald-400" />
                      Uploading cover image...
                    </div>
                  ) : editingProject.mainImage ? (
                    <div className="relative group rounded-xl overflow-hidden border border-[#1b3d33] bg-[#060c0a] p-2 flex items-center gap-3">
                      <img
                        src={`${API_URL.replace(/\/$/, "")}${editingProject.mainImage}`}
                        alt="Cover Preview"
                        className="w-16 h-16 object-cover rounded-lg border border-[#1b3d33]/50"
                        onError={(e) => {
                          e.currentTarget.src =
                            editingProject.mainImage.startsWith("http")
                              ? editingProject.mainImage
                              : "https://placehold.co/100x100/e2e8f0/94a3b8?text=Cover";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-400 font-semibold truncate">
                          Cover Image
                        </p>
                        <p className="text-[9px] text-slate-500 truncate">
                          {editingProject.mainImage}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleDeleteMainImage}
                        className="p-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 rounded-lg text-red-400 hover:text-white transition-all cursor-pointer mr-1"
                      >
                        <LucideIcons.X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,.avif,.bmp,.tif,.tiff,.heic,.heif,.dng,image/*"
                        onChange={handleMainImageUpload}
                        className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#1b3d33] file:text-xs file:font-bold file:bg-[#12231e] file:text-white hover:file:bg-[#1a342c] file:cursor-pointer"
                      />
                      {mainImageUploadError && (
                        <p className="text-[10px] text-red-400 mt-1">
                          {mainImageUploadError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] text-slate-450 font-bold mb-1.5 uppercase tracking-wider">
                    Gallery Images
                  </label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.webp,.avif,.bmp,.tif,.tiff,.heic,.heif,.dng,image/*"
                      onChange={handleGalleryImagesUpload}
                      disabled={galleryUploading}
                      className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#1b3d33] file:text-xs file:font-bold file:bg-[#12231e] file:text-white hover:file:bg-[#1a342c] file:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {galleryUploadError && (
                      <p className="text-[10px] text-red-400 mt-1">
                        {galleryUploadError}
                      </p>
                    )}
                    {galleryUploading && (
                      <div className="flex items-center text-[10px] text-slate-450">
                        <RefreshCw className="animate-spin mr-1.5 h-3 w-3 text-emerald-400" />
                        Uploading gallery images...
                      </div>
                    )}

                    {/* Render Gallery Thumbnails */}
                    {getGalleryImagesArray(editingProject.galleryImages)
                      .length > 0 && (
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-1 bg-[#060c0a] border border-[#1b3d33]/60 rounded-xl">
                        {getGalleryImagesArray(
                          editingProject.galleryImages,
                        ).map((imagePath, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden group border border-[#1b3d33]/40"
                          >
                            <img
                              src={`${API_URL.replace(/\/$/, "")}${imagePath}`}
                              alt={`Gallery preview ${index}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = imagePath.startsWith(
                                  "http",
                                )
                                  ? imagePath
                                  : "https://placehold.co/100x100/e2e8f0/94a3b8?text=Image";
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteGalleryImage(imagePath)
                                }
                                className="p-1 bg-red-950/80 border border-red-900/60 rounded-md text-red-400 hover:text-white transition-all cursor-pointer"
                              >
                                <LucideIcons.X size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                  disabled={projectLoading || videoUploading}
                  className="bg-[#7fff00] hover:bg-[#6ee600]
    disabled:bg-slate-800 disabled:text-slate-500
    disabled:cursor-not-allowed
    text-slate-950 px-6 py-3 rounded-xl text-xs font-bold
    transition-colors cursor-pointer shadow-md shadow-[#7fff00]/10
    flex items-center gap-2"
                >
                  {videoUploading ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      Uploading Video...
                    </>
                  ) : projectLoading ? (
                    <>
                      <RefreshCw size={12} className="animate-spin" />
                      Saving Listing...
                    </>
                  ) : (
                    "Save Card"
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
            <h3 className="text-md font-bold text-red-400 mb-2.5">
              Delete Project Listing?
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Are you sure you want to permanently delete the listing{" "}
              <strong className="text-slate-200 font-semibold">
                {projectDeleteConfirm.title}
              </strong>
              ? This property listing will immediately disappear from the public
              home page.
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
