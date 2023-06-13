import { BASE_URL } from '../services/helper';

import React from 'react';
import axios from 'axios';
// import PublicNavbar from './NavBarPublic';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Loading from "./loading";

const Addproduct = () => {
  const [isLoading, setIsLoading] = useState(false);

    const [ productDetails, setproductDetails] = useState({
        productname:'',
        productprice:'',
        productdes:'',
        productquantity:'',
        productSec:'',
        productCategory:''
      
 
     });
     const [category, setcategory] = useState("");
     const [selectedImage, setSelectedImage] = useState(null);
     const handleChagne= (event,field) => {
         let actualvalue=event.target.value
         setproductDetails({
             ...productDetails,
             [field]:actualvalue
         })
       };
       const handleSubmit = async(event) => {
        setcategory(String(productDetails['productCategory']))
        setIsLoading(true)
        
         event.preventDefault();
         console.log(productDetails)
         let formData = new FormData();
         formData.append("pPhoto", selectedImage);
         formData.append("pName", productDetails['productname']);
         formData.append("priceperday", productDetails['productprice']);
         formData.append("pDesc", productDetails['productdes']);
         formData.append("Quantity", productDetails['productquantity']);
         formData.append("securityDeposite", productDetails['productSec']);
         formData.append("Cate", productDetails['productCategory']);
        // formData.append("Category", category);

          console.log(formData)  
       
          await axios.post('/addproduct', formData, {
          withCredentials: true,
          credentials: "include",
           headers: {
        
               "content-type": "multipart/form-data",
               'crossdomain': 'true' ,
                "Content-Length": formData.length,
                "Authorization" : "*"
           }
       }).then((result)=>{
        setIsLoading(false)
        if(result.status===200){
          console.log(result.status)
          toast.success(result.data);
          setproductDetails({
            productname:'',
            productprice:'',
            productdes:'',
            productquantity:'',
            productSec:'',
            productCategory:''
          
     
         })
         setSelectedImage(null)
         // window.location.reload();
        }
      }
       )
       .catch((error)=>{
        setIsLoading(false)
        toast.error("Something went wrong...");
        console.log(error);
       })
       
       };
       const handleReset=()=>{
        setproductDetails({
         productname:'',
         productprice:'',
         productdes:'',
         productquantity:'',
         productSec:'',
         productCategory:''
        }) 
        setSelectedImage(null)
        toast("reseting");
       };
       
    return ( 
      

      <React.Fragment>
    

<div className="main_container">
<div className="container signupheight" style={{width:'45%'}}>
<form className="seminor-login-form" onSubmit={handleSubmit}>
  <h5 className="modal-title text-center">Enter Product Details</h5>
  {isLoading && <Loading/>}
  
  <div className="form-group"></div>

  <div className="form-group">
  <input  required type="text" id="pname" className="form-control" placeholder="Enter Product Name" value={productDetails.productname} onChange={(e)=>{handleChagne(e,'productname')}}/>
  </div>

  <div className="form-group">   <input  required type="number" id="pprice" min={0} className="form-control" placeholder="Product Price per day" value={productDetails.productprice} onChange={(e)=>{handleChagne(e,'productprice')}}/>
</div>
  <div className="form-group">      <input  required type="number" id="pquantity" min={0} className="form-control" placeholder="Product Quantity" value={productDetails.productquantity} onChange={(e)=>{handleChagne(e,'productquantity')}}/>
</div>
  <div className="form-group">              <input  required type="number" id="productSec"  min={0} className="form-control" placeholder="Product Security Deposit" value={productDetails.productSec} onChange={(e)=>{handleChagne(e,'productSec')}}/>
</div>
  <div className="form-group">   <select  id="productCategory" className="form-control form-select" placeholder="product Category" value={productDetails.productCategory} 
   
  onChange={(e)=>{handleChagne(e,'productCategory')}}
         >        
          <option value='Product Category' >Product Category</option>
        <option value="Home Goods">Home Goods</option>
       <option value="Electronics">Electronics</option>
        <option vlaue ="Tools & Equipments">Tools & Equipments</option>
        <option  value="Fashion & Accessories">Fashion & Accessories</option>
        <option value="Party & Events">Party & Events</option>
        <option value="Transportation">Transportation</option>
       <option value="Musical Instruments">Musical Instruments</option>
       <option value="Sports & Recreation">Sports & Recreation</option>


        
      </select></div>

<div className="form-group">
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
          <div>
          <button  className='btn probtn'
          onClick={() => setSelectedImage(null)}>Remove</button>
          </div>
        </div>
      )}
</div>
<div className="form-group">
<label htmlFor="comment">Product Description:</label>
              <textarea className="form-control" rows="4" id="productdesc" value={productDetails.productdes} onChange={(e)=>{handleChagne(e,'productdes')}} ></textarea>
              

</div>

<div className="btn-check-log">
              <button type="submit" className="btn-check-login">Submit</button>
   
              
              </div>


 </form>
</div>
</div>
</React.Fragment>
);
}
 
export default Addproduct;





{/* <div className="MainDiv d-flex justify-content-center">
          <div className="container main-container">
            <div className="row">
        <div className="col-xl-8">
        <div className="card mb-4">
            <div className="card-header">product details</div>
            <div className="card-body">
    
              
                <form className="mt-5 mb-5" onSubmit={handleSubmit}>
                  <div className="form-group btspace">
                  <input  required type="text" id="pname" className="form-control" placeholder="Enter Product Name" value={productDetails.productname} onChange={(e)=>{handleChagne(e,'productname')}}/>
                  </div>
                  <div className="form-group btspace">
                  <input  required type="number" id="pprice" min={0} className="form-control" placeholder="Product Price" value={productDetails.productprice} onChange={(e)=>{handleChagne(e,'productprice')}}/>
                  </div>
                  <div className="form-group btspace">
                  <input  required type="number" id="pquantity" min={0} className="form-control" placeholder="Product Quantity" value={productDetails.productquantity} onChange={(e)=>{handleChagne(e,'productquantity')}}/>
                  </div>
                  <div className="form-group btspace">
                  <input  required type="number" id="productSec"  min={0} className="form-control" placeholder="Product Security Deposit" value={productDetails.productSec} onChange={(e)=>{handleChagne(e,'productSec')}}/>
                  </div>
                  <div className="form-group btspace">
                  <input  required type="text" id="productCategory" className="form-control" placeholder="product Category" value={productDetails.productCategory} onChange={(e)=>{handleChagne(e,'productCategory')}}/>
                  </div>
                  <div className="form-group btspace">
                  <select  id="productCategory" className="form-control form-select" placeholder="product Category" value={productDetails.productCategory} onChange={(e)=>{handleChagne(e,'productCategory')}}
             >        
              <option value="" disabled selected>Product Category</option>
            <option value="Home Goods">Home Goods</option>
           <option value="Electronics">Electronics</option>
            <option vlaue ="Tools & Equipments">Tools & Equipments</option>
            <option  value="Fashion & Accessories">Fashion & Accessories</option>
            <option value="Party & Events">Party & Events</option>
            <option value="Transportation">Transportation</option>
           <option value="Musical Instruments">Musical Instruments</option>
           <option value="Sports & Recreation">Sports & Recreation</option>
    
    
            
          </select>
          </div>
                  <div className='d-flex flex-row '>
       
        <div className='form-group'>
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
                  <div className="form-group btspace">
                  <label htmlFor="comment">Product Description:</label>
                  <textarea className="form-control" rows="4" id="productdesc" value={productDetails.productdes} onChange={(e)=>{handleChagne(e,'productdes')}} ></textarea>
                  
    
                  </div>
                  <div className="button-group">
        <button type="submit" className="btn btn-primary me-3">Submit</button>
        <button type="reset" className="btn btn-primary" onClick={handleReset}>Reset</button>
        </div>
              </form>
                
              </div>
              
              
             
            </div>
          
          </div>
         
         
        </div> */}