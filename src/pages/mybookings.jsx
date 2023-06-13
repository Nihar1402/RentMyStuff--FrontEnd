import { BASE_URL } from '../services/helper';
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Mybooking = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const result = await axios
      .get(
        "BASE_URL/mybookings",

        {
          withCredentials: true,
          credentials: "include",
          headers: {
            "content-type": "application/json",
            crossdomain: "true",
          },
        }
      )
      .then((result) => {
        const products = result.data;
        setProducts(products);
        // console.log(products);
      })
      .catch((err) => {
        toast.error("Something is wrong");
      });
  };
  //to get all list of products
  useEffect(() => {
    fetchProducts();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const fetchorder = async (id) => {
     await axios
      .post(
        `http://localhost:8080/generateOrder/${id}`,

        {
          withCredentials: true,
          credentials: "include",
          headers: {
            "content-type": "application/json",
            crossdomain: "true",
            Authorization: "*",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((result) => {
         displayRazorpay(result.data)
      })
      .catch((err) => {
        toast.error("Something is wrong");
      });
  };
 
  async function displayRazorpay(orderDetail) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    //const json = JSON.stringify({ amount: 5000, info: "order_request" });
    // const json = {amount: 50000, info : id}
    const jon = orderDetail;
    const data = { amount: Number(jon["total"]), info: jon["id"] };
    // console.log(data)
    const response = await axios.post(
      "http://localhost:8080/razorpay/create-order",
      data,
      {
        // withCredentials: true,
        // credentials: "include",

        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          crossdomain: "true",
          // 'Access-Control-Allow-Origin': '*'
        },
      }
    );
    if (!response) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = response.data;
    console.log(response);
    //    const response= { amount: 1000000 , info: "order_request" }
    let options = {
      key: "rzp_test_401cmKXEmF2LUE",
      amount: Number(response.data["amount"]),
      //    amount: 10000,
      currency: "INR",
      name: "Rent My Stuff",
      description: "Donation",
      image:
        "https://www.clio.com/wp-content/uploads/2022/11/Illustration_Blog_Lawyer-Payment-Methods-750x422.webp",
      order_id: response.id,
      handler: function(response) {
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        console.log("payment successful !!");

        //  updatePaymentOnServer(,response.razorpay_order_id,"paid");
        updatePaymentOnServer(
          response.razorpay_payment_id,
          orderDetail["id"],
          "paid"
        );
      },
      prefill: {
        name: "Gaurav",
        email: "gaurav@gmail.com",
        contact: "54548485484",
      },

      notes: {
        address: "LearnCodeWith Durgesh ",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function updatePaymentOnServer(paymentId, orderId, status) {
    let obj = {
      payment_id: paymentId,
      order_id: orderId,
      status: status,
    };
    console.log(obj);
    // Make AJAX request using fetch or axios, etc.
    const response = await axios
      .post("http://localhost:8080/payment/capture", obj, {
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
          crossdomain: "true",
          // 'Access-Control-Allow-Origin': '*'
        },
      })
      .then((result) => {
        const details = result.data;
        console.log(details);
      })
      .catch((err) => {
        toast.error("Something is wrong");
      });
    console.log(response);
  }

  return (
    <React.Fragment>
      <section style={{minHeight:'50vh'}}>
        <div>
      <h2 style={{opacity:0.7,margin:'5px'}}>Your booking requests</h2>
      </div>
      <div>
    { products.length==0?<div style={{backgroundColor:'#f8f9fa', padding: '2%',Height:'30%'}}>
<div class="rm-main-head" style={{margin:20,marginBottom:'50px'}}>You don't have any item <span style={{display:'inherit'}}>create a listing</span>
<hr /></div>
<div class="rm-main-head" style={{margin:51}}> <span style={{display:'inherit'}}>Need something Rent out</span>
<hr /></div>
   </div>: <p></p>}
   </div>
      <div className="container main-content">
        {products.map((productitem) => {
          const { bookingDto, product } = productitem;
          const {
            bid,
            endDate,
            startDate,
            status,
            quantity,
            renterName,
            productId,
            orderId,
          } = bookingDto;
          const {
            id,
            pname,
            pDesc,
            pPhoto: image,
            priceperday,
            available,
          } = product;

          return (
            
            <div className=" product d-flex justify-content-around" style={{    padding: '1.5',
              fontSize: '1rem',
              borderLeft:'8px solid #ffff007d',}} key={bid}>
              {/* key={bid} */}
              <div className="">
                <img
                  className=" "
                  src={`data:image/jpeg;base64,${image}`}
                  // src={"./images/Product/" + image}
                  alt={pname}
                  height="50px"
                  width='50px'
                />
                </div>
                <div className="col-md-0 product-details">{pname} </div>
              
              <div className="col-md-3 product-details">
                <div className="col-md-3 product-details">{available}</div>
                <div className="col-md-3 product-details">{status}</div>
              </div>
              <div className=" btn-group-vertical">
                <button style={{minWidth:'150px'}}
                  className={
                    status === "Accepted"
                      ? "probtn btn-outline-primary mb-3"
                      : "probtn btn-secondary mb-3 disabled"
                  }
                  height="20px"
                  onClick={() => {
                    fetchorder(bid);
                  }} disabled={status==='Accepted'?false:true}
                >
                  {status==='PENDING'?'Waiting...':  status==='PAID'? 'DONE':'Proceed to checkout'}
                </button>
                {/* <button className='btn btn-outline-danger' onClick={()=>{handledeny(bid)}}>{"Deny"}</button> */}
                {/* disabled={status==='PENDING'?false:true} */}
              </div>
            </div>
          );
        })}
      </div>
      </section>
    </React.Fragment>
  );
};

export default Mybooking;
