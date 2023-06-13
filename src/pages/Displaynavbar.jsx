import { BASE_URL } from '../services/helper';
import React from 'react';
// import { isLoggedIn } from './../auth/index';
import Usernavbar from './UserNavbar';
import PublicNavbar from './NavBarPublic';
// import { useState ,useEffect} from 'react';
import { useContext } from 'react';
import AuthContext from '../services/authContext';
const DisplayNavbar = ()=>{ 

  const { isLoggedIn} = useContext(AuthContext);
  
    const display=()=>{
      if (isLoggedIn===true) {
        return <Usernavbar />;
      }
      return <PublicNavbar />;
    
    }
    return (
       <React.Fragment>
        {/* {console.log(loggedIn)} */}
        {/* {isLoggedIn()==false ?  <PublicNavbar />:<Usernavbar />} */}
          {display()}
       </React.Fragment>
      );
    }
 
export default DisplayNavbar;