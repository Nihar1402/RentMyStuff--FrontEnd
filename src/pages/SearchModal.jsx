import { BASE_URL } from '../services/helper';
import React, { useState } from 'react';

import "../css/searchList.css";
import { Link } from 'react-router-dom';

const SerachModal = ({ products }) => {
  console.log(products);


  return (
    <div className="searchList">
        {
          products.map((product)=>(
            <Link to={`../demo/${product.id}`}>
            <div className="products">
              <img src={'../images/Product/' + product.pPhoto} alt='product'/>
              <h3 style={{fontSize:'1rem'}}>{product.pname}</h3>
              <h3 style={{fontSize:'1rem'}}>{product.priceperday}</h3>
            </div>
            </Link>


          ))
        }

{/* <p><a>see all</a></p> */}
    </div>
  );
};

export default SerachModal;
