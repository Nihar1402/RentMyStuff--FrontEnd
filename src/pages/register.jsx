import { BASE_URL } from '../services/helper';
import React, { useState } from "react";
import axios from "axios";
// import PublicNavbar from './NavBarPublic';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";
// import { loginUser } from '../services/user-services';
const Register = () => {
  const navigate = useNavigate();
  const [LoginDetail, setLoginDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    city: "",
    userAddress: "",
    pincode: "",
    userPhone: "",
    userstate: "",
  });
  const [errorOrSuccess, setErrorOrSuccess] = useState({
    error: false,
    success: false
  });
  const [issigned, setissigned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (event, field) => {
    let actualvalue = event.target.value;
    setLoginDetails({
      ...LoginDetail,
      [field]: actualvalue,
    });
    if(field==='cpassword'){
      if(LoginDetail['password']!==actualvalue){
        setErrorOrSuccess({ error: true,
          success: false})
      }
      else{
        setErrorOrSuccess({ error: false,
          success: false})
      }
    }
  };
  const handleSubmit = async (event) => {
    // Prevent page reload
   
    event.preventDefault();

    setIsLoading(true)
    // console.log(LoginDetail)
    let formData = new FormData();
    formData.append("userPic", selectedImage);
    formData.append("userName", LoginDetail["name"]);
    formData.append("email", LoginDetail["email"]);
    formData.append("password", LoginDetail["password"]);
    formData.append("city", LoginDetail["city"]);
    formData.append("userAddress", LoginDetail["userAddress"]);
    formData.append("pincode", LoginDetail["pincode"]);
    formData.append("state", LoginDetail["userstate"]);
    formData.append("userPhone", LoginDetail["userPhone"]);

    console.log(formData);

    const result = await axios
      .post("/signup", formData, {
        headers: {
          "content-type": "multipart/form-data",

          crossdomain: "true",
          // "Content-Length": formData.length,
        },
      })
      .then((result) => {
        // console.log(result)
        setIsLoading(false)
        toast.success(result.data);
        navigate("/login");

        setissigned(true);
        // console.log(issigned);
        return;
      })
      .catch((err) => {
        setIsLoading(false)
        toast.warning("something went wrong!..");
      });
    console.log(result);
  };
  const handleReset = () => {
    setLoginDetails({
      name: "",
      email: "",
      password: "",
      cpassword: "",
      city: "",
      userAddress: "",
      pincode: "",
      userPhone: "",
      userstate: "",
    });
    toast("reseting");
  };

  return (
    <React.Fragment>
  
        
                 <div className="modal fade seminor-login-modal" data-backdrop="static" id="modal-term">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
        
              
                <div className="modal-body seminor-login-modal-body">
                <h5 className="modal-title text-center">Terms and Conditions</h5>
                  {/* <button type="button" className="close" data-dismiss="modal">
                      <span><i className="fa fa-times-circle" aria-hidden="true"></i></span>
                  </button> */}
        
        
            <form className="seminor-login-form">

              <p className="content-scroll">Agreement: Clearly state that the terms and conditions form a legally binding agreement between the website owner (referred to as the "Owner" or "Licensor") and the renter (referred to as the "Renter" or "Licensee").<br/>

Rental Period: Specify the duration of the rental period, including the start and end dates. Outline any provisions for renewal or termination of the agreement.<br/>

Website Usage: Define the purpose and permitted use of the website by the Renter. Specify any restrictions or limitations on the Renter's activities, such as the prohibition of illegal, harmful, or offensive content.

<br/>Payment Terms: Outline the financial terms, including the rental fee, payment schedule, and any additional charges or penalties for late payments or breaches of the agreement.

<br/>Intellectual Property: Clarify that the website and its content, including text, images, logos, and designs, are the property of the Owner and are protected by intellectual property laws. State that the Renter does not acquire any ownership rights to the website or its components.

<br/>Maintenance and Support: Specify the responsibilities of the Owner and the Renter regarding website maintenance, updates, backups, and technical support. Define any additional fees or charges for maintenance services.

<br/>Liability and Indemnification: Disclaim liability for any damages, losses, or claims arising from the Renter's use of the website. State that the Renter will indemnify and hold the Owner harmless from any third-party claims related to the Renter's use of the website.

<br/>Confidentiality: Include a confidentiality clause to protect any sensitive information shared between the Owner and the Renter during the rental period.

<br/>Termination: Define the conditions under which either party can terminate the agreement, including any notice periods. Specify the consequences of termination, such as the removal of the Renter's access to the website and the return of any confidential information.

<br/>Governing Law and Jurisdiction: Indicate the governing law that will apply to the agreement and the jurisdiction where any disputes will be resolved.</p>
              
            <div className="btn-check-log">
                    <button type="submit" className="btn-check-login" data-dismiss="modal">Accept</button>
                </div>
        
              </form>
        
                </div>
              </div>
            </div>
          </div>
      <div className="main_container">
        <div class="container signupheight">
          <h5 className="modal-title text-center">CREATE AN ACCOUNT</h5>
          {isLoading && <Loading/>}
          <form className="seminor-login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="name"
                id="name"
                className="form-control"
                required
                autoComplete="off"
                value={LoginDetail.name} 
                onChange={(e)=>{handleChange(e,'name')}}
                placeholder="User name"
              />
              
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                required
                autoComplete="off"
                value={LoginDetail.email} onChange={(e)=>{handleChange(e,'email')}}
                placeholder="Enter your email address"
              />
              
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                required
                autoComplete="off"
                id="phone"  value={LoginDetail.userPhone} minLength={10}  minlength="10" min={7000000000} max={9999999999} onChange={(e)=>{handleChange(e,'userPhone')}}
                placeholder="Phone"
                pattern="[789][0-9]{9}"
              />
              </div>


            <div className="form-group">
              <input
                type="password"
                className="form-control"
                required
                autoComplete="off"
                value={LoginDetail.password} onChange={(e)=>{handleChange(e,'password')}}
                placeholder="Password"
              />
              
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                required
                autoComplete="off"
                value={LoginDetail.cpassword} onChange={(e)=>{handleChange(e,'cpassword')}}
                placeholder="Confirm password"
              />
              <p className="text-error">{errorOrSuccess.error && "Password doesn't match or the field is empty"}</p>
            </div>
          

            <div className="form-group forgot-pass-fau text-center ">
              <a href="#" className="text-secondary">
                By Clicking "SIGN UP" you accept our
                <br />
                <span className="text-primary-fau"   aria-current="page" data-toggle="modal" data-target="#modal-term">Terms and Conditions</span>
              </a>
            </div>

            <div className="btn-check-log">
              <button type="submit" className="btn-check-login">
                SIGN UP
              </button>
            </div>
            <div className="create-new-fau text-center pt-3">
              <a href="/login" className="text-primary-fau">
                <span
                  data-toggle="modal"
                  data-target="#sem-login"
                  data-dismiss="modal"
                >
                  Already Have An Account
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;





























    {/*   
<form className='app1' onSubmit={handleSubmit}>
  <fieldset className='app'>
  <div className="mb-3 align-middle"><legend className=''>Signup</legend></div>
  
    <div className='d-flex flex-row'>
    <div className="mb-3 input-space">
      <label htmlFor="name" className="form-label">Name</label>
      <input  required type="text" id="name" className="form-control" placeholder="name" value={LoginDetail.name} onChange={(e)=>{handleChagne(e,'name')}}/>
    </div>
      <div className='mb-3 input-space'>
      <label htmlFor="email" className="form-label">Email</label>
      <input type="text" id="email" className="form-control" placeholder="Email" value={LoginDetail.email} onChange={(e)=>{handleChagne(e,'email')}}/>
    </div>
    </div>
    <div className='d-flex flex-row mb-3'>
    <div className="mb-3 input-space">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" id="password" className="form-control" placeholder="Password" value={LoginDetail.password} onChange={(e)=>{handleChagne(e,'password')}}/>
    </div>
    <div className="mb-3">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" id="cpassword" className="form-control" placeholder=" Confirm Password" value={LoginDetail.cpassword} onChange={(e)=>{handleChagne(e,'cpassword')}}/>
    </div>
    </div>

    <div className='d-flex flex-row mb-3'>
    <div className="mb-3 input-space">
      <label htmlFor="phone" className="form-label">Phone</label>
      <input type="number" id="phone" className="form-control" placeholder="Phone" value={LoginDetail.userPhone} onChange={(e)=>{handleChagne(e,'userPhone')}}/>
    </div>
    <div className="mb-3 input-space">
      <label htmlFor="city" className="form-label">City</label>
      <input type="text" id="city" className="form-control" placeholder="City" value={LoginDetail.city} onChange={(e)=>{handleChagne(e,'city')}}/>
    </div>
    </div>
    <div className='d-flex flex-row '>
    <div className="mb-3 input-space">
      <label htmlFor="userstate" className="form-label">state</label>
      <input type="text" id="userstate" className="form-control" placeholder="state" value={LoginDetail.userstate} onChange={(e)=>{handleChagne(e,'userstate')}}/>
    </div>
    <div className="mb-3 input-space">
      <label htmlFor="pincode" className="form-label">pincode</label>
      <input type="text" id="userpincode" className="form-control" placeholder="pincode" value={LoginDetail.pincode} onChange={(e)=>{handleChagne(e,'pincode')}}/>
    </div>
    </div>
   
    <div className='d-flex flex-row '>
    <div className="mb-3 input-space">
      <label htmlFor="Address" className="form-label">Address</label>
      <input type="text" id="userAddress" className="form-control" placeholder="Address" value={LoginDetail.userAddress} onChange={(e)=>{handleChagne(e,'userAddress')}}/>
    </div>
    <div className=''>
      <input 
        type="file"
        name="myImage"
        className='form-control-sm'
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        
        }}/>  
        {selectedImage && (
        <div >
          <img
            alt="not found"
            width={"100px"}
            height={"100px"}
            className='imgcir align'
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button  className='btn btn-primary'
          onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}</div>  
      </div>
      <br />
       <div className="button-group">
    <button type="submit" className="btn btn-primary me-3">Submit</button>
    <button type="reset" className="btn btn-primary" onClick={handleReset}>Reset</button>
    <div>
    </div>
    </div>
  </fieldset>
</form> */}