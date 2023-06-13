import { BASE_URL } from '../services/helper';
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Mybooking = () => {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();
   

  const fetchProducts = async () => {
    const result = await axios.get(
      
      "BASE_URL/mybookings",
      
{
        withCredentials: true,
        credentials: "include",
      headers: {
          'content-type': 'application/json',
          'crossdomain': 'true' ,
         
      }
      
  }
    ).then((result)=>{
      const products = result.data;
      setProducts(products);
      console.log(products);
    }) 
    .catch((err)=>{toast.error("Something is wrong")});;
  
  };
  const handlecheckout=async(id)=>{
    console.log(id);
    navigate('/payment',{state:{id:id}});   
      };
   
    

  useEffect(() => {
    fetchProducts();
  }, []);


    return ( 
        <React.Fragment>
          <section style={{minHeight:'50vh'}}>
        <div>
      <h2 style={{opacity:0.7,margin:'5px'}}>Your booking request</h2>
      </div>
      <div>
    { products.length==0?<div style={{backgroundColor:'#f8f9fa', padding: '2%',Height:'30%'}}>
<div class="rm-main-head" style={{margin:20,marginBottom:'50px'}}>You don't have any item <span style={{display:'inherit'}}>create a listing</span>
<hr /></div>
<div class="rm-main-head" style={{margin:51}}> <span style={{display:'inherit'}}>Need something Rent out</span>
<hr /></div>
   </div>: <p></p>}
   </div>
      <div className="container main-content">
        {products.map((productitem) => {
          const { bookingDto, product } = productitem;
          const {
            bid,
            endDate,
            startDate,
            status,
            quantity,
            renterName,
            productId,
            orderId,
          } = bookingDto;
          const {
            id,
            pname,
            pDesc,
            pPhoto: image,
            priceperday,
            available,
          } = product;

          return (
            
            <div className=" product d-flex justify-content-around" style={{    padding: '1.5',
              fontSize: '1rem',
              borderLeft:'8px solid #ffff007d',}} key={bid}>
              {/* key={bid} */}
              <div className="">
                <img
                  className=" "
                  src={`data:image/jpeg;base64,${image}`}
                  // src={"./images/Product/" + image}
                  alt={pname}
                  height="50px"
                  width='50px'
                />
                </div>
                <div className="col-md-0 product-details">{pname} </div>
              
              <div className="col-md-3 product-details">
                <div className="col-md-3 product-details">{available}</div>
                <div className="col-md-3 product-details">{status}</div>
              </div>
              <div className=" btn-group-vertical">
                <button style={{minWidth:'150px'}}
                  className={
                    status === "Accepted"
                      ? "probtn btn-outline-primary mb-3"
                      : "probtn btn-secondary mb-3 disabled"
                  }
                  height="20px"
                  onClick={() => {
                    handlecheckout(bid);
                  }} disabled={status==='Accepted'?false:true}
                >
                  {status==='PENDING'?'Waiting...':  status==='PAID'? 'DONE':'Proceed to checkout'}
                </button>
                {/* <button className='btn btn-outline-danger' onClick={()=>{handledeny(bid)}}>{"Deny"}</button> */}
                {/* disabled={status==='PENDING'?false:true} */}
              </div>
            </div>
          );
        })}
      </div>
      </section>
        </React.Fragment>
     );
}
 
export default Mybooking;