import { BASE_URL } from '../services/helper';
import React, { useEffect, useState } from "react";
import logo from "../pages/logo.svg";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useLocation } from "react-router-dom";

function Payment() {
    const { state } = useLocation();
    const [orderobj,setorderobj]=useState({});
    const [orderid,setorderid]=useState('')
    const [paydisable,setpaydisable]=useState(true)
    const [ LoginDetail, setLoginDetails] = useState({
      name:'',
       city:'',
       userAddress:'',
       pincode:'',
       userPhone:'',
       userstate:''
  
   });

   const fetchuserAddress = async () => {
    const result = await axios.post(
      "BASE_URL/myprofile",{},{
        withCredentials: true,
        credentials: "include",
      headers: {
          'content-type': 'application/json',
          'crossdomain': 'true' ,
          "Authorization" : "*"
      }
  }
    ).then((result)=>{
      const details = result.data;
      console.log(details)
      setLoginDetails({
        name:details['userName'],userstate:details['state'],...details,
    
    
     })
      // console.log(details);
    }).catch((err)=>{toast.error("Something is wrong")});
  
  };

  useEffect(() => {
    fetchuserAddress();
  }, []);
     
   const handleChagne= (event,field) => {
    let actualvalue=event.target.value
    setLoginDetails({
        ...LoginDetail,
        [field]:actualvalue
      
    })};
    const {id}=state;
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
      console.log("bid"+id)
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
            console.log("orderobj")
            console.log(result)
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
        
        const data= {amount:  Number(orderobj['total']),info:orderobj['orderId']}
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
        console.log(response)
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
            order_id : response.id,
            handler: function (response) {
                console.log(response.razorpay_payment_id);
                console.log(response.razorpay_order_id);
                console.log(response.razorpay_signature);
                console.log("payment successful !!");
                
                //  updatePaymentOnServer(,response.razorpay_order_id,"paid");
                updatePaymentOnServer(response.razorpay_payment_id,orderobj['orderId'],"paid");
                
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
const handlesaveChanges= async(event)=>{
  console.log(LoginDetail)
  event.preventDefault();
 
  console.log(LoginDetail)
  let formData = new FormData();
  formData.append("userPic", null);
 formData.append("userName", LoginDetail['name']);
 formData.append("city", LoginDetail['city']);
 formData.append("userAddress", LoginDetail['userAddress']);
 formData.append("pincode", LoginDetail['pincode']);
 formData.append("state", LoginDetail['userstate']);
 formData.append("userPhone", LoginDetail['userPhone']);
 console.log(formData)  
 
  const result = await axios.post('/updateProfile', formData, {
   withCredentials: true,
   credentials: "include",
    headers: {
        "content-type": "multipart/form-data",
        "Authorization" : "*",
        'crossdomain': 'true' ,
        // "Content-Length": formData.length,
    }
 }).then(result=>{
  // console.log(result)
  toast.success(result.data)
  linkorder()
  return;
 
 }).catch(err=>{toast.warning("something went wrong!..")})
 console.log(result)
 };


 const linkorder=async()=>{
  console.log("bid"+id)
    const result = await axios.post(
  
        `BASE_URL/proceedtocheckout/${orderobj['orderId']}`,{},
        
        {
          withCredentials: true,
          credentials: "include",
           headers: {
            'Accept': 'application/json',
               "Authorization" : "*",
               'crossdomain': 'true' ,
           }
        }
      ).then((result)=>{
        const products = result.data;
        console.log("orderid")
        console.log(result)
        // setorderobj(result.data)
        // console.log(orderobj);
      }) 
      .catch((err)=>{toast.error("Something is wrong")})
}
   useEffect(() => {
        
      }, []);


    return (<React.Fragment>
        <div className="maincontainer">
         <div className="container">
           <div className="py-5 text-center">
             
             <h2>Checkout form</h2>
           </div>
           <div className="row">
       
                        
             <div className="col-md-4 order-md-2 mb-4">
               <h4 className="d-flex justify-content-between align-items-center mb-3">
                 <span className="text-muted">Your cart</span>
                 <span className="badge badge-secondary badge-pill">3</span>
               </h4>
               <ul className="list-group mb-3">
                 <li className="list-group-item d-flex justify-content-between lh-condensed">
                   <div>
                     <h6 className="my-0">{orderobj['productName']}</h6>
                     <small className="text-muted"></small>
                   </div>
                   <span className="text-muted">X{orderobj['quantity']}</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between lh-condensed">
                   <div>
                     <h6 className="my-0">Service charge</h6>
                     <small className="text-muted">*delivery included </small>
                   </div>
                   <span className="text-muted">{orderobj['serviceCharge']}</span>
                 </li>
                 <li class="list-group-item d-flex justify-content-between lh-condensed">
                   <div>
                     <h6 class="my-0">Price/day</h6>
                     <small class="text-muted"></small>
                   </div>
                   <span class="text-muted">{orderobj['pricePerDay']}</span>
                 </li>
                 <li class="list-group-item d-flex justify-content-between lh-condensed">
                   <div>
                     <h6 class="my-0">Security Deposit</h6>
                     <small class="text-muted"></small>
                   </div>
                   <span class="text-muted">{orderobj['securityDeposit']}</span>
                 </li>
                 <li className="list-group-item d-flex justify-content-between">
                   <span>Total (INR)</span>
                   <strong>{orderobj['total']}</strong>
                 </li>
               </ul>
               <div className="App">
            <header className="App-header">
                <button className="App-link nav-btn"  onClick={displayRazorpay}>
                    {"Pay "+orderobj['total']}
                </button>
            </header>
        </div>
             </div>
             <div className="col-md-8 order-md-1">
               <h4 className="mb-3">Billing address</h4>
               <form className="needs-validation" novalidate>
                 
                 <div className="mb-3">
                   {/* <label for="username">Username</label> */}
                   <label htmlFor="name" className="form-label">Name</label>
                   <div className="input-group">
                     <div className="input-group-prepend">
                     </div>
                  
      <input  required type="text" id="name" className="form-control" placeholder="name" value={LoginDetail.name} />
                     <div className="invalid-feedback">
                       Your username is required.
                     </div>
                   </div>
                 </div>
                 <div className="mb-3">
                   <label htmlFor="address">Address</label>
                   <input type="text" id="userAddress" className="form-control" placeholder="Address" value={LoginDetail.userAddress} onChange={(e)=>{handleChagne(e,'userAddress')}}/>
                   <div className="invalid-feedback">
                     Please enter your shipping address.
                   </div>
                 </div>
               
                 <div className="row">
                 <div className="col-md-6">
                            <label htmlFor="userstate" className="form-label">State</label>
      <input type="text" id="userstate" className="form-control" placeholder="state" value={LoginDetail.userstate} onChange={(e)=>{handleChagne(e,'userstate')}}/>
                            </div>
                            {/* <!-- Form Group (location)--> */}
                            <div className="col-md-6"> <label htmlFor="City" className="form-label">City</label>
      <input type="text" id="userAddress" className="form-control" placeholder="City" value={LoginDetail.city} onChange={(e)=>{handleChagne(e,'city')}}/>
                            </div>
                        </div>




                        
                       
                        
                    
                        <div className="row gx-3 mb-3 mt-3">
                            <div className="col-md-6">
                            <label htmlFor="pincode" className="form-label">Pincode</label>
      <input type="text" id="userpincode" className="form-control" placeholder="pincode" minLength={6} value={LoginDetail.pincode} onChange={(e)=>{handleChagne(e,'pincode')}}/>
                            </div>
                  

                            <div className="col-md-6">
                            <label htmlFor="pincode" className="form-label">Phone </label>
      <input type="text" id="userpincode" className="form-control" placeholder="pincode" minLength={6} value={LoginDetail.userPhone} onChange={(e)=>{handleChagne(e,'userPhone')}}/>
                            </div>
                  
                   <div class="col-md-3 mb-3">
                    
                   </div>
                 </div>   
                 {/* <hr class="mb-4" /> */}
                 <button class="btn btn-primary btn-lg btn-block" type="button" onClick={handlesaveChanges}>Continue to checkout</button>
               </form>
             </div>
           </div>
          
         </div>
      
       </div>
    
      
        </React.Fragment>
    );
}

export default Payment;



{/* <div class="col-md-5 mb-3">
<label for="country">Country</label>
<select class="custom-select d-block w-100" id="country" required>
  <option value="">Choose...</option>
  <option>United States</option>
</select>
<div class="invalid-feedback">
  Please select a valid country.
</div>
</div>
<div class="col-md-4 mb-3">
<label for="state">State</label>
<select class="custom-select d-block w-100" id="state" required>
  <option value="">Choose...</option>
  <option>California</option>
</select>
<div class="invalid-feedback">
  Please provide a valid state.
</div>
</div> */}




// const fetchAddress = async () => {
//   const result = await axios.get(
//     "http://localhost:8080/userAddresses",{
//       withCredentials: true,
//       credentials: "include",
//     headers: {
//         'content-type': 'application/json',
//         'crossdomain': 'true' ,
//         "Authorization" : "*"
//     }
// }
//   ).then((result)=>{
//     const details = result;
//     console.log(details);
//   }).catch((err)=>{toast.error("Something is wrong")});

// };

// useEffect(() => {
//   fetchAddress();
// }, []);