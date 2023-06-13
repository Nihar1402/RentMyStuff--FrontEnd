import { BASE_URL } from '../services/helper';
import React from 'react';
// import contact from '../images/Product/chair.jpg'
import {NavLink ,Link} from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";


import Myrental from './myrental';
const Usernavbar = () => {
  const image='defprofile.jpg'
    return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light ">
                <div className="container-fluid" style={{margin:'5%'}}>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon">
                    </span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link className="navbar-brand" to="/home"><img src='../default/RentMy-logo.png' height={70} style={{padding:'10px', margin:'10px'}}></img></Link>
                    
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end flex-grow-1 pe-3">
                      <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/Home">Home</NavLink>
                      </li> 
                        
                        {/* <NavLink className="nav-link" aria-current="page" to="/mybooking">myprofile</NavLink> */}
                        <NavLink className="nav-link" aria-current="page" to="/aboutUs">About Us</NavLink>
                        <NavLink className="nav-link" aria-current="page" data-toggle="modal" data-target="#" to='/howitworks'>How it works</NavLink>
                        <NavLink className="nav-link" aria-current="page" to="/allproducts">Products</NavLink>
                        <NavLink className="nav-link" aria-current="page" to="/addproduct"><button className="nav-btn me-3" type="button">Create listing </button>
                        </NavLink>
                        {/* <img src={contact} alt="" width="30" height="24" className="d-inline-block profile1"></img> */}
                        

                        <div className="dropdown show">
                      <button className="btn dropdown-toggle" style={{border: "transparent"}}
                        id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                          <img className='profileImage' src={'../default/'+image} alt='Profile' width="32" height="32"/>
                           </button>
                           
    
                           <div className="dropdown-menu">

                            
                           
                       <li><a className="dropdown-item" href="/myProfile">My Profile</a></li>
                       <li><a className="dropdown-item" href="/productlist">Your products </a></li>
                       
                      
                       <li><a className="dropdown-item" href="/myrequest">Request </a></li>
                       

                       <li><a className="dropdown-item" href="/mybooking">Mybookings</a></li>
                       <li><a className="dropdown-item" href="/myrental">Myrental </a></li>
        
                          <li><a className="dropdown-item" href="/logout">Logout</a></li>
                          </div></div>
                       
                       
                    </ul>
                   
                  </div>
                </div>
              </nav>
              
        
            </div> 
        
      );
}
 
export default Usernavbar;