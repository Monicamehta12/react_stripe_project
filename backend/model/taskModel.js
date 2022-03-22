const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const bcrypt = require('bcryptjs');
const moment = require('moment')
const Project = require('./projectModel');

const TaskDetail = sequelize.define('taskdetail', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        get: function() {
            return moment.utc(this.getDataValue('date')).format('YYYY-MM-DD');
          }
    },
    estimatedDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    finalTime: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reply:{
        type: Sequelize.STRING,
    },
    qa:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    codeQuality: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    approvedByClient:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    developerName:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// association
Project.hasMany(TaskDetail, {
    foreignKey: 'project_id'
})
TaskDetail.belongsTo(Project, {
    foreignKey: 'project_id'
})


module.exports = TaskDetail