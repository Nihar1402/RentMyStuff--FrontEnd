import { BASE_URL } from '../services/helper';
import React, { useEffect, useState } from "react";
import logo from "../pages/logo.svg";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

function Payment() {
    const { state } = useLocation();
    const [orderobj,setorderobj]=useState({});
    const {id}=state;
    const [orderamount,setorderamount]=useState({});
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

    const fetchorder=async()=>{
        const result = await axios.post(
      
            `BASE_URL/generateOrder/${id}`,
            
      {
              withCredentials: true,
              credentials: "include",
            headers: {
                'content-type': 'application/json',
                'crossdomain': 'true' ,
                "Authorization" : "*",
                'Access-Control-Allow-Origin': '*'
               
            }
            
        }
          ).then((result)=>{
            const products = result.data;
            // console.log(result)
            setorderobj(result.data)
            // console.log(orderobj);
          }) 
          .catch((err)=>{toast.error("Something is wrong")})
    }
    useEffect(() => {
        fetchorder();
      }, []);

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        //const json = JSON.stringify({ amount: 5000, info: "order_request" });
        console.log(id)
        // const json = {amount: 50000, info : id}
        const jon = orderobj;
        console.log(orderobj)
        const data= {amount:  Number(jon['total']),info:jon['id']}
        // console.log(data)
        const response = await axios.post("BASE_URL/razorpay/create-order",data,
        { 
            // withCredentials: true,
            // credentials: "include",

            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'crossdomain': 'true',
                // 'Access-Control-Allow-Origin': '*'
            }

    });
             console.log(response);
        if (!response) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } =response.data;
        //    const response= { amount: 1000000 , info: "order_request" }
        let options=
        {
            key: "rzp_test_401cmKXEmF2LUE",
           amount: Number(response.data['amount']),
        //    amount: 10000,
            currency:"INR",
            name: "Rent My Stuff",
            description: "Donation",
            image:"https://www.clio.com/wp-content/uploads/2022/11/Illustration_Blog_Lawyer-Payment-Methods-750x422.webp",
            order_id : orderobj['id'],
            handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
                console.log("payment successful !!");
                
                 updatePaymentOnServer(response.razorpay_payment_id,response.razorpay_order_id,"paid");
                
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



    async function updatePaymentOnServer (paymentId, orderId, status) {
        let obj={
            payment_id :paymentId,
            order_id : orderId,
            status :status,
        }
        console.log(obj);
        // Make AJAX request using fetch or axios, etc.
        const response = await axios.post("BASE_URL/payment/capture",obj,
        { 
            
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'crossdomain': 'true',
                // 'Access-Control-Allow-Origin': '*'
            }
    
    }) .then((result)=>{
        const details = result.data;
        console.log(details);
      }) 
      .catch((err)=>{toast.error("Something is wrong")});
    console.log(response)
}





    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" width={"100px"}
            height={"100px"} />
                <p>Buy React now!</p>
                <button className="App-link" onClick={displayRazorpay}>
                    {"pay "+orderobj['total']}
                </button>
            </header>
        </div>
    );
}

export default Payment;