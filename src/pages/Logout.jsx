import { BASE_URL } from '../services/helper';

    // };
    // <div className="button-group">
    // {/* <button type="submit" className="btn btn-primary me-3" onClick={handleclick}>Logout</button> */}
    // </div>
// import React from 'react';
import { useEffect } from 'react';
import { doLogout } from './../auth/index';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../services/authContext';
import { useContext } from 'react';
import axios from 'axios';
const Logout = () => {
    const navigate = useNavigate();
    const { userlogout} = useContext(AuthContext);
    useEffect(()=>{
        const handleclick = async() =>{
            // event.preventDefault();
            const result = await axios.post('https://rentmy.up.railway.app/logout', {}, {
                withCredentials: true,
                credentials: "include",
              headers: {
                'content-type': 'application/json',
                'crossdomain': 'true' ,
                "Authorization" : "*",
                'Access-Control-Allow-Origin' : '*',
              }
          }).then((result)=>{ 
            console.log(result.headers)
        
          }).catch((err)=>{
            console.log(err)
          }) };
          handleclick()
          doLogout()
          userlogout()
          navigate('/');
       })

    }
     
    export default Logout;