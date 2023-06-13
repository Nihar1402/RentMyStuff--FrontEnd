
import { BASE_URL } from '../services/helper';
import { useState, useEffect } from "react";
import React from 'react';
import {  toast } from 'react-toastify';
import axios from 'axios';
// import { loginUser } from '../services/user-services';
const Myprofile = () => {
   
  // const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  
  // const [showForm, setShowForm] = useState(false);
  const [ LoginDetail, setLoginDetails] = useState({
    name:'',
     city:'',
     userAddress:'',
     pincode:'',
     userPhone:'',
     userstate:''

 });
 const handleFileChange = (event) => {
  const file = event.target.files[0];
  setSelectedImage(file);
};
 const handleChagne= (event,field) => {
  let actualvalue=event.target.value
  setLoginDetails({
      ...LoginDetail,
      [field]:actualvalue
    
  })};
const handlesaveChanges= async(event)=>{
 console.log(LoginDetail)
 
 event.preventDefault();
 
 console.log(LoginDetail)
 let formData = new FormData();
 formData.append("userPic", selectedImage);
formData.append("userName", LoginDetail['name']);
formData.append("city", LoginDetail['city']);
formData.append("userAddress", LoginDetail['userAddress']);
formData.append("pincode", LoginDetail['pincode']);
formData.append("state", LoginDetail['userstate']);
formData.append("userPhone", LoginDetail['userPhone']);
console.log(formData)  

 const result = await axios.post('/updateProfile', formData, {
  withCredentials: true,
  credentials: "include",
   headers: {
       "content-type": "multipart/form-data",
       "Authorization" : "*",
       'crossdomain': 'true' ,
       // "Content-Length": formData.length,
   }
}).then(result=>{
 // console.log(result)
 toast.success(result.data)
 return;

}).catch(err=>{toast.warning("something went wrong!..")})
console.log(result)
};
 

  // const showform = () => {
   
  //   console.log(showForm);
  //   // setShowForm(!showForm);
  //  setShowForm(showForm => !showForm)
  // };

  const fetchProducts = async () => {
    const result = await axios.post(
      "BASE_URL/myprofile",{},{
        withCredentials: true,
        credentials: "include",
      headers: {
          'content-type': 'application/json',
          'crossdomain': 'true' ,
          "Authorization" : "*"
      }
  }
    ).then((result)=>{
      const details = result.data;
      console.log(details);
      console.log(result);
      // const imageUrl = URL.createObjectURL(details.userPic);
      // console.log(imageUrl);
      setLoginDetails({
        name:details['userName'],userstate:details['state'],...details,
    
    
     })
      // console.log(details);
    }).catch((err)=>{toast.error("Something is wrong")});
  
  };

  useEffect(() => {
    fetchProducts();
  }, []);
     


      
    return ( 
<React.Fragment>
  
<div className="row mt-4">
        <div className="col-xl-4">
            {/* <!-- Profile picture card--> */}
            <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                    {/* <!-- Profile picture image--> */}
                    <img className="img-account-profile rounded-circle mb-2" src={`data:image/jpeg;base64,${LoginDetail['userPic']}`} />
                    {/* <img className="img-account-profile rounded-circle mb-2" src={`data:image/jpeg;base64,${LoginDetail['userPic']}`}} alt="" /> */}
                    {/* <!-- Profile picture help block--> */}
                    <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                    {/* <!-- Profile picture upload button--> */}
                    <input  required
        type="file"
        name="myImage"
        className='form-control-sm'
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}/>  
                </div>
            </div>
        </div>
        <div className="col-xl-8">
            {/* <!-- Account details card--> */}
            <div className="card mb-4">
                <div className="card-header">Account Details</div>
                <div className="card-body">
                    <form>
                        {/* <!-- Form Group (username)--> */}
                        <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
      <input  required type="text" id="name" className="form-control" placeholder="name" value={LoginDetail.name} onChange={(e)=>{handleChagne(e,'name')}}/>
                        </div>
                       
                        {/* <!-- Form Row        --> */}
                        <div className="row gx-3 mb-3">
                            {/* <!-- Form Group (organization name)--> */}
                            <div className="col-md-6">
                            <label htmlFor="userstate" className="form-label">state</label>
      <input type="text" id="userstate" className="form-control" placeholder="state" value={LoginDetail.userstate} onChange={(e)=>{handleChagne(e,'userstate')}}/>
                            </div>
                            {/* <!-- Form Group (location)--> */}
                            <div className="col-md-6"> <label htmlFor="City" className="form-label">city</label>
      <input type="text" id="userAddress" className="form-control" placeholder="City" value={LoginDetail.city} onChange={(e)=>{handleChagne(e,'city')}}/>
                            </div>
                        </div>
                        {/* <!-- Form Group (email address)--> */}
                        <div className="mb-3">
                        <label htmlFor="Address" className="form-label">Address</label>
                        <input type="text" id="userAddress" className="form-control" placeholder="Address" value={LoginDetail.userAddress} onChange={(e)=>{handleChagne(e,'userAddress')}}/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
      <input type="text" id="email" className="form-control" placeholder="Email" value={LoginDetail.email} onChange={(e)=>{handleChagne(e,'email')}}/>
                        </div>
                        {/* <!-- Form Row--> */}
                        <div className="row gx-3 mb-3">
                            {/* <!-- Form Group (phone number)--> */}
                            <div className="col-md-6">  <label htmlFor="phone" className="form-label">Phone</label>
      <input type="number" id="phone" className="form-control" placeholder="Phone" value={LoginDetail.userPhone} onChange={(e)=>{handleChagne(e,'userPhone')}}/>
                            </div>
                            {/* <!-- Form Group (birthday)--> */}
                            <div className="col-md-6">
                            <label htmlFor="pincode" className="form-label">pincode</label>
      <input type="text" id="userpincode" className="form-control" placeholder="pincode" value={LoginDetail.pincode} onChange={(e)=>{handleChagne(e,'pincode')}}/>
                            </div>
                        </div>
                        {/* <!-- Save changes button--> */}
                        <button className="btn probtn" type="button" onClick={handlesaveChanges}>Save changes</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    {/* </div> */}
</React.Fragment>
        
     );
      }
 
export default Myprofile;