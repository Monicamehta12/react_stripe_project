const Project = require('../model/projectModel')
const TaskDetail = require('../model/taskModel')
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');

const addTask = async (req, res, next) => {
    try {
        const taskDetail = await TaskDetail.create(req.body);
        console.log("project", taskDetail);
        const obj = resPattern.successPattern(httpStatus.OK, taskDetail, 'success');
        return res.status(obj.code).json({
            ...obj
        });
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getAllTasks = async (req, res) => {
    try {
        const taskDetail = await TaskDetail.findAll({});
        res.status(200).send(taskDetail)
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }

}

const getAllTaskbyProject = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("==id==", id)
        const taskDetail = await TaskDetail.findAll({
            include : [{
                model: Project,
                where : {id : id}
            }],
            
        });
        const obj = resPattern.successPattern(httpStatus.OK, taskDetail ,'success')
        return res.status(obj.code).json(obj.data);
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }

}

const updateTask = async (req, res, next) => {
    try {
        const id = req.params.taskID;
        console.log("taskId", id)
        const reqBody = req.body;
        const result = await TaskDetail.update(reqBody, { where: { id: req.params.taskID } })
        const obj = resPattern.successPattern(httpStatus.OK, result, 'success');
        return res.status(obj.code).json({
            ...obj
        });
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const deleteTask = async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    try {
        const resTask = await TaskDetail.destroy({ where: { id: req.params.id } });
        const obj = resPattern.successPattern(httpStatus.OK, resTask, 'success');
        return res.status(obj.code).json(obj.data);
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

const getTaskById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const resTask = await TaskDetail.findOne({ where: { id: id } });
        const obj = resPattern.successPattern(httpStatus.OK, resTask, 'success');
        return res.status(obj.code).json({
            ...obj
        });
    } catch (e) {
        return next(new APIError(e.message, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getAllTasks,
    getAllTaskbyProject,
    getTaskById
}