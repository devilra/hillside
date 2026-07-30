import Project from "./models/Project.js";
import { sequelize } from "./config/db.js";

async function run() {
  try {
    const projects = await Project.findAll();
    console.log(JSON.stringify(projects.map(p => ({
      id: p.id,
      title: p.title,
      mainImage: p.mainImage,
      galleryImages: p.galleryImages,
    })), null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
}
run();
