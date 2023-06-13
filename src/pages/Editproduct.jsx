import { BASE_URL } from '../services/helper';
import React from 'react';
import {  toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import Loading from "./loading";
import axios from 'axios';

// import { BASE_URL } from './../services/helper';
const Editproduct = () => {
  const [isLoading, setIsLoading] = useState(false);
   const [ productDetails,setproductDetail] = useState({   productname:'',
   productprice:'',
   productdes:'',
   productquantity:'',
   productSec:'',
   productCategory:''}); 
   const [selectedImage, setSelectedImage] = useState(null);
   const { state } = useLocation();
   const {id}=state;
   
    useEffect(() => {
      fetchProducts();
    }, []);

  const fetchProducts = async () => {
    console.log(state)
  const result= await axios.get(
      "BASE_URL/products/"+id,{
        withCredentials: true,
        credentials: "include",
      headers: {
          'content-type': 'application/json',
          'crossdomain': 'true' ,
          "Authorization" : "*",
          'Access-Control-Allow-Origin': '*'
      }
  }).then((result)=>{
    const prodetails=result.data;
    const detail=prodetails["product"]
    console.log(prodetails)
    setproductDetail({
    productname:detail['pname'],
    productprice:detail['priceperday'],
    productdes:detail['pDesc'],
    productquantity:detail['quantity'],
    productSec:detail['securityDeposite'],
    // productCategory:detail['']
  })
    console.log(productDetails)
  })
 .catch((err)=>{toast.error("Something is wrong")
  console.log(err)}); 
};



  const handleChagne= (event,field) => {
    let actualvalue=event.target.value
    setproductDetail({
        ...productDetails,
        [field]:actualvalue
    })};

  const handleSubmit=async(event)=>{
    
    event.preventDefault();
    console.log("clicked")
         console.log(productDetails)
         let formData = new FormData();
         formData.append("pPhoto", selectedImage);
         formData.append("pName", productDetails['productname']);
         formData.append("priceperday", productDetails['productprice']);
         formData.append("pDesc", productDetails['productdes']);
         formData.append("Quantity", productDetails['productquantity']);
         formData.append("securityDeposite", productDetails['productSec']);
         formData.append("Category", String(productDetails['productCategory']));
        // formData.append("Category", category);

          console.log(formData)  
       
          await axios.post("http://localhost:8080/update-product-details/"+id, formData, {
          withCredentials: true,
          credentials: "include",
           headers: {
        
               "content-type": "multipart/form-data",
               'crossdomain': 'true' ,
                "Content-Length": formData.length,
                "Authorization" : "*"
           }
       }).then((result)=>{
        if(result.status===200){
          console.log(result.status)
          toast.success(result.data);}
      }
       )
       .catch((error)=>{
        console.log(error);
       })
       
       };
    const handledelete=async(id)=>{
      id=parseInt(id)
       await axios.delete(
        `http://localhost:8080/deleteproduct/${id}`,{
          withCredentials: true,
          credentials: "include",
        headers: {
            'content-type': 'application/json',
            'crossdomain': 'true' ,
            "Authorization" : "*",
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response)=>{
      console.log(response)
      toast.success(response.data)
      
    }).catch((err)=>{
      console.error(err.response);
      toast.success(err.response.data)
    })
    };


    return (
      <>
       
<div className="main_container">
<div className="container signupheight" style={{width:'45%'}}>
<form className="seminor-login-form" onSubmit={handleSubmit}>
  <h5 className="modal-title text-center"> Product Details</h5>
  {isLoading && <Loading/>}
  
  <div className="form-group"></div>

  <div className="form-group">
  <input  required type="text" id="pname" className="form-control" placeholder="Enter Product Name" value={productDetails.productname} onChange={(e)=>{handleChagne(e,'productname')}}/>
  </div>

  <div className="form-group">   <input  required type="number" id="pprice" min={0} className="form-control" placeholder="Product Price" value={productDetails.productprice} onChange={(e)=>{handleChagne(e,'productprice')}}/>
</div>
  <div className="form-group">      <input  required type="number" id="pquantity" min={0} className="form-control" placeholder="Product Quantity" value={productDetails.productquantity} onChange={(e)=>{handleChagne(e,'productquantity')}}/>
</div>
  <div className="form-group">              <input  required type="number" id="productSec"  min={0} className="form-control" placeholder="Product Security Deposit" value={productDetails.productSec} onChange={(e)=>{handleChagne(e,'productSec')}}/>
</div>
  <div className="form-group">   <select  id="productCategory" className="form-control form-select" placeholder="product Category" value={productDetails.productCategory} 
   
  onChange={(e)=>{handleChagne(e,'productCategory')}}
         >        
          <option value='Product Category' disabled >Product Category</option>
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
            src={`data:image/jpeg;base64,${selectedImage}`}

            // src={URL.createObjectURL(selectedImage)}
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
  <div className='d-flex justify-content-center'>
              <button type="submit" className="btn-check-login" style={{width:'80%'}}>Submit</button></div>
              <div className='d-flex justify-content-center'>
              <button type="remove" className="btn-check-login mt-4"  style={{width:'80%'}} onClick={()=>{handledelete(id)}}>Remove</button>
              </div></div>


 </form>
</div>

</div>
   
        </> 
      );
}
 
export default Editproduct;




// <div className="MainDiv">
// {/* <PublicNavbar /> */}

// <div className="container main-container ">
// <div className=" row gx-3 mb-3">
// <div className="col-lg-8">

//   <form className="mt-5 mb-5" onSubmit={handleSubmit}>
//     <div className="form-group btspace">
//     <input  required type="text" id="pname" className="form-control" placeholder="Enter Product Name" value={productDetails.productname} onChange={(e)=>{handleChagne(e,'productname')}}/>
//     </div>
//     <div className="form-group btspace">
//     <input  required type="number" id="pprice" className="form-control" placeholder="Product Price" value={productDetails.productprice} onChange={(e)=>{handleChagne(e,'productprice')}}/>
//     </div>
//     <div className="form-group btspace">
//     <input  required type="number" id="pquantity" className="form-control" placeholder="Product Quantity" value={productDetails.productquantity} onChange={(e)=>{handleChagne(e,'productquantity')}}/>
//     </div>
//     <div className="form-group btspace">
//     <input  required type="number" id="productSec" className="form-control" placeholder="Product Security Deposit" value={productDetails.productSec} onChange={(e)=>{handleChagne(e,'productSec')}}/>
//     </div>
//     {/* <div className="form-group btspace">
//     <input  required type="text" id="productCategory" className="form-control" placeholder="product Category" value={productDetail.productCategory} onChange={(e)=>{handleChagne(e,'productCategory')}}/>
//     </div> */}
//     <div className='d-flex flex-row '>

// <div className='form-group'>
// <input 
// type="file"
// name="myImage"
// className='form-control-sm'
// onChange={(event) => {
// console.log(event.target.files[0]);
// setSelectedImage(event.target.files[0]);
// }}/>  
// {selectedImage && (
// <div >
// <img
//   alt="not found"
//   width={"100px"}
//   height={"100px"}
//   className='imgcir align'
//   src={URL.createObjectURL(selectedImage)}
// />
// <br />
// <button  className='btn btn-primary'
// onClick={() => setSelectedImage(null)}>Remove</button>
// </div>
// )}</div>  
// </div>
//     <div className="form-group btspace">
//     <label htmlFor="comment">Product Description:</label>
//     <textarea className="form-control" rows="4" id="productdesc" value={productDetails.productdes} onChange={(e)=>{handleChagne(e,'productdes')}} ></textarea>
    

//     </div>
//     <div className="button-group">
// <button type="submit" className="btn btn-primary me-3">Submit</button>

// </div>
// </form>
// <button type="remove" className="btn btn-primary" onClick={()=>{handledelete(id)}}>Remove</button>
// </div>



// </div>

// </div>


// </div>