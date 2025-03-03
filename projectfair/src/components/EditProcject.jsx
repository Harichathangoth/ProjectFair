import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
import { editProjectAPI } from '../services/allAPI';
import { editProjectResponseContext } from './context/ContextShare';



function EditProcject({project}) {

    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const [projectDetails,setprojectDetails]=useState({
       id:project._id, title:project.title, languages:project.languages, github:project.github, website:project.website, overview:project.overview, projectImage:""
      })
    const [preview,setPreview]=useState("")
   
  const [show, setShow] = useState(false);
  const handleClose = () => {setShow(false)
    setprojectDetails({
      id:project._id,title:project.title, languages:project.languages, github:project.github, website:project.website, overview:project.overview, projectImage:""
    })
    setPreview("")
  }
  
  const handleShow = () => setShow(true);

  const handleUpdate = async()=>{
    const {id,title,languages,github,website,overview,projectImage} = projectDetails
    if(!id || !title || !languages || !github || !website || !overview){
        alert("Please Enter the Details..")
    }else{
          const reqBody = new FormData()
          reqBody.append("title",title)
          reqBody.append("languages",languages)
          reqBody.append("github",github)
          reqBody.append("website",website)
          reqBody.append("overview",overview)
          preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
          const token = sessionStorage.getItem("token")
       console.log(token)
          if(preview){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization":`Bearer ${token}`
            }

            //Api Call

            const result = await editProjectAPI(id,reqBody,reqHeader)
            if(result.status === 200){
                handleClose()

                //pass the response to my projects

                setEditProjectResponse(result.data)

            }else{
                console.log(result)
                alert(result.response.data)
            }

          }else{
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            //Api Call

            const result = await editProjectAPI(id,reqBody,reqHeader)
            if(result.status === 200){
                handleClose()

                //pass the response to my projects
                setEditProjectResponse(result.data)
            }else{
                console.log(result)
                alert(result.response.data)
            }

          }
    }
  }

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])

  return (
    <>
    <button onClick={handleShow} className="btn"><i class="fa-solid fa-pen-to-square"></i></button>
    <Modal size='lg' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row">
            <div className="col-6">
                <label>
                    <input type="file" style={{display:'none'}} onChange={e=>setprojectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                    <img width={'350px'} src={preview?preview:`${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                </label>
            </div>
            <div className="col-6">
                <input type="text" className='form-control mt-5' target="_blank" placeholder='Project Title' value={projectDetails?.title} onChange={e=>setprojectDetails({...projectDetails,title:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Language Used'value={projectDetails?.languages} onChange={e=>setprojectDetails({...projectDetails,languages:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Github'value={projectDetails?.github} onChange={e=>setprojectDetails({...projectDetails,github:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Website Link'value={projectDetails?.website} onChange={e=>setprojectDetails({...projectDetails,website:e.target.value})}/>
                <input type="text" className='form-control mt-3' placeholder='Project Overview'value={projectDetails?.overview} onChange={e=>setprojectDetails({...projectDetails,overview:e.target.value})}/>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProcject