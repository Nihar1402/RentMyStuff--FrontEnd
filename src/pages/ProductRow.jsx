
import { BASE_URL } from '../services/helper';
import React from 'react';
// import sampleImage from '../../public/';
import { useNavigate } from 'react-router-dom';


const ProductRow = ({ image, name, id, description, price, available, quantity, btn, handleclick = () => { } }) => {
  const navigate = useNavigate();

  // const handleclick=(id)=>{
  //   console.log(id);
  //   navigate('/editproduct', {state:{id:id}}) 
  // }
  // const handlepress=(id)=>{
  //    handleclick(id);
  // }
  return (
    // <div className="row product justify-content-between">
    //   <div className="col-md-2">
    //     <img src={'./images/Product/'+image} alt={name} height="150" />
    //   </div>
    //   <div className="col-md-3 product-details">
    //     <h4>{name}</h4>
    //     {/* <div className="col-md-2 product-price">{id}</div> */}
    //     {/* <div className="col-md-2 product-price">{available}</div> */}
    //     {/* <div className="col-md-2 product-price">{quantity}</div> */}
    //     <div dangerouslySetInnerHTML={{__html: description}}></div>
    //   </div>
    //   <div className="col-md-2 product-price">
    //     <div>{price}</div>
    //     <button className='btn btn-primary me-3' onClick={()=>{handleclick(id)}}>{btn}</button>
    //   </div>

    // 
    <div className="list-do" style={{ width: 292, marginRight: 30, marginBottom:20}}>
     <div className="o-img">
     <a href={'/demo/'+id}>
      <img
        alt="Saddle Shoe Rack Large"
        className="img-responsive"
        src={`data:image/jpeg;base64,${image}`}
        // src={'../images/Product/' + image}
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

          <a className='probtn'
            onClick={() => { handleclick(id) }}
          >
            {btn}
          </a>
        </li>
      </ul>
    </div>

  );
}

export default ProductRow;