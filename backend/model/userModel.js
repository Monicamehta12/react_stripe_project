const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config();
const sequelize = require('../config/db')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Project = require('./projectModel');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    confirmPassword: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

const generateJwtToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        category: user.category
    }, process.env.TOKEN_SECRET);
}

const generatePassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//association
// User.hasMany(Project, {
//     as: 'ManagersProject',
//     foreignKey: 'projectmanager_id'
// })
// Project.belongsTo(User, {
//     as: 'ProjectManager',
//     foreignKey: 'projectmanager_id'
// })

// User.hasMany(Project, {
//     as: 'EmployeesProject',
//     foreignKey: 'members'
// })
// Project.belongsTo(User, {
//     as: 'Employees',
//     foreignKey: 'members'
// })

// //
// User.hasMany(Project, {
//     as: 'ManagersProject',
//     foreignKey: 'projectManager'
// })
// Project.belongsTo(User, {
//     as: 'ProjectManager',
//     foreignKey: 'projectManager'
// })


module.exports = { User, generateJwtToken, generatePassword }