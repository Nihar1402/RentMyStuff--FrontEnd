import { BASE_URL } from '../services/helper';
import React from "react";
import "../css/Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}
function Footer() {
  return (
  <React.Fragment>
   {/* <div style={phantom} /> */}
    <footer className="footer" >
      <div className="footer__content">
        <div className="footer__section">
          <h3>About Us</h3>
          <p>
          RentMyStuff is a leading online platform that connects people who want to rent out their belongings with those in need of temporary access to them
          </p>
        </div>
        <div className="footer__section">
          <h3>Contact Us</h3>
          <ul>
            <li>123 Main Street</li>
            <li>Indore 10001</li>
            <li>+91 123456</li>
            <li>rentmystuff@gmail.com</li>
           
          </ul>
        </div>
        <div className="footer__section">
          <h3>Follow Us</h3>
             
          <ul className="">
            <li>
            <ul className="-list -social md:mb8 d-flex">
                    <li><a className="js-gps-track -link me-3" data-gps-track="footer.click({ location: 1, link:4 })" >Blog</a></li>
                    <li><a className="-link js-gps-track me-3" data-gps-track="footer.click({ location: 1, link: 32 })">Twitter</a></li>
                    <li><a  className="-link js-gps-track me-3" data-gps-track="footer.click({ location: 1, link: 33 })">LinkedIn</a></li>
                    <li><a  className="-link js-gps-track me-3" data-gps-track="footer.click({ location: 1, link: 36 })">Instagram</a></li>
                </ul>
                {/* <ul class="list-inline">
               <li class="list-inline-item"><a href="#">Privacy</a></li>
               <li class="list-inline-item"><a href="#">Terms</a></li>
               <li class="list-inline-item"><a href="#">Support</a></li>
             </ul> */}
           
              <a href="#">
              
              </a>
            </li>
            <li>
              <a href="#">
                
                

              </a>
            </li>
            <li>
              <a href="#">
              
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© 2023 Rental Website. All rights reserved.</p>
      </div>
    </footer>
    </React.Fragment>
  );
}

export default Footer;
