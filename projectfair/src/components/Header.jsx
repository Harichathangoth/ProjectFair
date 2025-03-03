import React, { useContext } from 'react'

import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorizationContext } from './context/TokenAuth'



function Header({insideDashboard}) {

 const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <div>
     <Navbar className="bg-info position-fixed top-0 w-100 z-index-1">
        <Container>
          <Navbar.Brand href="#home">
         <Link to={'/'} style={{textDecoration:'none',fontSize:'30px'}}> 
         <i class="fa-solid fa-list-check fa-lg me-2"></i>
            Project-Fair
            </Link>
          </Navbar.Brand>
          {
            insideDashboard &&
            <button onClick={handleLogout} className='btn align-item-right border'>Logout</button>
          }
        </Container>
      </Navbar>
    </div>
  )
}

export default Header