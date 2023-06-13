import { BASE_URL } from '../services/helper';
import React, { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import {  toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Loading from "./loading";

// import { Carousel } from 'react-bootstrap'
import { Carousel } from 'reactstrap'
import "../css/test.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap";
import { useContext } from 'react';
import AuthContext from '../services/authContext';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
    const navigate = useNavigate();
    //const [product, setProduct] = useState(null);
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [powner, setpowner] = useState("");
    const [quantity, setQuantity] = useState(1)
   const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(2);
    const [comment, setComment] = useState('');
    const { isLoggedIn} = useContext(AuthContext);

    
    useEffect(() => {
        fetchProducts();
      }, []);
  

    const fetchProducts = async () => {
        setIsLoading(true)
     await axios.get(
          "BASE_URL/products/"+id,{
            withCredentials: true,
            credentials: "include",
          headers: {
              'content-type': 'application/json',
              'crossdomain': 'true' ,
              "Authorization" : "*",
              'Access-Control-Allow-Origin': '*'
          }
      }).then((response)=>{
        setIsLoading(false)
        const prodetails=response.data;
        const detail=prodetails["product"]
        console.log(response)
        setProduct(detail)
        setpowner(prodetails["powner"])
     
      })
     .catch((err)=>{
        
        toast.error("Something is wrong")
        setIsLoading(false)
      console.log(err)}); };

   

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)

    }
    const addToCart=()=>{
        console.log("add to cart")
    }
    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', 1);

        // dispatch(newReview(formData));
    }
    const handleredirect=(id)=>{
        if (isLoggedIn == false){
            navigate('/login');
        }
        else{
            navigate('/rentproduct',{state:{id:id}});
        }
    }

    return (
        <Fragment>
            
                <Fragment>
                    {/* <MetaData title={product.name} /> */}
                    {isLoading && <Loading/>}
                    <div className="row d-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <img className="d-block w-100"  height={'70%'} src={`data:image/jpeg;base64,${product.pPhoto}`} alt={product.title} />
                            {/* <Carousel pause='hover'>
                                {images.map(image => (
                                    <Carousel.Item key={1+image}>
                                        <img className="d-block w-100" src={'./images/Product/'+image} alt={product.title} />
                                    </Carousel.Item>
                                ))}
                            </Carousel> */}
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            
                            <h3>{product.pname}</h3>
                            <hr />

                            <p id="product_id">Product #  {product.id}</p>

                            <hr />
{/* 
                            <div className="rating-outer">
                                <div className="rating-inner" style={{ width: `${(20/ 5) * 100}%` }}></div>
                            </div>
                            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                            <hr /> */}

                            <p id="product_price" style={{opacity:'0.77'}}>₹  {product.priceperday}/day</p>

                            {/* <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                            </div>
                            <button type="button" id="cart_btn" className="btn btn-primary d-inline ms-4" disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button> */}

                            <hr />

                            <p>Status: <span id="stock_status" className={product.available===true ? 'greenColor' : 'redColor'} >{product.available===true  ? 'In Stock' : 'Out of Stock'}</span></p>

                            <hr />

                            <p className="mt-2">Security Deposit (Fully Refundable)  : <strong>₹ {product.securityDeposite}/-</strong></p>
                            
                            <hr />
                            <p className="mt-2">Product Quantity : <strong>{product.quantity}</strong></p>
                            <hr />

                            <h4 className="mt-2">Description:</h4>
                            <p style={{ whiteSpace: 'pre-wrap' }}> {product.pDesc} </p>
                            <hr />

                           

                            <p id="product_seller mb-3">Sold by : <strong>{powner}</strong></p>

                            {<button id="review_btn" type="button" className="btn btn-primary mt-4" disabled={product.available==true?false:true} onClick={()=>{handleredirect(product.id)} 
                        }>
                                Rent Now ..
                            </button>
                                // :
                                // <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            }


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )} */}

                </Fragment>
              
        </Fragment>
    )
}
export default Demo;