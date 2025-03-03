import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import projecttitle from '../assets/brands-people-Ax8IA8GAjVg-unsplash.jpg'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjectAPI } from '../services/allAPI'


function Home() {

    const [homeProjects,setHomeProjects] = useState([])
    const [logined,setLogined]=useState(false)
    const getHomeProjects = async()=>{
        
        const result = await homeProjectAPI()
        if(result.status === 200){
            setHomeProjects(result.data)
        }else{
            console.log(result)
            console.log(result.response)
        }
    }

    console.log(homeProjects)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setLogined(true);
        }else{
            setLogined(false);
        }
        // API call
        getHomeProjects()
    },[])

  return (
   <>
    <div style={{}} className='container-fluid rounded bg-info'>
       <Row className='align-items-center p-5'>
       <Col sm={12} md={6}>
            <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'><i class="fa-solid fa-list-check fa-lg me-2"></i>Project-Fair</h1>
            <p className=''>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid eveniet totam numquam ex nulla quo magni laudantium aperiam ducimus inventore, tempore eaque enim! Beatae fugiat totam, ut mollitia blanditiis a!</p>
           {
            logined?
            <Link to={'/dashboard'} className='btn btn-warning'>Manage projects<i class="fa-solid fa-right-long fa-beat ms-2"></i></Link>:
            <Link to={'/login'} className='btn btn-warning'>Start to Explore <i class="fa-solid fa-right-long fa-beat ms-2"></i></Link>
           }
        </Col>
        <Col sm={12} md={6}>
            <img style={{width:'400px',height:'250px'}} src={projecttitle} alt="" />
        </Col>
       </Row>
    </div>
    <div className='all-projects mt-5'>
        <h1 className='text-center'>Explore Your Projects</h1>
       <marquee scrollAmount={24}>
       <Row>
        {
            homeProjects.length>0?homeProjects.map(projects=>(
               <Col sm={12} md={6} lg={4}>
                 <ProjectCard projects={projects}/>
               </Col>
            )):null
        }
        </Row>
       </marquee>
        <div className='text-center'><Link to={'/projects'}>View More Projects</Link></div>
    </div>
   </>
  )
}

export default Home