import { BASE_URL } from '../services/helper';
import React from 'react';
import "../css/prod.css"
// import "../css/tes.css"
// import Usernavbar from './UserNavbar';
import contact from '../images/Product/chair.jpg'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const dashboard = () => {
  const navigate=useNavigate()
  // useEffect(()=>{
  //   navigate('/dashboard')
  // },[]);

  
    return ( 
        <React.Fragment>
            {/* <Usernavbar />3 */}
            
            <h1> userdashboard</h1>
            <div className="rm-home__new rm-product__listicles">
  <div className="rm-random__container rm-listicle__box">
    <div className="rm-main-head">
      You'll love to
      <span>take these home</span>
    </div>
    <div className="rm-slide__navigator rm-listicle__navigator">
      <div
        slot="button-prev"
        className="swiper-button-lp swiper-button-disabled"
        tabIndex={0}
        role="button"
        aria-label="Previous slide"
        aria-disabled="true"
      >
        <div className="rento-sprite rento-sprite-down__chevron-icon" />
      </div>
      <div
        slot="button-next"
        className="swiper-button-ln"
        tabIndex={0}
        role="button"
        aria-label="Next slide"
        aria-disabled="false"
      >
        <div className="rento-sprite rento-sprite-down__chevron-icon" />
      </div>
    </div>
    <div className="rm-listicle__block">
      <div className="swiper-container swiper-container-initialized swiper-container-horizontal">
        {' '}
        <div
          className="swiper-wrapper"
          style={{
            transform: 'translate3d(0px, 0px, 0px)',
            transitionDuration: '0ms',
          }}
        >
          <div
            className="list-do"
            style={{ width: 292, marginRight: 30 }}
          >
            <a
              href="/ghaziabad/furniture/rent-footsie-shoe-rack-large"
              className
              target="_blank"
            >
              <img
                alt="Saddle Shoe Rack Large"
                className="img-responsive"
                src={contact}
                lazy="loaded"
              />
              <h3 className='protitle'>Saddle Shoe</h3>
            </a>
            <ul className='probottom'>
              <a
                href="/ghaziabad/furniture/rent-footsie-shoe-rack-large"
                className
                target="_blank"
              >
                <li>
                  <p style={{    margin: '0',
    fontsize: '12px',
    color: '#bababa'}}>
                    Rent
                    <span className='pricestyle'>
                      <i className="rento-icons-new icon-rupee rf-2x" />
                      189/mo
                    </span>
                  </p>
                </li>
              </a>
              <li  >
              
                <a className='probtn'
                  href="/ghaziabad/furniture/rent-footsie-shoe-rack-large"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See more
                </a>
              </li>
            </ul>
          </div>
         
          <div
            className="rm-listicle__slide swiper-slide"
            style={{ width: 292, marginRight: 30 }}
          >
            <a
              href="/ghaziabad/furniture/rent-stowy-wardrobe-2-door"
              className
              target="_blank"
            >
              <img
                alt="Stowy 2-Door Wardrobe"
                className="img-responsive"
                src="//p.rmjo.in/productSquare/wyp1th70-500x500.jpg"
                lazy="loaded"
              />
              <h3>Stowy 2-Door Wardrobe</h3>
            </a>
            <ul className='probottom'>
              <a
                href="/ghaziabad/furniture/rent-stowy-wardrobe-2-door"
                className
                target="_blank"
              >
                <li>
                  <p>
                    Rent
                    <span>
                      <i className="rento-icons-new icon-rupee rf-2x" />
                      409/mo
                    </span>
                  </p>
                </li>
              </a>
              <li>
                <a
                  href="/ghaziabad/furniture/rent-stowy-wardrobe-2-door"
                  className
                  target="_blank"
                />
                <a
                  href="/ghaziabad/furniture/rent-stowy-wardrobe-2-door"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See more
                </a>
              </li>
            </ul>
          </div>
         
          <div
            className="rm-listicle__slide swiper-slide"
            style={{ width: 292, marginRight: 30 }}
          >
            <a
              href="/ghaziabad/furniture/rent-stowy-wardrobe-2-door"
              className
              target="_blank"
            >
              <img
                alt="Stowy 2-Door Wardrobe"
                className="img-responsive"
                src="//p.rmjo.in/productSquare/wyp1th70-500x500.jpg"
                lazy="loaded"
              />
              <h3>Stowy 2-Door Wardrobe</h3>
              <ul className='probottom'>
              <a
                href="/ghaziabad/furniture/rent-footsie-shoe-rack-large"
                className
                target="_blank"
              >
                <li>
                  <p style={{    margin: '0',
    fontsize: '12px',
    color: '#bababa'}}>
                    Rent
                    <span className='pricestyle'>
                      <i className="rento-icons-new icon-rupee rf-2x" />
                      189/mo
                    </span>
                  </p>
                </li>
              </a>
              <li  >
              
                <a className='probtn'
                  href="/ghaziabad/furniture/rent-footsie-shoe-rack-large"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rent 
                </a>
              </li>
            </ul>
            </a>
           
          </div>


          </div>
          </div>
          </div>
          </div>
          </div>
         
    
        
  

        </React.Fragment>
     );
}
 
export default dashboard;