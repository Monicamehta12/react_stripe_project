const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db');
const moment = require('moment')
const { User } = require('./userModel');

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    projectName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    technology: {
        type: Sequelize.STRING,
        allowNull: false
    },
    projectManager: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
            return moment.utc(this.getDataValue('startDate')).format('DD-MM-YYYY');
          }
    },
    endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        get: function() {
            return moment.utc(this.getDataValue('endDate')).format('DD-MM-YYYY');
          }
    },
    members: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//association
// Project.hasMany(User, {
//     foreignKey: 'projectID',
//     as: 'user'
// })
// User.belongsTo(Project, {
//     foreignKey: 'projectID',
//     as: 'project'
// })

module.exports = Project 