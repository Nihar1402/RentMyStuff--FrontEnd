import { BASE_URL } from '../services/helper';
import  React, { useState} from 'react';
import axios from 'axios';
// import { loginUser } from '../services/user-services';
import {  toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { doLogin} from '../auth';
import AuthContext from '../services/authContext';
import { useContext } from 'react';
import PublicNavbar from './NavBarPublic';
import "../css/demo.css"
// import { useEffect } from 'react';
const Login = () => {
  const { userlogin} = useContext(AuthContext);
  const [email, setemail] = useState("");
  const [otpp, setoptpp] = useState("");
  const [password, setpassword] = useState("");
    const [ LoginDetail, setLoginDetails] = useState({
        email:'',
        password:''
    });
    const location=useLocation();
    const navigate=useNavigate();
    
    const handleChagne= (event,field) => {
        let actualvalue=event.target.value
        setLoginDetails({
            ...LoginDetail,
            [field]:actualvalue
        })
      };
      const handleemailChange = (event) => {
        const val= event.target.value;
        setemail(val);
      };
     
      const handleSubmit = async(event) => {
        

        // Prevent page reload
        console.log(location);
        event.preventDefault();
     
        const result = await axios.post('BASE_URL/signin', LoginDetail, {
          withCredentials: true,
          credentials: "include",
          headers: {
              'content-type': 'application/json',
              'crossdomain': 'true',
              // 'Access-Control-Allow-Origin': '*'
          }
      }).then((result)=>{
        console.log(result);
        if(result.status===200){
        console.log(result.status)
        // console.log(result.headers);
        toast.success(result.data);
      }
        doLogin({'email':LoginDetail['email']});
        userlogin()
        
        console.log("hello",location.state);
        navigate(`${location.state===null?"/Home":`${location.state.from.pathname}`}`);

      }).catch((err)=>{
        toast.error("Invalid Username or Password");
      });
      }
   
    


      const handleReset=()=>{
       setLoginDetails({
        email:'',
        password:''
       })
       toast.info("Reseting...",{autoClose: 1000,});
      };



       const handleemailsubmit=async(event)=>{
        event.preventDefault();
        // console.log("h")
        let formData = new FormData();
        formData.append("email", email);
        console.log(formData)
        const result = await axios.post('http://localhost:8080/sendotp',formData, {
          withCredentials: true,
          credentials: "include",
          headers: {
  
              'Access-Control-Allow-Origin': '*',
              "content-type": "multipart/form-data",
               'crossdomain': 'true' ,
                "Content-Length": formData.length,
                "Authorization" : "*"
          }
      }).then((result)=>{
        console.log(result);
        if(result.status===200){
        console.log(result.status)
  
        toast.success(result.data);
      }

      }).catch((err)=>{toast.error("Invalid Email id")});

       }


       const handleotpChange = (event) => {
        const val= event.target.value;
        setoptpp(val);
      };

       const handleotpsubmit=async(event)=>{
        console.log("otp"+ otpp)
        event.preventDefault();
        let formData = new FormData();
        formData.append("ot", otpp);
        
        const result = await axios.post('http://localhost:8080/verifyotp',formData, {
          withCredentials: true,
          credentials: "include",
          headers: {
            'Access-Control-Allow-Origin': '*',
            "content-type": "multipart/form-data",
             'crossdomain': 'true' ,
              "Content-Length": formData.length,
              "Authorization" : "*"
          }
      }).then((result)=>{
        console.log(result);
        if(result.status===200){
        console.log(result.status)
  
        //toast.success(result.data);
      }

      }).catch((err)=>{toast.error("Something is wrong")});

       }
      
       const handlepasswordChange = (event) => {
        const val= event.target.value;
        setpassword(val);
      };

       const handlepasswordsubmit=async(event)=>{
        console.log("otp")
        event.preventDefault();
        let formData = new FormData();
        formData.append("newpassword", password);
        const result = await axios.post('http://localhost:8080/changepassword',formData, {
          withCredentials: true,
          credentials: "include",
          headers: {
            'Access-Control-Allow-Origin': '*',
            "content-type": "multipart/form-data",
             'crossdomain': 'true' ,
              "Content-Length": formData.length,
              "Authorization" : "*"
          }
      }).then((result)=>{
        console.log(result);
        if(result.status===200){
        console.log(result.status)
  
        toast.success(result.data);
      }

      }).catch((err)=>{toast.error("Something is wrong")});

       }
      
    return ( 
      <React.Fragment>
     



<div className="main_container ">
       
       <div className="modal-dialog modal-dialog-centered contentdiv">
              <div className="modal-content">
        
              
                <div className="modal-body seminor-login-modal-body">
                <h5 className="modal-title text-center">LOGIN TO MY ACCOUNT</h5>
                  
        
        
            <form className="seminor-login-form" onSubmit={handleSubmit}>
              <div className="form-group">
              <input required type="email" id="email" className="form-control" autoComplete placeholder="" value={LoginDetail.email} onChange={(e)=>{handleChagne(e,'email')}}/>
                <label className="form-control-placeholder" htmlfor="name">Email address</label>
              </div>
              <div className="form-group">
              <input  required type="password" id="password" className="form-control" placeholder="" value={LoginDetail.password} onChange={(e)=>{handleChagne(e,'password')}}/>
                <label className="form-control-placeholder" htmlfor="password">Password</label>
              </div>
        
                <div className="btn-check-log">
                    <button type="submit" className="btn-check-login">LOGIN</button>
                </div>
        
        
              <div className="forgot-pass-fau text-center pt-3">
                                        <a href="#" className="text-secondary" data-toggle="modal" data-target="#sem-forget" data-dismiss="modal">Forgot Your Password?</a>
        
                                      </div>
                                      <div className="create-new-fau text-center pt-3">
                                          <a href="/register" className="text-primary-fau"><span data-toggle="modal" data-target="#sem-reg" data-dismiss="modal">Create A New Account</span></a>
                                      </div>
        
        
        
              </form>
        
                </div>
              </div>
              </div>
              </div>





              <div class="modal fade seminor-login-modal" data-backdrop="static" id="sem-forget">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
        
              
                <div class="modal-body seminor-login-modal-body">
                <h5 class="modal-title text-center">Your Registered email id</h5>
                  <button type="button" class="close" data-dismiss="modal">
                      <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                  </button>
        
        
            <form class="seminor-login-form">
              <div class="form-group">
                <input type='email' class="form-control" required value={email} onChange={handleemailChange} autoComplete/>
                <label class="form-control-placeholder" for="email1">Email address</label>
              </div>
         
                <div class="btn-check-log">
                    <button required="" disabled={email==''} type="submit" class="btn-check-login" data-toggle="modal" data-target="#sem-ot" data-dismiss="modal" aria-required={true} onClick={handleemailsubmit}>Send OTP</button>
                </div>
        
        
              </form>
        
                </div>
              </div>
            </div>
          </div>


          <div class="modal fade seminor-login-modal" data-backdrop="static" id="sem-ot">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
        
              
                <div class="modal-body seminor-login-modal-body">
                <h5 class="modal-title text-center">We have sent OTP to your email..</h5>
                  <button type="button" class="close" data-dismiss="modal">
                      <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                  </button>
        
        
            <form class="seminor-login-form">
              <div class="form-group">
                <input type="number" minLength={4} class="form-control" required autocomplete="on"  value={otpp} onChange={handleotpChange}/>
                <label class="form-control-placeholder" for="name">Enter OTP here</label>
              </div>
         
                <div class="btn-check-log">
                    <button type="submit" class="btn-check-login" data-toggle="modal" data-target="#sem-cp" data-dismiss="modal" onClick={handleotpsubmit}>Verify OTP</button>
                </div>
              </form>
        
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade seminor-login-modal" data-backdrop="static" id="sem-cp">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
        
              
                <div class="modal-body seminor-login-modal-body">
                <h5 class="modal-title text-center">Enter New Password</h5>
                  <button type="button" class="close" data-dismiss="modal">
                      <span><i class="fa fa-times-circle" aria-hidden="true"></i></span>
                  </button>
        
        
            <form class="seminor-login-form">
              <div class="form-group">
                <input type="password" minLength={4} class="form-control" required={true} autocomplete="on" value={password} onChange={handlepasswordChange} />
                <label class="form-control-placeholder" for="name">Enter New Password here</label>
              </div>
         
                <div class="btn-check-log">
                    <button type="submit" class="btn-check-login" onClick={handlepasswordsubmit}>Change password</button>
                </div>
              </form>
        
                </div>
              </div>
            </div>
          </div>
</React.Fragment>
        
     );
}
 
export default Login;