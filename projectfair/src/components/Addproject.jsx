import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { addproject } from '../services/allAPI';
import { addProjectResponseContext } from './context/ContextShare';
import { useContext } from 'react';


function Addproject() {

  const{addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
  const [token,setToken] = useState("")
  const [projectDetails,setprojectDetails]=useState({
    title:"",languages:"",github:"",website:"",overview:"",projectImage:""
  })
  const [preview,setPreview]=useState("")

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setprojectDetails({
      title:"",languages:"",github:"",website:"",overview:"",projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);

  const handleadd = async(e)=>{
    e.preventDefault()
    const { title,languages,github,website,overview,projectImage} = projectDetails

    if(!title || !languages || !github || !website || !overview || !projectImage){
      alert("Please enter the Filled!!")
    }
    else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)

    
      if(token){
          const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
         }
         const result = await addproject(reqBody,reqHeader)
      if(result.status === 200){
        console.log(result.data);
        handleClose();
        setAddProjectResponse(result.data)
      }else{
        console.log(result);
        console.log(result.response.data);
      }
      }

      
    }
  }

  return (
    <>
     <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

      <Modal size='lg' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
            <div className="col-6">
                <label>
                    <input type="file" style={{display:'none'}} onChange={e=>setprojectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                    <img width={'350px'} src={preview?preview:"https://imgs.search.brave.com/lnooywfhfpdsFYfSoz0RE8iY5XRKfQcoBP9gswnPEIw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE3Lzg4Lzcz/LzM2MF9GXzIxNzg4/NzM1MF9tRGZMdjJv/b3RRTmVmZldYVDU3/VlFyOE9YN0l2Wkt2/Qi5qcGc"} alt="" />
                </label>
            </div>
            <div className="col-6">
                <input type="text" className='form-control mt-5' placeholder='Project Title' value={projectDetails.title} onChange={e=>setprojectDetails({...projectDetails,title:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Language Used'value={projectDetails.languages} onChange={e=>setprojectDetails({...projectDetails,languages:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Github'value={projectDetails.github} onChange={e=>setprojectDetails({...projectDetails,github:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Website Link'value={projectDetails.website} onChange={e=>setprojectDetails({...projectDetails,website:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Project Overview'value={projectDetails.overview} onChange={e=>setprojectDetails({...projectDetails,overview:e.target.value})}/>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleadd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Addproject