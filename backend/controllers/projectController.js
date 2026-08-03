import Project from "../models/Project.js";
import { isCloudinaryConfigured } from "../config/cloudinary.js";
import path from "path";
import fs from "fs/promises";

// Helper: resolve uploaded file URL
// const handleFileUpload = (file, req) => {
//   if (!file) return null;

//   // Cloudinary
//   if (isCloudinaryConfigured) {
//     return file.path;
//   }

//   const host = req.get("host");
//   const protocol = req.protocol;

//   let folder = "";

//   if (file.fieldname === "mainImage") {
//     folder = "main";
//   } else if (file.fieldname === "galleryImages") {
//     folder = "gallery";
//   }

//   return `${protocol}://${host}/images/${folder}/${file.filename}`;
// };

// ======================================================
// YOUTUBE HELPERS
// ======================================================
const extractYoutubeVideoId = (url) => {
  if (!url) return null;

  // Embed URL
  if (url.includes("/embed/")) {
    return url.split("/embed/")[1]?.split("?")[0];
  }

  // Watch URL
  if (url.includes("watch?v=")) {
    return url.split("watch?v=")[1]?.split("&")[0];
  }

  // youtu.be URL
  if (url.includes("youtu.be/")) {
    return url.split("youtu.be/")[1]?.split("?")[0];
  }

  return null;
};

const buildYoutubeMedia = (links = []) => {
  return links
    .map((url) => {
      const videoId = extractYoutubeVideoId(url);
      if (!videoId) return null;
      return {
        type: "youtube",
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        fallbackThumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };
    })
    .filter(Boolean);
};

const deleteVideoFromStorage = async (videoPath) => {
  try {
    if (!videoPath) {
      return;
    }

    // Expected DB path:
    // /videos/1753365512345-demo.mp4
    const fileName = path.basename(videoPath);
    const absolutePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "videos",
      fileName,
    );
    await fs.unlink(absolutePath);
    console.log(`Video deleted: ${absolutePath}`);
  } catch (error) {
    // Ignore if file doesn't exist
    if (error.code !== "ENOENT") {
      console.error("Video delete failed:", error);
    }
  }
};

const deleteImageFromStorage = async (imagePath) => {
  try {
    if (!imagePath) return;

    // Example:
    // /images/main/abc.webp
    // /images/gallery/xyz.webp

    const cleanPath = imagePath.replace(/^https?:\/\/[^/]+/, "");
    const fileName = path.basename(cleanPath);

    let folder = "";

    if (imagePath.includes("/images/main/")) {
      folder = "main";
    } else if (imagePath.includes("/images/gallery/")) {
      folder = "gallery";
    } else {
      return;
    }

    const absolutePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "images",
      folder,
      fileName,
    );

    await fs.unlink(absolutePath);

    console.log(`Image deleted: ${absolutePath}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.error("Image delete failed:", error);
    }
  }
};

// const convertToWebP = async (file, folder) => {
//   // New filename
//   const newName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}.webp`;

//   // Original uploaded file path
//   const inputPath = path.join(file.destination, file.filename);

//   // Output path
//   const outputPath = path.join(
//     process.cwd(),
//     "public",
//     "uploads",
//     "images",
//     folder,
//     newName,
//   );

//   // Convert to WebP
//   await sharp(inputPath)
//     .rotate() // Keep original orientation
//     .webp({
//       quality: 98, // High quality
//       effort: 6, // Better compression
//       lossless: false,
//     })
//     .toFile(outputPath);

//   // Delete original uploaded file
//   await fs.unlink(inputPath);

//   return {
//     fileName: newName,
//     path: `/images/${folder}/${newName}`,
//   };
// };

const getBaseUrl = (req) => {
  const protocol = req.protocol;
  const host = req.get("host");

  // Local
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return `${protocol}://${host}`;
  }

  // Production
  return `${protocol}://${host}/hillsite`;
};

const handleFileUpload = (file, req) => {
  if (!file) return null;

  const baseUrl = getBaseUrl(req);

  let folder = "";

  if (file.fieldname === "mainImage") {
    folder = "main";
  } else if (file.fieldname === "galleryImages") {
    folder = "gallery";
  }

  return `${baseUrl}/images/${folder}/${file.filename}`;
};

// ======================================================
// HELPER: Parse JSON array safely
// ======================================================

const parseJsonArray = (value, fallback = []) => {
  if (!value) return fallback;

  // Already array
  if (Array.isArray(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
};

// Retrieve all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [["id", "DESC"]],
    });
    return res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Failed to fetch projects." });
  }
};

// Retrieve a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Uploaded videos
    const uploadedVideos = (project.videos || []).map((video) => ({
      type: "local",
      path: video,
      url: `${req.protocol}://${req.get("host")}${video}`,
      thumbnail: null,
    }));

    // Youtube Videos
    const youtubeVideos = buildYoutubeMedia(project.youtubeEmbeds || []);

    return res.json({
      success: true,
      project,
      media: {
        images: parseJsonArray(project.galleryImages),
        uploadedVideos,
        youtubeVideos,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return res.status(500).json({ message: "Failed to fetch project." });
  }
};

// ======================================================
// CREATE PROJECT
// ======================================================

export const createProject = async (req, res) => {
  try {
    const {
      // Basic details
      type,
      title,
      author,
      location,
      routeSubpath,
      priceToken,
      status,

      // Overview
      possessionDate,
      totalApts,
      launchTimeline,
      reraId,

      // Land details
      ownerName,
      area,
      waterSource,
      fencingType,
      landSketch,
      fmv,

      // Road details
      nearestRoad,
      distanceToMainRoad,
      connectionRoadWidth,
      roadType,

      // Connectivity / Verification
      ebConnectivity,
      legalVerification,

      // Videos + 360
      videos,
      youtubeEmbeds,
      view360,

      // Other
      amenities,
      description,

      // Images
      mainImage,
      galleryImages,
    } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!type || !title || !location || !routeSubpath) {
      return res.status(400).json({
        success: false,
        message: "Type, Title, Location, and Route Subpath are required.",
      });
    }

    // ==================================================
    // PARSE JSON DATA
    // ==================================================

    const parsedVideos = parseJsonArray(videos);
    const parsedYoutubeEmbeds = parseJsonArray(youtubeEmbeds);
    const parsedAmenities = parseJsonArray(amenities);
    const parsedGalleryImages = parseJsonArray(galleryImages);

    // ==================================================
    // CREATE PROJECT
    // ==================================================

    const newProject = await Project.create({
      // Basic
      type,
      title,
      author,
      location,
      routeSubpath,
      priceToken,
      status,

      // Overview
      possessionDate,
      totalApts,
      launchTimeline,
      reraId,

      // Land
      ownerName,
      area,
      waterSource,
      fencingType,
      landSketch,
      fmv,

      // Road
      nearestRoad,
      distanceToMainRoad,
      connectionRoadWidth,
      roadType,

      // Connectivity
      ebConnectivity,
      legalVerification,

      // IMPORTANT:
      // Your Sequelize videos field has a setter.
      // So give it ARRAY directly.
      videos: parsedVideos,
      youtubeEmbeds: parsedYoutubeEmbeds,

      // 360
      view360,

      // Other
      amenities: JSON.stringify(parsedAmenities),
      description,

      // Images
      mainImage,
      galleryImages: parsedGalleryImages,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create project.",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE PROJECT
// ======================================================

// export const updateProject = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const project = await Project.findByPk(id);

//     if (!project) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found.",
//       });
//     }

//     const {
//       // Basic
//       type,
//       title,
//       author,
//       location,
//       routeSubpath,
//       priceToken,
//       status,

//       // Overview
//       possessionDate,
//       totalApts,
//       launchTimeline,
//       reraId,

//       // Land
//       ownerName,
//       area,
//       waterSource,
//       fencingType,
//       landSketch,
//       fmv,

//       // Road
//       nearestRoad,
//       distanceToMainRoad,
//       connectionRoadWidth,
//       roadType,

//       // Connectivity
//       ebConnectivity,
//       legalVerification,

//       // Video / 360
//       videos,
//       youtubeEmbeds,
//       view360,

//       // Other
//       amenities,
//       description,
//       mainImage,
//       galleryImages,
//     } = req.body;

//     // ==================================================
//     // MAIN IMAGE
//     // ==================================================

//     let mainImageUrl = project.mainImage;

//     if (req.files && req.files["mainImage"] && req.files["mainImage"][0]) {
//       mainImageUrl = handleFileUpload(req.files["mainImage"][0], req);
//     }

//     // ==================================================
//     // EXISTING GALLERY
//     // ==================================================

//     let galleryUrls = parseJsonArray(project.galleryImages);

//     // Add newly uploaded gallery images
//     if (req.files && req.files["galleryImages"]) {
//       for (const file of req.files["galleryImages"]) {
//         const url = handleFileUpload(file, req);

//         if (url) {
//           galleryUrls.push(url);
//         }
//       }
//     }

//     // ==================================================
//     // VIDEOS
//     // ==================================================

//     let parsedVideos = project.videos || [];

//     if (videos !== undefined) {
//       parsedVideos = parseJsonArray(videos);
//     }

//     let parsedYoutubeEmbeds = project.youtubeEmbeds || [];
//     if (youtubeEmbeds !== undefined) {
//       parsedYoutubeEmbeds = parseJsonArray(youtubeEmbeds);
//     }

//     // ==================================================
//     // AMENITIES
//     // ==================================================

//     let parsedAmenities = parseJsonArray(project.amenities);

//     if (amenities !== undefined) {
//       parsedAmenities = parseJsonArray(amenities);
//     }

//     // console.log("Updating Project:", id);
//     // console.log("Videos:", parsedVideos);

//     // ==================================================
//     // UPDATE DATABASE
//     // ==================================================

//     await project.update({
//       // Basic
//       type: type !== undefined ? type : project.type,

//       title: title !== undefined ? title : project.title,

//       author: author !== undefined ? author : project.author,

//       location: location !== undefined ? location : project.location,

//       routeSubpath:
//         routeSubpath !== undefined ? routeSubpath : project.routeSubpath,

//       priceToken: priceToken !== undefined ? priceToken : project.priceToken,

//       status: status !== undefined ? status : project.status,

//       // Overview
//       possessionDate:
//         possessionDate !== undefined ? possessionDate : project.possessionDate,

//       totalApts: totalApts !== undefined ? totalApts : project.totalApts,

//       launchTimeline:
//         launchTimeline !== undefined ? launchTimeline : project.launchTimeline,

//       reraId: reraId !== undefined ? reraId : project.reraId,

//       // ================================================
//       // LAND DETAILS
//       // ================================================

//       ownerName: ownerName !== undefined ? ownerName : project.ownerName,

//       area: area !== undefined ? area : project.area,

//       waterSource:
//         waterSource !== undefined ? waterSource : project.waterSource,

//       fencingType:
//         fencingType !== undefined ? fencingType : project.fencingType,

//       landSketch: landSketch !== undefined ? landSketch : project.landSketch,

//       fmv: fmv !== undefined ? fmv : project.fmv,

//       // ================================================
//       // ROAD DETAILS
//       // ================================================

//       nearestRoad:
//         nearestRoad !== undefined ? nearestRoad : project.nearestRoad,

//       distanceToMainRoad:
//         distanceToMainRoad !== undefined
//           ? distanceToMainRoad
//           : project.distanceToMainRoad,

//       connectionRoadWidth:
//         connectionRoadWidth !== undefined
//           ? connectionRoadWidth
//           : project.connectionRoadWidth,

//       roadType: roadType !== undefined ? roadType : project.roadType,

//       // ================================================
//       // CONNECTIVITY
//       // ================================================

//       ebConnectivity:
//         ebConnectivity !== undefined ? ebConnectivity : project.ebConnectivity,

//       legalVerification:
//         legalVerification !== undefined
//           ? legalVerification
//           : project.legalVerification,

//       // ================================================
//       // VIDEOS
//       // ================================================

//       videos: parsedVideos,
//       youtubeEmbeds: parsedYoutubeEmbeds,

//       // ================================================
//       // 360 VIEW
//       // ================================================

//       view360: view360 !== undefined ? view360 : project.view360,

//       // ================================================
//       // OTHER
//       // ================================================

//       amenities: JSON.stringify(parsedAmenities),

//       description:
//         description !== undefined ? description : project.description,

//       mainImage: mainImageUrl,

//       galleryImages: JSON.stringify(galleryUrls),
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Project updated successfully.",
//       project,
//     });
//   } catch (error) {
//     console.error("Error updating project:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to update project.",
//       error: error.message,
//     });
//   }
// };

export const updateProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    const {
      // Basic
      type,
      title,
      author,
      location,
      routeSubpath,
      priceToken,
      status,

      // Overview
      possessionDate,
      totalApts,
      launchTimeline,
      reraId,

      // Land
      ownerName,
      area,
      waterSource,
      fencingType,
      landSketch,
      fmv,

      // Road
      nearestRoad,
      distanceToMainRoad,
      connectionRoadWidth,
      roadType,

      // Connectivity
      ebConnectivity,
      legalVerification,

      // Videos / 360
      videos,
      youtubeEmbeds,
      view360,

      // Other
      amenities,
      description,

      // Images
      mainImage,
      galleryImages,
    } = req.body;

    // ==================================================
    // VIDEOS
    // ==================================================

    let parsedVideos = project.videos || [];

    if (videos !== undefined) {
      parsedVideos = parseJsonArray(videos);
    }

    let parsedYoutubeEmbeds = project.youtubeEmbeds || [];

    if (youtubeEmbeds !== undefined) {
      parsedYoutubeEmbeds = parseJsonArray(youtubeEmbeds);
    }

    // ==================================================
    // GALLERY IMAGES
    // ==================================================

    let parsedGalleryImages = project.galleryImages || [];

    if (galleryImages !== undefined) {
      parsedGalleryImages = parseJsonArray(galleryImages);
    }

    // ==================================================
    // AMENITIES
    // ==================================================

    let parsedAmenities = parseJsonArray(project.amenities);

    if (amenities !== undefined) {
      parsedAmenities = parseJsonArray(amenities);
    }

    // ==================================================
    // UPDATE DATABASE
    // ==================================================

    await project.update({
      // Basic
      type: type !== undefined ? type : project.type,

      title: title !== undefined ? title : project.title,

      author: author !== undefined ? author : project.author,

      location: location !== undefined ? location : project.location,

      routeSubpath:
        routeSubpath !== undefined ? routeSubpath : project.routeSubpath,

      priceToken: priceToken !== undefined ? priceToken : project.priceToken,

      status: status !== undefined ? status : project.status,

      // Overview
      possessionDate:
        possessionDate !== undefined ? possessionDate : project.possessionDate,

      totalApts: totalApts !== undefined ? totalApts : project.totalApts,

      launchTimeline:
        launchTimeline !== undefined ? launchTimeline : project.launchTimeline,

      reraId: reraId !== undefined ? reraId : project.reraId,

      // ================================================
      // LAND DETAILS
      // ================================================

      ownerName: ownerName !== undefined ? ownerName : project.ownerName,

      area: area !== undefined ? area : project.area,

      waterSource:
        waterSource !== undefined ? waterSource : project.waterSource,

      fencingType:
        fencingType !== undefined ? fencingType : project.fencingType,

      landSketch: landSketch !== undefined ? landSketch : project.landSketch,

      fmv: fmv !== undefined ? fmv : project.fmv,

      // ================================================
      // ROAD DETAILS
      // ================================================

      nearestRoad:
        nearestRoad !== undefined ? nearestRoad : project.nearestRoad,

      distanceToMainRoad:
        distanceToMainRoad !== undefined
          ? distanceToMainRoad
          : project.distanceToMainRoad,

      connectionRoadWidth:
        connectionRoadWidth !== undefined
          ? connectionRoadWidth
          : project.connectionRoadWidth,

      roadType: roadType !== undefined ? roadType : project.roadType,

      // ================================================
      // CONNECTIVITY
      // ================================================

      ebConnectivity:
        ebConnectivity !== undefined ? ebConnectivity : project.ebConnectivity,

      legalVerification:
        legalVerification !== undefined
          ? legalVerification
          : project.legalVerification,

      // ================================================
      // VIDEOS
      // ================================================

      videos: parsedVideos,

      youtubeEmbeds: parsedYoutubeEmbeds,

      // ================================================
      // 360 VIEW
      // ================================================

      view360: view360 !== undefined ? view360 : project.view360,

      // ================================================
      // OTHER
      // ================================================

      amenities: JSON.stringify(parsedAmenities),

      description:
        description !== undefined ? description : project.description,

      // ================================================
      // IMAGES
      // ================================================

      mainImage: mainImage !== undefined ? mainImage : project.mainImage,

      galleryImages: parsedGalleryImages,
    });

    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error("Error updating project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update project.",
      error: error.message,
    });
  }
};

// ======================================================
// DELETE PROJECT
// ======================================================

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    // ==================================================
    // DELETE PROJECT VIDEOS FROM SERVER
    // ==================================================

    const projectVideos = project.videos || [];

    if (Array.isArray(projectVideos)) {
      await Promise.all(
        projectVideos.map((videoPath) => deleteVideoFromStorage(videoPath)),
      );
    }

    // ==================================================
    // DELETE PROJECT DATABASE RECORD
    // ==================================================

    await project.destroy();

    return res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting project:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete project.",
      error: error.message,
    });
  }
};

export const uploadProjectVideos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No videos uploaded.",
      });
    }

    const protocol = req.protocol;
    const host = req.get("host");

    const videos = req.files.map((file) => ({
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      // Relative path -> Save in DB
      path: `/videos/${file.filename}`,
      // Full URL -> Preview in frontend
      url: `${protocol}://${host}/videos/${file.filename}`,
    }));

    return res.status(200).json({
      success: true,
      message: "Videos uploaded successfully.",
      count: videos.length,
      videos,
    });
  } catch (error) {
    console.error("Video Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Video upload failed.",
    });
  }
};

export const deleteUploadedVideo = async (req, res) => {
  try {
    const { videoPath } = req.body;
    if (!videoPath) {
      return res.status(400).json({
        success: false,
        message: "Video path is required.",
      });
    }

    await deleteVideoFromStorage(videoPath);
    return res.json({
      success: true,
      message: "Video deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete video.",
      error: error.message,
    });
  }
};

export const uploadMainImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    // const protocol = req.protocol;
    // const host = req.get("host");

    const baseUrl = getBaseUrl(req);

    // const converted = await convertToWebP(req.file, "main");

    // const image = {
    //   fileName: req.file.filename,
    //   originalName: req.file.originalname,
    //   mimeType: "image/webp",
    //   size: req.file.size,

    //   // Save this in DB
    //   path: `${baseUrl}${converted.path}`,

    //   // Preview URL
    //   url: `${baseUrl}${converted.path}`,
    // };

    const image = {
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,

      path: `${baseUrl}/images/main/${req.file.filename}`,
      url: `${baseUrl}/images/main/${req.file.filename}`,
    };

    return res.status(200).json({
      success: true,
      message: "Main image uploaded successfully.",
      image,
    });
  } catch (error) {
    console.error("Main Image Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Main image upload failed.",
    });
  }
};

export const uploadGalleryImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No gallery images uploaded.",
      });
    }

    // const protocol = req.protocol;
    // const host = req.get("host");

    const baseUrl = getBaseUrl(req);

    const images = req.files.map((file) => ({
      fileName: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,

      path: `${baseUrl}/images/gallery/${file.filename}`,
      url: `${baseUrl}/images/gallery/${file.filename}`,
    }));

    // const images = [];
    // for (const file of req.files) {
    //   const converted = await convertToWebP(file, "gallery");
    //   images.push({
    //     fileName: converted.fileName,
    //     originalName: file.originalname,
    //     mimeType: "image/webp",
    //     size: file.size,

    //     // FULL URL
    //     path: `${baseUrl}${converted.path}`,

    //     url: `${baseUrl}${converted.path}`,
    //   });
    // }

    // const images = req.files.map((file) => ({
    //   fileName: file.filename,
    //   originalName: file.originalname,
    //   mimeType: file.mimetype,
    //   size: file.size,

    //   // Save in DB
    //   path: `/images/gallery/${file.filename}`,

    //   // Preview URL
    //   url: `${protocol}://${host}/images/gallery/${file.filename}`,
    // }));

    return res.status(200).json({
      success: true,
      message: "Gallery images uploaded successfully.",
      count: images.length,
      images,
    });
  } catch (error) {
    console.error("Gallery Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Gallery image upload failed.",
      error: error.message,
    });
  }
};

export const deleteUploadedMainImage = async (req, res) => {
  try {
    const { imagePath } = req.body;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image path is required.",
      });
    }

    await deleteImageFromStorage(imagePath);

    return res.json({
      success: true,
      message: "Main image deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete main image.",
      error: error.message,
    });
  }
};

export const deleteUploadedGalleryImage = async (req, res) => {
  try {
    const { imagePath } = req.body;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image path is required.",
      });
    }

    await deleteImageFromStorage(imagePath);

    return res.json({
      success: true,
      message: "Gallery image deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete gallery image.",
      error: error.message,
    });
  }
};
