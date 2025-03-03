const express =require('express')
const router = new express.Router()
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/multerMiddleware');


//register api

router.post('/user/register',userController.register);

//Login Api

router.post('/user/login',userController.login);

//addproject

router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addprojects)

//Get User Projects

router.get('/user/allprojects',jwtMiddleware,projectController.allUserProjects)

//Get All Projects

router.get('/projects/all',jwtMiddleware,projectController.allProjects)

// Get All Home Projects

router.get('/projects/homeprojects',projectController.getHomeProject)

//Edit project

router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProjectController)

//Delete project

router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectContoller)

//export router
module.exports = router
