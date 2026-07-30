import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false, // 'fast_moving', 'latest_launch', 'exclusive'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    routeSubpath: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "route_subpath",
    },
    priceToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "price_token",
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    possessionDate: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "possession_date",
    },
    totalApts: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "total_apts",
    },
    launchTimeline: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "launch_timeline",
    },
    reraId: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "rera_id",
    },
    amenities: {
      type: DataTypes.TEXT,
      allowNull: true, // Stores JSON string array of amenities
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mainImage: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "main_image",
    },

    // Land Details
    ownerName: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "owner_name",
    },
    area: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    waterSource: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "water_source",
    },
    fencingType: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "fencing_type",
    },
    landSketch: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "land_sketch",
    },
    fmv: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    nearestRoad: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "nearest_road",
    },
    distanceToMainRoad: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "distance_to_main_road",
    },
    connectionRoadWidth: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "connection_road_width",
    },
    roadType: {
      type: DataTypes.STRING(200),
      allowNull: true,
      field: "road_type",
    },
    ebConnectivity: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "eb_connectivity",
    },
    legalVerification: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "legal_verification",
    },
    videos: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "videos",

      get() {
        const value = this.getDataValue("videos");
        return value ? JSON.parse(value) : [];
      },

      set(value) {
        this.setDataValue("videos", JSON.stringify(value || []));
      },
    },
    youtubeEmbeds: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "youtube_embeds",
      get() {
        const value = this.getDataValue("youtubeEmbeds");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("youtubeEmbeds", JSON.stringify(value || []));
      },
    },
    view360: {
      type: DataTypes.STRING(500),
      allowNull: true,
      field: "view_360",
    },

    galleryImages: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "gallery_images",

      get() {
        const value = this.getDataValue("galleryImages");
        return value ? JSON.parse(value) : [];
      },

      set(value) {
        this.setDataValue("galleryImages", JSON.stringify(value || []));
      },
    },
  },
  {
    tableName: "projects",
    timestamps: true,
    underscored: true,
  },
);

export default Project;
