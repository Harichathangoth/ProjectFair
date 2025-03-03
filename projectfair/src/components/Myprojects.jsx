import React, { useEffect, useState } from 'react'
import Addproject from './Addproject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { useContext } from 'react'
import { addProjectResponseContext, editProjectResponseContext } from './context/ContextShare'
import { Alert } from 'react-bootstrap'
import EditProcject from './EditProcject'

function Myprojects() {

    const [userProjects,setUserProjects] = useState("")
    const{editProjectResponse,SetEditProjectResponse} = useContext(editProjectResponseContext)
    const{addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

    const getUserProjects = async()=>{
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
            const result = await userProjectAPI(reqHeader);
            if(result.status === 200){
                setUserProjects(result.data)
            }else{
                console.log(result)
                console.log(result.response.data)
            }
        }
    }

    const deleteProject = async(id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        }

        const result = await deleteProjectAPI(id,reqHeader)
        if(result.status === 200){
            alert("Project Deleted")
            getUserProjects()
        }else{
            alert(result.response.data)
        }
    }

    useEffect(()=>{
        getUserProjects()
    },[addProjectResponse,editProjectResponse])

  return (
    <div className='card shadow p-3 mt-3'>
        <div className='d-flex'>
            <h2>My projects</h2>
            <div className='ms-auto'>
                <Addproject/>
            </div>
        </div>
        {
            addProjectResponse.title?
            <Alert className='bg-success' dismissible>
                <span className='text-danger'>{ addProjectResponse.title}</span>
                Project added successfully
                </Alert>:null
        }
        {
            editProjectResponse.title?
            <Alert className='bg-success' dismissible>
                <span className='text-danger'>{editProjectResponse.title} </span>
                Projectedit successfully
            </Alert>:null
        }
        <div className="mt-4">
            {/* Collection of Projects */}
           {
            userProjects?.length>0?userProjects.map(project=>(
                <div className="border d-flex align-items-center rounded p-2">
                <h5>{project.title}</h5>
                <div className="icon ms-auto">
                    <EditProcject project={project}/>
                    <a href={project.github} target='_blank' class='btn'><i class="fa-brands fa-github"></i></a>
                    <button onClick={()=>deleteProject(project?._id)} className="btn"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
            )): <p className='text-warning fw-bolder fs-5'>No Projects Uploaded yet!!</p>
           }
        </div>
    </div>
  )
}

export default Myprojects