import { BASE_URL } from '../services/helper';
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from "./loading";
import DisplayNavbar from './Displaynavbar';
const Bookingrequest = () => {
    const [products, setProducts] = useState([]);
    const navigate=useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [start_date,setstart_date]=useState('')
    const [end_date,setend_date]=useState('')

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get(
      
      "BASE_URL/bookingRequest",
      
{
        withCredentials: true,
        credentials: "include",
      headers: {
          'content-type': 'application/json',
          'crossdomain': 'true' ,
         
      }
      
  }
    ).then((result)=>{
      setIsLoading(false);
      const products = result.data;
      setProducts(products);
      console.log(products);
    }) 
    .catch((err)=>{
      setIsLoading(false);
      toast.error("Something is wrong")});
    
  };
  const handleaccept=async(id)=>{
    console.log(id);
    setIsLoading(true);
     await axios.get(
      
        `BASE_URL/bookings/${id}/accept`,
        
  {
          withCredentials: true,
          credentials: "include",
        headers: {
            'content-type': 'application/json',
            'crossdomain': 'true' ,
           
        }
        
    }
      ).then((result)=>{
      //  console.log(result)
       setIsLoading(false);
       toast.success(result.data)
        // navigate(0)
      }) 
      .catch((err)=>{
        setIsLoading(false);
        toast.error("Something is wrong")});
   
      };
      const handledeny=async(id)=>{
        console.log(id);
        setIsLoading(true);
        const result = await axios.get(
      
            `BASE_URL/bookings/${id}/deny`,
            
      {
              withCredentials: true,
              credentials: "include",
            headers: {
                'content-type': 'application/json',
                'crossdomain': 'true' ,
               
            }
            
        }
          ).then((result)=>{
            setIsLoading(false);
          //  console.log(result)
           toast.warning(result.data)
          //  navigate(0)
          }) 
          .catch((err)=>{
            setIsLoading(false);
            toast.error("Something is wrong")});
       
          };

          const handledateconvert=()=>{
            // console.log(products['bookingDto'])
            // const {
             
            //   endDate,
           
            //   pricePerDay,
            //   productName,
            //   quantity,
            //   renterName,
            //   securityDeposit,
            //   serviceCharge,
            //   startDate,
            
            // } = products['orderTableDto'];
            // var date1 = new Date(endDate);
            // var date2 = new Date(startDate);
            // setstart_date(date2.toLocaleDateString())
            // setend_date(date1.toLocaleDateString())
           
          }
          // const handledatechange=(date1)=>{
          //      var date2 = new Date(date1);
          //   setstart_date(date2.toLocaleDateString())
          //   console.log(date2.toLocaleDateString())
          //   return  date2.toLocaleDateString()
          // }
          useEffect(() => {
            
          }, []);
        
  

  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
    handledateconvert();
  }, [products]);
    return ( 
        <React.Fragment>
            <section style={{minHeight:'50vh'}}>
            <h2 style={{opacity:0.7,margin:'10px'}}>Booking request</h2>

            <div>
    { products.length==0?<div style={{backgroundColor:'#f8f9fa', padding: '2%',Height:'30%'}} >
<div class="rm-main-head" style={{margin:20,marginBottom:'50px'}}>You don't have any item <span style={{display:'inherit'}}>create a listing</span>
<hr /></div>
<div class="rm-main-head" style={{margin:51}}> <span style={{display:'inherit'}}>Need something Rent out</span>
<hr /></div>
   </div>: <p></p>}
   </div>
            <div className="container main-content">
            {/* <div className=" product d-flex justify-content-around">
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
              <p className="col-md-0 product-details" style={{width:'13%;'}}>field</p>
            </div> */}
            {/* <table>
        <thead>
          <tr>
            <th> </th>
            <th>Product</th>
            <th>Product Name</th>
            <th>Field</th>
            <th>value</th>
            <th>Field</th>
            <th>value</th>
          </tr>
        </thead></table> */}
           
    {
          products.map(productitem => { 
           
            const {bookingDto,product}=productitem;
            const {bid,endDate,startDate,status,quantity,renterName,productId}=bookingDto
            const {id,pname,pDesc,pPhoto:image,priceperday,available}=product
          
            return  <div> <div className=" product d-flex justify-content-around"style={{    padding: '1.5',
            fontSize: '1rem',
            borderLeft:'9px solid #ffff007d',
            alignItems:'center'}} key={bid}>
            {/* key={bid} */}
            <div className="" >
              <img
                className=" "
                src={`data:image/jpeg;base64,${image}`}
                // src={"./images/Product/" + image}
                alt={pname}
                height="50px"
                width='50px'
              />
              </div>
              <div className="col-md-1 product-details" style={{width:'13%;'}}>
                {pname}
                 </div>
            
            <div className="col-md-0 product-details" style={{width:'13%;'}}>{renterName}</div> 
            <div className="col-md-0 product-details" style={{width:'13%;'}}> {startDate}</div> 
            <div className="col-md-0 product-details" style={{width:'13%;'}}>{endDate}</div> 
              <div className="col-md-0 product-details" style={{width:'13%;'}}>{available}</div>
              <div className="col-md-0 product-details"style={{width:'13%;'}}>{status}</div>
            
            <div className="d-flex align-items-center">
              {status=='PENDING'?
              <>
              <button className={status==='PENDING'?'actbtn':'btn probtn mb-3  disabled'} style={{margin:'15px'
              }} height="20px" onClick={()=>{handleaccept(bid)}}>{"Accept"}</button>
              <button className={status==='PENDING'?'actbtn':'btn probtn disabled'} height="20px"  disabled={status==='PENDING'?false:true} onClick={()=>{handledeny(bid)}}>{"Deny"}</button>
              </>
             :<> <button className={status==='PENDING'?'actbtn':'btn probtn mb-3  disabled'} style={{margin:'15px'
            }} height="20px" onClick={()=>{handleaccept(bid)}}>{"Accept"}</button>
            <button className={status==='PENDING'?'actbtn':'btn probtn disabled'} height="20px"  disabled={status==='PENDING'?false:true} onClick={()=>{handledeny(bid)}}>{"Deny"}</button></>}
            </div>
            <div>
            
            </div>
        
            
          </div>
          
          </div>
          })
        }
</div>
{isLoading && <Loading />}
</section>
        </React.Fragment>
     );
}
 
export default Bookingrequest;