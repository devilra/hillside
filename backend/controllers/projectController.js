import Project from '../models/Project.js';
import { isCloudinaryConfigured } from '../config/cloudinary.js';

// Helper: resolve uploaded file URL
const handleFileUpload = (file, req) => {
  if (!file) return null;
  
  if (isCloudinaryConfigured) {
    // When using CloudinaryStorage, file.path contains the direct secure URL of the image
    return file.path;
  }

  // Fallback to local URL path
  const host = req.get('host');
  const protocol = req.protocol;
  // If the server prefix is used (like on live /hillsite), we should format the path accordingly
  const baseUrl = req.baseUrl || ''; 
  return `${protocol}://${host}${baseUrl}/uploads/${file.filename}`;
};

// Retrieve all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['id', 'DESC']]
    });
    return res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Failed to fetch projects.' });
  }
};

// Retrieve a single project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    return res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ message: 'Failed to fetch project.' });
  }
};

// Create a new project
export const createProject = async (req, res) => {
  try {
    const { 
      type, title, author, location, routeSubpath, priceToken, status,
      possessionDate, totalApts, launchTimeline, reraId, amenities, description
    } = req.body;

    if (!type || !title || !location || !routeSubpath) {
      return res.status(400).json({ message: 'Type, Title, Location, and Route Subpath are required.' });
    }

    // Process main cover image upload
    let mainImageUrl = null;
    if (req.files && req.files['mainImage'] && req.files['mainImage'][0]) {
      mainImageUrl = await handleFileUpload(req.files['mainImage'][0], req);
    }

    // Process gallery images uploads
    let galleryUrls = [];
    if (req.files && req.files['galleryImages']) {
      for (const file of req.files['galleryImages']) {
        const url = await handleFileUpload(file, req);
        if (url) galleryUrls.push(url);
      }
    }

    const newProject = await Project.create({
      type,
      title,
      author,
      location,
      routeSubpath,
      priceToken,
      status,
      possessionDate,
      totalApts,
      launchTimeline,
      reraId,
      amenities: amenities || '[]',
      description,
      mainImage: mainImageUrl,
      galleryImages: JSON.stringify(galleryUrls)
    });

    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    return res.status(500).json({ message: 'Failed to create project.' });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const { 
      type, title, author, location, routeSubpath, priceToken, status,
      possessionDate, totalApts, launchTimeline, reraId, amenities, description
    } = req.body;

    // Handle new main cover image if uploaded
    let mainImageUrl = project.mainImage;
    if (req.files && req.files['mainImage'] && req.files['mainImage'][0]) {
      mainImageUrl = await handleFileUpload(req.files['mainImage'][0], req);
    }

    // Handle new gallery images if uploaded
    let galleryUrls = [];
    if (project.galleryImages) {
      try {
        galleryUrls = JSON.parse(project.galleryImages);
      } catch (e) {
        galleryUrls = [];
      }
    }
    if (req.files && req.files['galleryImages']) {
      for (const file of req.files['galleryImages']) {
        const url = await handleFileUpload(file, req);
        if (url) galleryUrls.push(url);
      }
    }

    await project.update({
      type: type !== undefined ? type : project.type,
      title: title !== undefined ? title : project.title,
      author: author !== undefined ? author : project.author,
      location: location !== undefined ? location : project.location,
      routeSubpath: routeSubpath !== undefined ? routeSubpath : project.routeSubpath,
      priceToken: priceToken !== undefined ? priceToken : project.priceToken,
      status: status !== undefined ? status : project.status,
      possessionDate: possessionDate !== undefined ? possessionDate : project.possessionDate,
      totalApts: totalApts !== undefined ? totalApts : project.totalApts,
      launchTimeline: launchTimeline !== undefined ? launchTimeline : project.launchTimeline,
      reraId: reraId !== undefined ? reraId : project.reraId,
      amenities: amenities !== undefined ? amenities : project.amenities,
      description: description !== undefined ? description : project.description,
      mainImage: mainImageUrl,
      galleryImages: JSON.stringify(galleryUrls)
    });

    return res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Failed to update project.' });
  }
};

// Delete a project listing
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Clean up local images if they are stored locally
    if (project.mainImage && project.mainImage.includes('/uploads/')) {
      const filename = project.mainImage.split('/uploads/')[1];
      const filePath = path.join(uploadDir, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    if (project.galleryImages) {
      try {
        const urls = JSON.parse(project.galleryImages);
        urls.forEach(url => {
          if (url.includes('/uploads/')) {
            const filename = url.split('/uploads/')[1];
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        });
      } catch (e) {
        // Ignore JSON parsing errors
      }
    }

    await project.destroy();
    return res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ message: 'Failed to delete project.' });
  }
};
