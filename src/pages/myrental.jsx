import { BASE_URL } from '../services/helper';
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {NavLink ,Link} from "react-router-dom"; 
const Myrental = () => {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();
   

  const fetchProducts = async () => {
    const result = await axios.get(
      
      "BASE_URL/myrentals",
      
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
  const handleclick=async(id)=>{
    console.log(id);
    navigate('/rentproduct',{state:{id:id}});
      };
    //
   
  

  useEffect(() => {
    fetchProducts();
  }, []);
    return ( 
        <React.Fragment>
          <section style={{minHeight:'50vh'}}>
          <h2 style={{opacity:0.7,margin:'10px'}}>Your Rentals</h2>

          <div>
    { products.length==0?<div style={{backgroundColor:'#f8f9fa', padding: '2%',Height:'30%'}}>
<div className="rm-main-head" style={{margin:20,marginBottom:'50px'}}>You don't have any item <span style={{display:'inherit'}}>create a listing</span>
<hr /></div>
<div className="rm-main-head" style={{margin:51}}> <span style={{display:'inherit'}}>Need something Rent out</span>
<hr /></div>
   </div>: <p></p>}
   </div>

   <div className="container main-content">
        {products.map((productitem) => {
          const { orderTableDto, product } = productitem;
          const {
            bookingId,
            endDate,
            numOfDays,
            orderId,
            ownerName,
            pdfname,
            pricePerDay,
            productName,
            quantity,
            renterName,
            securityDeposit,
            serviceCharge,
            startDate,
            total,
            transactionI
          } = orderTableDto;
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
              borderLeft:'8px solid #ffff007d',}} key={bookingId}>
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
                <div className="col-md-0 product-details">
                <Link  to={"/orderrecipt"} state={{orderTableDto,product}}>{pname} </Link></div>
              
              <div className="col-md-3 product-details">
                <div className="col-md-3 product-details">{available}</div>
              </div>
              <div className=" btn-group-vertical">
                <button
                  className=
                       "actbtn btn-outline-primary mb-3"
                  
                  height="20px"
                
                  onClick={() => {
                    
                  }}
                >
          
                <a  style={{textDecoration:'none',color:'wheat'}}
                  //this will save the file as "your_cv.pdf"
                  download={pdfname}
                  //put the path of your pdf file
                  href="./Bills/bill_90.pdf"
                  //reactstrap classes. add green button
                >
                  Download Invoice
                </a>
              </button>
              </div>
            </div>
          );
        })}
      </div>
     
             

            </section>
        </React.Fragment>
     );
}
 
export default Myrental;


     {/* <object width="100%" height="400" data=".Bills/Billsbill_2.pdf" type="application/pdf">   </object>
      {/* <iframe
                style={{ width: "100%", height: "800px" }}
                src="./Bills/Billsbill_2.pdf"
              >
                {"hi"}
              </iframe> */}