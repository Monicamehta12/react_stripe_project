const router = require('express').Router()
const projectCtlr = require('../controller/projectController')
const taskCtlr = require('../controller/taskController')
const protect = require('../middleware/auth')

router.route('/Addproject').post(protect, projectCtlr.createProject);
router.route('/Viewproject/:id').get(protect, projectCtlr.getProjectById);
router.route(`/searchbystatus/:statusoption`).get(protect, projectCtlr.getProjectByStatus);
router.route('/searchbyname/:searchValue').get(protect, projectCtlr.searchByName);


//task routes of project
router.route('/Viewproject/addTask').post(protect,taskCtlr.addTask)
router.route('/tasks/getAllTaskbyProject/:id').get(protect,taskCtlr.getAllTaskbyProject)
router.route('/tasks/updateTask/:taskID').put(protect, taskCtlr.updateTask)
router.route('/tasks/deleteTask/:id').delete(protect, taskCtlr.deleteTask)
router.route('/tasks/:id').get(protect, taskCtlr.getTaskById)

module.exports = router