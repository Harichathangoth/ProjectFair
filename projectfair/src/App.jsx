
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import Auth from './components/Auth';
import { useContext } from 'react';
import { tokenAuthorizationContext } from './components/context/TokenAuth';
import Footer from './components/Footer';


function App() {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorizationContext)
  return (

    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}/>
        <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}/>
      </Routes>
      <Footer/>
    </div> 
  );
}

export default App;
