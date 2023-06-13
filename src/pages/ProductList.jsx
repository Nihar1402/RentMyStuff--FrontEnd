import { BASE_URL } from '../services/helper';
import React from 'react';
import ProductRow from './ProductRow';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";


const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const result = await axios.get(
      
      "BASE_URL/mylisting",
      
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

  useEffect(() => {
    fetchProducts();
  }, []);

   const handleclick=(id)=>{
    console.log(id);
    // navigate('/editproduct', {state:{id:id}}) 
    navigate('/editproduct', {state:{id:id}}) 
  }
  return (   
    <section style={{minHeight:'50vh'}}>
    <h2 style={{opacity:0.7,margin:'20px'}}>Your Listed Product</h2>
    <div>
    { products.length==0?<div style={{backgroundColor:'#f8f9fa', padding: '2%',Height:'30%'}}>
<div class="rm-main-head" style={{margin:20,marginBottom:'50px'}}>You don't have any item <span style={{display:'inherit'}}>create a listing</span>
<hr /></div>
<div class="rm-main-head" style={{margin:51}}> <span style={{display:'inherit'}}>Need something Rent out</span>
<hr /></div>
   </div>: <p></p>}
   </div>
     
  <div className="container main-content bflex ">
    {
          products.map(product => {
          //   return <ProductRow key={product.id} image={product.media.source} name={product.name} description={product.description} price={product.price.formatted_with_symbol} />
          // })
          return <ProductRow key={product.id} id={product.id} image={product.pPhoto} name={product.pname} description={product.pDesc} price={product.priceperday} available={product.available} quantity={product.quantity} btn={'Edit'} 
          handleclick={handleclick}
            />
          })
        }
</div> 
</section>);
}

 
export default ProductList ;