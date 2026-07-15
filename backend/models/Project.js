import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false // 'fast_moving', 'latest_launch', 'exclusive'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  routeSubpath: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'route_subpath'
  },
  priceToken: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'price_token'
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  possessionDate: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'possession_date'
  },
  totalApts: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'total_apts'
  },
  launchTimeline: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'launch_timeline'
  },
  reraId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'rera_id'
  },
  amenities: {
    type: DataTypes.TEXT,
    allowNull: true // Stores JSON string array of amenities
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mainImage: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'main_image'
  },
  galleryImages: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'gallery_images' // Stores JSON string array of gallery image URLs
  }
}, {
  tableName: 'projects',
  timestamps: true,
  underscored: true
});

export default Project;
