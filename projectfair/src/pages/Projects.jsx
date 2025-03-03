import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectAPI } from '../services/allAPI'

function Projects() {

  const[searchKey,setSearchKey] = useState("")
  const [allProjects,setAllProjects] = useState([])

  const getAllProjects = async ()=>{
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result = await allProjectAPI(searchKey,reqHeader)
      if(result.status === 200){
        setAllProjects(result.data)
      }else{
        console.log(result);
      }
    }
  }

  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])


  return (
    <>
     <Header/>
     <div style={{marginTop:'100px'}} className='projects'>
      <h1 className='text-center mb-5'>All projects</h1>
      <div className='d-flex justify-content-center w-100'>
        <div className='d-flex border w-50 rounded mb-3'>
          <input type="text" className='form-control ' placeholder='search project by technologies' value={searchKey} onChange={e=>setSearchKey(e.target.value)}/>
          <i style={{marginLeft:'-50px',marginTop:'10px'}} class="fa-solid fa-magnifying-glass"></i>
          
        </div>
      </div>
      <Row>
        {
          allProjects.length > 0 ? allProjects?.map(projects=>(
            <Col className='d-flex justify-content-center' sm = {12} md = {6} lg = {4}>
        <ProjectCard projects={projects}/>
        </Col>
          )):<p className='text-danger text-center'>Please Login</p>
        }
      </Row>
    </div>
    </>
  )
}

export default Projects