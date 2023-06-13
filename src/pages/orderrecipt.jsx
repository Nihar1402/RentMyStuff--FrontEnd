import { BASE_URL } from '../services/helper';
import React from 'react';
import ProductRow from './ProductRow';
import { useState, useEffect } from "react";
import { useNavigate ,useLocation} from 'react-router-dom';
import {  toast } from 'react-toastify';
import "../css/table.css"
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";


const Orderrecipt = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [start_date,setstart_date]=useState('')
  const [end_date,setend_date]=useState('')
  const { state } = useLocation();
  const {product,orderTableDto}=state
  const {
    id,
    pname:name,
    pDesc,
    pPhoto: image,
    priceperday:price,
    available,
  } = product;
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
   
  const handledateconvert=()=>{
    var date1 = new Date(endDate);
    var date2 = new Date(startDate);
    setstart_date(date2.toLocaleDateString())
    setend_date(date1.toLocaleDateString())
   
  }
  useEffect(() => {
    handledateconvert();
  }, []);

   const handleclick=(id)=>{
    console.log(state);
    // navigate('/editproduct', {state:{id:id}}) 
    

    // navigate('/editproduct', {state:{id:id}}) 
  }
  return (   

    <section style={{minHeight:'50vh'}}>
    <h2 style={{opacity:0.7,margin:'20px'}}>Your Order Receipt</h2>
   
    {/* <button className='probtn' onClick={handleclick}>probtn</button> */}
  <div className="container main-content bflex ">
  

<div className="list-do" style={{ width: 292, marginRight: 30, marginBottom:20}}>
     <div className="o-img">
     <a href={'/demo/'+id}>
      <img
        alt="image"
        className="img-responsive"
        src={`data:image/jpeg;base64,${image}`}
        // src={'./images/Product/' + image}
        lazy="loaded"
      /> 
      </a></div><a href={'/demo/'+id}>
      <h3 className='protitle'>{name}</h3></a>

      <ul className='probottom'>

        <li>
          <p style={{ margin: '0', fontsize: '12px', color: '#bababa' }}>
            Rent
            <span className='pricestyle'>
              <i className="rento-icons-new icon-rupee rf-2x" />
              {price + "/day"}
            </span>
          </p>
        </li>

        <li  >
        </li>
      </ul>
    </div>
    <div style={{width:'60%'}}>
      <h2 className='text-center' >Order Details</h2>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          <tr>  <td>{"product id"}</td><td>{id }</td> </tr>
          {/* <tr>  <td>{"product"}</td><td>{productName}</td> </tr> */}
            <tr>
            <td>{"Start date"}</td>
            <td>{start_date}</td>
            </tr>
            <tr>
            <td>{"End date"}</td>
            <td>{end_date}</td>
          </tr>
          <tr>
            <td>{"Total days"}</td>
            <td>{numOfDays}</td>
          </tr>
          <tr>
            <td>{"Quantity"}</td>
            <td>{quantity}</td>
          </tr>
          <tr>  <td>{"Security Amount"}</td><td>{securityDeposit }</td> </tr>
          <tr>  <td>{"Service Charge"}</td><td>{serviceCharge }</td> </tr>
        </tbody>
      </table>
      <div className='text-end'><h5>Total Paid Amount :  {total}</h5></div>
    </div>
    </div> 
</section>);
}

 
export default Orderrecipt ;