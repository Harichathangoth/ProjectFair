import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import projectpic from '../assets/brands-people-Ax8IA8GAjVg-unsplash.jpg'
import { BASE_URL } from "../services/baseurl";

function ProjectCard({projects}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
    {
      projects && <Card style={{ width: '18rem' }}>
      <Card.Img wi onClick={handleShow} variant="top" src={projects?`${BASE_URL}/uploads/${projects?.projectImage}`:projectpic}  />
      <Card.Body>
        <Card.Title><b>{projects?.title}</b></Card.Title>
      </Card.Body>
    </Card>
    }

    <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col md={6}>
              <img style={{width:'250',height:'200px'}} src={projects?`${BASE_URL}/uploads/${projects?.projectImage}`:projectpic} className='img-fluid' alt="" />
            </Col>
            <Col md={6}>
              <h2>{projects?.title}</h2>
              <p><b>overview : </b>{projects?.overview}</p>
              <p><b>Language Used :</b> <span className='fw-bolder'>{projects?.languages}</span> </p>
            </Col>
          </Row>
          <div className='mt-3'>
            <a target='_blank' href={projects?.github} className='me-2 btn text-dark'><i class="fa-brands fa-github fa-2xl"></i></a>
            <a target='_blank' href={projects?.website} className='me-5 btn text-dark'><i class="fa-solid fa-link fa-2xl"></i></a>
          </div>


        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard