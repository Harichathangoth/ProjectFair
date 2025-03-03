
import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';



function Footer() {
  return (
    <div>
      <MDBFooter bgColor='' className='bg-info text-center text-lg-start text-muted pt-2'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
              <i class="fa-solid fa-list-check fa-lg me-2"></i>
               Project Fair
              </h6>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda necessitatibus labore illum perferendis saepe. Provident dicta rem delectus velit rerum itaque architecto aliquid, veniam fugit repellat eum placeat tenetur aspernatur.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Links</h6>
              <p>
                <Navbar.Brand>
                  <Link to={'./'} style={{textDecoration: 'none'}}>
                 Home
                  </Link>
                </Navbar.Brand>
              </p>
              <p>
              <Navbar.Brand>
                    <Link to={'/login'} style={{textDecoration: 'none'}}>
                    Login
                    </Link>
                  </Navbar.Brand>
              </p>
              <p>
              <Navbar.Brand>
                    <Link to={'/register'} style={{textDecoration: 'none'}}>
                   Register
                    </Link>
                  </Navbar.Brand>
              </p>
              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Guides</h6>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  React Bootstrap
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  BootsWatch
                </a>
              </p>
             
            </MDBCol>
            <MDBCol>
              <MDBRow className='d-flex justify-content-center ps-2'>
                <h3>Contact Us</h3>
              </MDBRow>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol md='9' start>
                <MDBInput contrast type='email'  className='mb-4' placeholder='Email'/>
              </MDBCol>
              <MDBCol size="auto">
                <MDBBtn outline  color='warning' type='submit' className='mb-2'>
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
          <MDBBtn outline color="light" floating className='ms-2' href='#!' role='button'>
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='ms-3' href='#!' role='button'>
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='ms-3' href='#!' role='button'>
            <MDBIcon fab icon='google' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='ms-3' href='#!' role='button'>
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='ms-3' href='#!' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn outline color="light" floating className='ms-3' href='#!' role='button'>
            <MDBIcon fab icon='github' />
          </MDBBtn>
            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Media Player.Build With React.
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer






