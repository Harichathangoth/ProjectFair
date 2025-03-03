import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allAPI'
import { tokenAuthorizationContext } from './context/TokenAuth'




function Auth({ register }) {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  const navigate = useNavigate()
  const isRegisterform = register ? true : false

  const [userData,setuserData]=useState({
    username:"",email:"",password:""
  })

  //Register

  const handleRegister = async (e)=>{
    e.preventDefault()
    const {username,email,password}=userData

    if(!username || !email || !password){
      alert("Please fill the missing fileds")
    }else{
      const result = await registerAPI(userData)
      console.log(result);
      if(result.status===200){
        console.log(result)
        alert(`${result.data.username}has registerd successfully`)
        setuserData({
          username:"",email:"",password:""
        })
        navigate('/login')
      }else{
        alert(result.response.data)
        console.log(result)
      }
    }
  }

  // Login
  
  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password}=userData

    if( !email || !password){
      alert("Please fill the missing fileds")
    }else{
      const result = await loginAPI(userData)
      console.log(result);
      if(result.status===200){

       sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
       sessionStorage.setItem("token",result.data.token)
       setIsAuthorized(true)
      
        setuserData({
         email:"",password:""
        })
        navigate('/')
      }else{
        alert(result.response.data)
        console.log(result)
      }
    }
  }

  

  return (
    <div className='d-flex justify-content-center' style={{ width: '100', height: '100vh', marginTop: '100px' }}>
      <div className='container w-75'>
        <Link style={{ textDecoration: 'none' }} to={'/'}><i class="fa-solid fa-arrow-left me-2"></i>Back To Home</Link>
        <div className='card p-5 bg-info shadow mt-2 '>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
              <img className='w-100 rounded-start' src="https://img.freepik.com/free-photo/computer-security-with-login-password-padlock_107791-16191.jpg?w=900&t=st=1708707409~exp=1708708009~hmac=50d3f955daefe4b555034b966ccaf6d9b5cc072f9495d3ed8855043916f7b937" alt="" />
            </div>
            <div className='col-lg-6'>
              <div className='d-flex  align-items-center flex-column'>
                <h1 className='fw-bold text-light mt-2'><i class="fa-brands fa-stack-overflow fa-bounce"></i>Project Fair</h1>
                <h5 className='fw-bolder mt-4 pb-3 text-light'>
                  {
                    isRegisterform ? 'Sign Up Your Account' : 'Sign In Your Account'
                  }
                </h5>
                <Form className='w-100 text-light'>
                    {
                      isRegisterform &&
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        
                        <Form.Control type="text" placeholder="Enter Username" value={userData.username} onChange={e=>setuserData({...userData,username:e.target.value})}/>
                      </Form.Group>
                    }
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Control type="email" placeholder="Email" value={userData.email} onChange={e=>setuserData({...userData,email:e.target.value})}/>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       
                        <Form.Control type='password' placeholder="Enter password" value={userData.password} onChange={e=>setuserData({...userData,password:e.target.value})}/>
                      </Form.Group>
                  </Form>
                  {
                    isRegisterform?
                    <div>
                      <button className='btn btn-light mb-2' onClick={handleRegister}>Register</button>
                      <p>Alrady have an account?Click here to <Link to={'/login'} style={{textDecoration:'none'}}>Login</Link></p>
                    </div>
                    :
                    <div>
                      <button className='btn btn-light mb-2 rounded-3'onClick={handleLogin}>Login</button>
                      <p><Link to={'/register'} style={{textDecoration:'none',color:'red'}}>Create a new Account</Link></p>
                    </div>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth