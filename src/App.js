import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
// import { useEffect,useState ,useContext} from 'react';
import { ToastContainer } from 'react-toastify';
import Home from "./pages/Home"
import Login from './pages/Login';
import Register from './pages/register';
import Myprofile from './pages/myprofile';
import dashboard from './pages/userdashboard';
import Addproduct from './pages/addproduct';
import ProductList from './pages/ProductList';
import Payment from './pages/Payment';
import Logout from './pages/Logout';
import DisplayNavbar from './pages/Displaynavbar';
import Editproduct from './pages/Editproduct';
import Allproduct from './pages/Allproduct';
import Rentitem from './pages/Rentitem';
import Myrental from './pages/myrental';
// import Mybooking from './pages/mybookings';
import Mybooking from './pages/mybooking1';


import AuthProvider from './services/AuthProvider';
import Bookingrequest from './pages/bookingrequest';
import { ErrorPageOne } from './pages/notfound';
import Footer from './pages/Footer';
import Work from './pages/work';
import Demo from './pages/demo';
import Orderrecipt from './pages/orderrecipt';
import Checkout from './pages/checkout';
import Dryrun from './pages/dryrun';
import Aboutus from './pages/aboutus';
import Howitworks from './pages/Howitworks';
import { RequireAuth } from './pages/RequireAuth';
function App() {
  return (
    <React.Fragment>
    
   <BrowserRouter>
   <AuthProvider>
   <DisplayNavbar />
    
   <Routes>

    <Route path='/Home' element={<Home/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='aboutus' element={<Aboutus/>}/>
    <Route path='/Login' element={<Login />}/>
    <Route path='/register' Component={Register}/>
    <Route path='/myprofile' exact Component={Myprofile}/>
    <Route path='/dashboard' Component={dashboard}/>
    <Route path="/addproduct" element={
      <RequireAuth>
        <Addproduct/>
      </RequireAuth>
    }/>
    {/* <Route path='/addproduct' Component={Addproduct} /> */}
    <Route path='/productlist' Component={ProductList} />
    <Route path='/payment' Component={Payment} />
    <Route path='/editproduct' Component={Editproduct} />
    <Route path='/logout' Component={Logout} />
    <Route path='/allproducts' element={<Allproduct />}/>
    <Route path='/rentproduct'Component={Rentitem}/>
    <Route path='/myrental'Component={Myrental}></Route>
    <Route path='/orderrecipt'element={<Orderrecipt />}/>
    <Route path='/mybooking'element={<Mybooking />}/>
    <Route path='/myrequest'element={<Bookingrequest />}/>
    <Route path='/' exact Component={Home} />
    <Route path='/notfound' exact element={<ErrorPageOne/>} />
    <Route path='/work' exact element={<Work/>} />
    <Route path='/demo/:id' exact element={<Demo/>} />
    <Route path='/checkout' exact element={<Checkout/>} />
    <Route path='/howitworks' exact element={<Howitworks/>}/>
    {/* <Route path='/dryrun' exact element={<Dryrun></Dryrun>} /> */}
    <Route path="*" element={<Navigate replace to="/notfound" />} />
   </Routes>
  
   <ToastContainer  position="bottom-right"
autoClose={3000}/>
 </AuthProvider>
   </BrowserRouter>
   
   <footer>
   <Footer />
   </footer>
   </React.Fragment>
  );
}

export default App;
