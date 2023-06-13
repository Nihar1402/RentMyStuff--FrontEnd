import { BASE_URL } from '../services/helper';
import React, { useState } from "react";
import "../css/productcard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
// import PublicNavbar from "./NavBarPublic";
import Work from "./work";
import axios from "axios";
import { toast } from "react-toastify";
import SerachModal from "./SearchModal";


const Home = () => {
  const [products,setProducts]=useState([]);
  const [loading,setIsLoading]=useState(false);
  const [srch,setSearch]=useState("");
  const [showlist,setshowlist]=useState(true)
  const [noproductFound, setnoproductFound] = useState(false);

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
      setnoproductFound(true);
    }) 
    .catch((err)=>{
      setIsLoading(false)
      toast.error("Something is wrong")});
  }

  return (
    <>
    {/* <img src="\Users\ghors\OneDrive\Pictures\Camera Roll\WIN_20220923_13_48_49_Pro.jpg"/> */}
    {/* <PublicNavbar /> */}
    <div onClick={()=>{setProducts([])}}>
    <div  className="hero" >
    <div className="bgimg">
  <div className="hero-content">
    <h1 className="mb-3">Rent anything, from anyone, anywhere!
    <div className="srchcontainer ">
    <div className="whatsection">
          <input  required type="text" id="search" className="form-control"  placeholder="Type here" value={srch} onChange={(e)=>setSearch(e.target.value)}  />
          </div>
          <FontAwesomeIcon icon={faLocationPin} color='#76756f'  size="sm" />
          <input  required type="text"  className=" form-control" id='locationiput' value={"Indore"} placeholder="Type here"  />
      <button className="btn btn-outline-success" type="submit" disabled={srch==''} onClick={()=>onsearch()}>Search</button>
  </div>
  </h1>


    </div>
    </div>
    
    </div>


    <div className="searchListContainer">
     {products.length!==0 && <SerachModal products={products} />}
   
  </div>


    

  <div >
<div style={{backgroundColor:'#f1f1f3', padding: '2%'}}>
<div className="rm-main-head">You'll love to<span style={{display:'inherit'}}>take these home</span>
<hr /></div>
   <Work></Work>
   </div>
    {/* {<Example/> } */}
    {/* <Footer/> */}
   <img src='./default/band.jpg' style={{width:'100%',padding:'10px', margin:'10px'}}></img>
   </div>
   </div>
    </>
  
  );
};

export default Home;
