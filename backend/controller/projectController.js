const Project = require('../model/projectModel')
const { User } = require('../model/userModel')
const { sequelize, Op } = require('sequelize')
// const db = require('../model/index');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');
// const { Op } = require('sequelize');
const TaskDetail = require('../model/taskModel');

// const Project = db.projects;

const createProject = async (req, res, next) => {
    const user = req.user;
    console.log("req user", user)
    try {
        if (req.user.category === 'mentor') {
            const project = await Project.create(req.body);
            console.log("project", project);
            // res.status(200).send(project)
            const obj = resPattern.successPattern(httpStatus.OK, project, 'success');
            return res.status(obj.code).json({
                ...obj
            });
        }
        else {
            const message = "You are not allowed"
            return next(new APIError(message, httpStatus.FORBIDDEN, true));
        }
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getProjects = async (req, res, next) => {
    const id = req.user.id;
    const category = req.user.category;
    console.log("===id===", id)
    console.log("===category===", category)
    try {
        if (req.user.category === 'mentor') {
            const projects = await Project.findAll({
                where: { projectManager: id }
            })
            const obj = resPattern.successPattern(httpStatus.OK, projects ,'success')
            console.log("obj", obj);
            return res.status(obj.code).json(obj.data);
        }
        else {
            const projects = await Project.findAll({
                where: { members: { [Op.like]: `%${id}%` } } 
            })
            console.log("employeeproject",projects)
            const obj = resPattern.successPattern(httpStatus.OK, projects ,'success')
            console.log("obj", obj);
            return res.status(obj.code).json(obj.data);
        }

    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getProjectById = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log("project-id", id)
        const project = await Project.findOne({ where: { id: id } });
        console.log('project', project)
        const obj = resPattern.successPattern(httpStatus.OK, project ,'success')
        return res.status(obj.code).json(obj.data);
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }

}

const getProjectByStatus = async (req, res, next) => {
    const id = req.user.id;
    // const user = req.user
    const reqStatus = req.params.statusoption;
    console.log("reqstatus", reqStatus);
    if (req.user.category === 'mentor') {
        const projects = await Project.findAll({
            where: [{ projectManager: id}, {status: reqStatus}]
        })
        const obj = resPattern.successPattern(httpStatus.OK, projects ,'success')
        console.log("obj", obj);
        return res.status(obj.code).json(obj.data);
    }
    else {
        const projects = await Project.findAll({
            where: [{ members: { [Op.like]: `%${id}%` } }, {status: reqStatus} ]
        })
        console.log("employeeproject",projects)
        const obj = resPattern.successPattern(httpStatus.OK, projects ,'success')
        console.log("obj", obj);
        return res.status(obj.code).json(obj.data);
    }
}

const searchByName = async (req, res, next) => {
    try {
        const search = req.params.searchValue;
        console.log("search", search)
        const project = await Project.findAll({ where: { projectName: { [Op.like]: `${search}%` } } })
        console.log("project", project)
        res.status(200).send(project)
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }

}

module.exports = {
    createProject,
    getProjects,
    getProjectByStatus,
    getProjectById,
    searchByName,
    // getProjectwithTaskDetail
}