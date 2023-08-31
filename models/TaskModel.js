import {DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

export const Tareas = sequelize.define('tareas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    delete: {
      type: DataTypes.DATE,
      defaultValue: null
    }
    
  }, {
    tableName: "tareas",
    timestamps: true
  });

  (async () => {
    await sequelize.sync({ force: true });
    // Code here
  })();