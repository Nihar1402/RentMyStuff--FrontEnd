import { BASE_URL } from '../services/helper';
import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProductRow from './ProductRow';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    desktop: {
        breakpoint: { max: 2000, min: 1000 },
        items: 5,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
};


function Work(props) {
  const [products, setProducts] = useState([]);
    const navigate=useNavigate();
   

  const fetchProducts = async () => {
    const result = await axios.get(
      
      "BASE_URL/products/all",
      
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


//   const slides = products.map((product) => {
    
//     return (
//         <CarouselItem
//         className="custom-tag"
//         tag="div"
//         key={product.id}
//         // onExiting={() => setAnimating(true)}
//         // onExited={() => setAnimating(false)}
//       >
//         <ProductRow key={product.id} id={product.id} image={product.pPhoto} name={product.pname} description={product.pDesc} price={product.priceperday} available={product.available} 
//           quantity={product.quantity} btn={'Rent'} handleclick={handleclick}/>
          
          
//         {/* <CarouselCaption
//           className="text-danger"
//           captionText={item.caption}
//           captionHeader={item.caption}
//         /> */}
//       </CarouselItem>
//     );
//   });
  
  return (
    <div className="maincontainer">
      <main>
    <Carousel responsive={responsive} containerClass="carousel-container">
    {    products.map((product) =>{  
      console.log(products.length)
        return (<div className="swiper-wrapper" key={product.id}>
        <div className="list-do" style={{ width: 290,    marginRight: '30px', overflow: 'hidden' }}>
         <div className="o-img">
        <img
          alt="image"
          className="img-responsive"
          src={`data:image/jpeg;base64,${product.pPhoto}`}
          // src={'./images/Product/'+product.pPhoto}
          lazy="loaded"
        /> </div>
        <h3 className='protitle'>{product.pname}</h3>
     
      <ul className='probottom'>
        
          <li>
            <p style={{    margin: '0', fontsize: '12px', color: '#bababa'}}>
              Rent
              <span className='pricestyle'>
                <i className="rento-icons-new icon-rupee rf-2x" />
                {product.priceperday+"/day"}
              </span>
            </p>
          </li>
       
        <li  >
        
          <a className='probtn'
             href={'/demo/'+product.id}
          >
           {'see'}
          </a>
        </li>
      </ul>
     </div>  
     </div>
     )
    } )}
   
    
</Carousel>
</main>
</div>
  );
}

export default Work;


