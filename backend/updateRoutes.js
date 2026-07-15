import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import Project from './models/Project.js';

dotenv.config();

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-');        // Replace multiple - with single -
};

const update = async () => {
  try {
    await sequelize.authenticate();
    const projects = await Project.findAll();
    console.log(`[UPDATER] Found ${projects.length} projects to update.`);
    for (const project of projects) {
      const slug = slugify(project.title);
      const newPath = `/${slug}`;
      console.log(`[UPDATER] Updating "${project.title}" routeSubpath to: ${newPath}`);
      await project.update({ routeSubpath: newPath });
    }
    console.log("[UPDATER] All projects updated successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[UPDATER] Error updating routes:", error);
    process.exit(1);
  }
};

update();
