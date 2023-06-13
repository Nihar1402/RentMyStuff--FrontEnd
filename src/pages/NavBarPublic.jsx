import { BASE_URL } from '../services/helper';
import React from 'react';
// import contact from '../images/Product/chair.jpg'
import {NavLink ,Link} from "react-router-dom"; 
import { useState ,useEffect,useRef} from 'react';
import '../App.css';
const PublicNavbar = () => {
 

  const pendulumRef = useRef(null);
  // const rotationRange = 30;
  // const animationSpeed = 0.00009; // Adjust this value to control the animation speed

  // useEffect(() => {
  //   const pendulumElement = pendulumRef.current;
  //   let rotationAngle = rotationRange;

  //   const swingPendulum = () => {
  //     pendulumElement.style.transform = `rotate(${rotationAngle}deg)`;

  //     if (rotationAngle === rotationRange || rotationAngle === -rotationRange) {
  //       rotationAngle *= -1;
  //     }

  //     requestAnimationFrame(swingPendulum);
  //   };

  //   const animationLoop = () => {
  //     swingPendulum();
  //     setTimeout(animationLoop, animationSpeed);
  //   };

  //   animationLoop();
  // }, []);
    return(
      <React.Fragment>
            <div  className="">
                 <div className="modal fade seminor-login-modal" data-backdrop="static" id="sem-login">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
        
              
                <div className="modal-body seminor-login-modal-body">
                <h5 className="modal-title text-center">LOGIN TO MY ACCOUNT</h5>
                  <button type="button" className="close" data-dismiss="modal">
                      <span><i className="fa fa-times-circle" aria-hidden="true"></i></span>
                  </button>
        
        
            <form className="seminor-login-form">
              <div className="form-group">
                <input type="email" className="form-control" required  />
                <label className="form-control-placeholder" htmlFor="name">Email address</label>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" required  />
                <label className="form-control-placeholder" htmlFor="password">Password</label>
              </div>
          
        
                <div className="btn-check-log">
                    <button type="submit" className="btn-check-login">LOGIN</button>
                </div>
        
        
              <div className="forgot-pass-fau text-center pt-3">
                                        <a href="#" className="text-secondary">Forgot Your Password?</a>
        
                                      </div>
                                      <div className="create-new-fau text-center pt-3">
                                          <a href="#" className="text-primary-fau"><span data-toggle="modal" data-target="#sem-reg" data-dismiss="modal">Create A New Account</span></a>
                                      </div>
        
        
        
              </form>
        
                </div>
              </div>
            </div>
          </div>
                <nav className="navbar navbar-expand-xl  ">
                <div className="container-fluid  sticky-top">
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span>
                  </button>
                  <div className="collapse navbar-collapse pendulum " id="navbarTogglerDemo01">
                    <div className='d-flex flex-sm-grow-1 justify-content-center' ref={pendulumRef}>
                    <Link className="navbar-brand" to="/home"><img src='../default/RentMy-logo.png' height={70} style={{padding:'10px', margin:'10px'}}></img></Link>
                    </div>
                    
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-sm-end flex-grow-1 pe-2">
                      <li className="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                      </li> 
                        <NavLink className="nav-link" aria-current="page" to="/aboutus">About us</NavLink>
                        <NavLink className="nav-link" aria-current="page" data-toggle="modal" data-target="#" to='/howitworks'>How it works</NavLink>
                        <NavLink className="nav-link" aria-current="page" to="/allproducts">Products</NavLink>
                     
                        {/* <NavLink className="nav-link" aria-current="page" to="/register"></NavLink> */}
                        {/* <img src={contact} alt="" width="30" height="24" className="d-inline-block profile1"></img> */}
                        

                        {/* <div className="dropdown show">
    <button className="btn dropdown-toggle" style={{border: "transparent"}}
            id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        <img className='profileImage' src={contact} alt='Profile' width="30" height="24"/>
    </button>
    
    <div className="dropdown-menu">                
        <li><a className="dropdown-item" href="/myProfile">My Profile</a></li>
        <li><a className="dropdown-item" href="/productlist">listing </a></li>
        
        <li><a className="dropdown-item" href="/addproduct">Signout</a></li>
    </div></div> */}
                       
                    </ul>
                   
                   <div> <form className=" d-flex container-fluid justify-content-start">
                   <NavLink className="nav-link" aria-current="page" to="/addproduct"><button className="nav-btn me-3" type="button">Create listing </button>
                        </NavLink>
    <NavLink className="nav-link" aria-current="page"  to="/Login" ><button className="nav-btn me-3" type="button">Login/Signup</button></NavLink>
    
   {/* <NavLink className="nav-link" aria-current="page" to="/register"> <button className="nav-btn" type="button"> Signup</button></NavLink> */}

  </form></div>
                  </div>
                </div>
              </nav>
              {/* <hr></hr> */}
        
            </div> 
           
            </React.Fragment>
      );
}
 
export default PublicNavbar;