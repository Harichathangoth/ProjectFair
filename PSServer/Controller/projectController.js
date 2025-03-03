const projects = require('../Models/projectSchema')


// addproject
exports.addprojects = async(req,res)=>{
    console.log("Inside add project function")
    const userId = req.payload
    const projectImage = req.file.filename
    const{title,languages,github,website,overview} = req.body
    
try {
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(200).json("Project already exist ... upload another one")
    }else{
        const newProject = new projects({
            title,languages,github,website,overview,projectImage,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
    }
} catch (err) {
    res.status(401).json(`Request failed, Error:${err}`)
}
   
}

//get user projects

exports.allUserProjects = async(req,res)=>{
    const userId = req.payload
    try {
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get all projects

exports.allProjects = async(req,res)=>{
    
    const searchKey = req.query.search
    const query ={
        languages:{$regex:searchKey , $options:"i"}
    }

    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

// get home project

exports.getHomeProject = async(req,res)=>{
   

    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}


//Update projects

exports.editProjectController = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const{title,languages,github,website,overview,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
      const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title,languages,github,website,overview,projectImage:uploadProjectImage,userId
          },{new:true}
      )

      await updateProject.save()
      res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
}

//Delete projects

exports.deleteProjectContoller = async(req,res)=>{
    const {id}= req.params

    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(error){
        res.status(401).json(error)
    }


}