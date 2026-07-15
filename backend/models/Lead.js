import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Lead = sequelize.define('Lead', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['contact', 'dream_land']]
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  landSize: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'land_size'
  },
  unitSize: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'Sq.Ft',
    field: 'unit_size'
  },
  houseOption: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'house_option'
  },
  landType: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'land_type'
  },
  landscape: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'landscape'
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'new',
    validate: {
      isIn: [['new', 'contacted', 'ignored']]
    }
  }
}, {
  tableName: 'leads',
  timestamps: true,
  underscored: true
});

export default Lead;
