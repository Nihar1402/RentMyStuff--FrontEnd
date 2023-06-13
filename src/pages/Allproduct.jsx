import { BASE_URL } from '../services/helper';
import React from 'react';
import { useState, useEffect ,useContext} from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductRow from './ProductRow';
import '../App.css';
import '../css/searchbar.css'
import Loading from "./loading";
import AuthContext from '../services/authContext';
import { Outlet } from 'react-router-dom';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

const Allproduct = () => {
    const [products, setProducts] = useState([]);
    const [srch, setsrch] = useState('');
    const [isFound, setFound] = useState(false);
    const [category, setcategory] = useState("");
    const [lablemsg, setlabmsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [noproductFound, setnoproductFound] = useState(false);
    const { isLoggedIn} = useContext(AuthContext);
    
   
   
    const navigate=useNavigate();

   

  const fetchProducts = async () => {
    const result = await axios.get(
      
      "http:///products/all",
      
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
      // console.log(products);
    }) 
    .catch((err)=>{toast.error("Something is wrong")});;
  
  };
  const handleclick=async(id)=>{
    if (isLoggedIn == false){
      navigate('/login');
  }
  else{
      navigate('/rentproduct',{state:{id:id}});
  }
    // console.log(id);
    // navigate('/rentproduct',{state:{id:id}});
      };
    //
  const onsearch=async()=>{


    setnoproductFound(false)
    setIsLoading(true)
    const result = await axios.get(
      
      `BASE_URL/search/${srch}`,
      
{
        withCredentials: true,
        credentials: "include",
      headers: {
          'content-type': 'application/json',
          'crossdomain': 'true' ,
         
      }
      
  }
    ).then((result)=>{
      setIsLoading(false)
      const products = result.data;
      
      if (products.length!=0){
      setProducts(products);
    }
    else
      setnoproductFound(true)
      // console.log(products);
    }) 
    .catch((err)=>{
      setIsLoading(false)
      toast.error("Something is wrong")});
  }


  const oncategorysearch=async()=>{
    setIsLoading(true)
    console.log(category);
    const result = await axios.get(

      `BASE_URL/category/${category}`,
      
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
      setIsLoading(false)
      console.log(result);
      if (products.length!=0)
      setProducts(products);
      else
      setnoproductFound(true)
      
      // console.log(products);
    }) 
    .catch((err)=>{
      setIsLoading(false)
      toast.error("Something is wrong")});
  }
  const handleInput = (e) => {
    setsrch(e.target.value);
    
    if (e.target.value !== "") {
      setFound(true);
    } else {
      setFound(false);
    }
  };


  const handlecatChagne= async(event,field) => {
    
      setnoproductFound(false)
        setnoproductFound(false)
    let actualvalue=event.target.value
    actualvalue = String(actualvalue)
    
    setcategory(actualvalue)
    setIsLoading(true)
    console.log(category);
    const result = await axios.get(

      `BASE_URL/category/${actualvalue}`,
      
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
      setIsLoading(false)
      console.log(result);
      if (products.length!=0)
      setProducts(products);
      else
      setnoproductFound(true)
      // console.log(products);
    }) 
    .catch((err)=>{
      setIsLoading(false)
      toast.error("Something is wrong")});

  };


  const handleall=async(id)=>{
    // console.log(id);
    setIsLoading(true)
    navigate('/allproducts',{state:{id:id}});
      };
  
  useEffect(() => {
    fetchProducts();
  }, []);
    return ( 
        <React.Fragment>
          
          <div className="container-fluid searchtopcontainer">
          {isLoading && <Loading/>}
            <div className="searchbarcontainer">
    
          <input  required type="text" id="search" className="form-control"  placeholder="Type here"   value={srch}  onChange={handleInput}/>
      <button className="btn btn-outline-success" type="submit" onClick={onsearch} disabled={srch==''}>Search</button>
      
  </div>
  <div className="searchbarcontainer">
  <select  id="productCategory" className="form-control form-select" placeholder="select catogory" value={category} onChange={(e)=>{handlecatChagne(e)}}
         >        
          <option value="" disabled selected> Select Product Category</option>
        <option value="Home Goods">Home Goods</option>
       <option value="Electronics">Electronics</option>
        <option vlaue ="Tools & Equipments">Tools & Equipments</option>
        <option  value="Fashion & Accessories">Fashion & Accessories</option>
        <option value="Party & Events">Party & Events</option>
        <option value="Transportation">Transportation</option>
       <option value="Musical Instruments">Musical Instruments</option>
       <option value="Sports & Recreation">Sports & Recreation</option>
      </select> 
{/* <button className="btn btn-outline-success" type="submit" onClick={oncategorysearch} disabled={category==''} >Search</button> */}
</div>
<button class="btn-getall" type="submit" onClick={handleall}>Get all</button>
  </div>
  {/* <div>
  <button class="btn btn-outline-success" type="submit" onClick={handleall}>Get all</button>
  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
  <label for="vehicle1"> I have a bike</label><br></br>
  </div> */}
  {noproductFound && (
          <p className="validation-error ms-5">No product found.</p>
        )}
              <div className="container main-content bflex" >
              
               
    {
          products.map(product => {
          //   return <ProductRow key={product.id} image={product.media.source} name={product.name} description={product.description} price={product.price.formatted_with_symbol} />
          // })
          return <ProductRow key={product.id} id={product.id} image={product.pPhoto} name={product.pname} description={product.pDesc} price={product.priceperday} available={product.available} 
          quantity={product.quantity} btn={'Rent'} handleclick={handleclick}/>
          })
        }
</div> 
        </React.Fragment>
     );
}
 
export default Allproduct;