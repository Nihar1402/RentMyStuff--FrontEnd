import { BASE_URL } from '../services/helper';
import React from 'react';
const Howitworks = () => {
    return (  
        <section style={{minHeight:'50vh'}}>
              <div className="how-it-works">
                <h1 style={{margin:20}}>How It Works</h1>
                <div data-mercury="full" id="how_to_use_page_content" style={{padding:30}}>
  <p>
    <b>It's free to join.&nbsp; &nbsp;</b>
    <b style={{ fontSize: '1em' }}>It's free to list your stuff.</b>
  </p>
  <p>
    <b>
      <span style={{ backgroundColor: '#FFFF00' }}>
        <span style={{ backgroundColor: '#FFFFFF' }}>Borrowers</span>
      </span>
    </b>
  </p>
  <ol>
    <li>
      <b>Find </b>an item you&nbsp;want to rent (party supplies, fitness
      equipment,&nbsp; kids costume, dress, jewellery...)
    </li>
    <li>
      <b>Request the item</b> and dates required
    </li>
    
    <li>
      <b>Receive confirmation&nbsp;&nbsp;</b>
    </li>
    <li>
      <b>Arrange</b> pickup, delivery or shipping with the lender
    </li>
    <li>
      <b>Payment</b>&nbsp;is made once the request is accepted
    </li>
    <li>
      <b>Use</b> the item{' '}
    </li>
    <li>
      <b>Return</b> the item
    </li>
    {/* <li>
      <b>Rate the lender</b>
    </li> */}
  </ol>
  <p>&nbsp;</p>
  <p>
    <b>
      <span style={{ backgroundColor: '#FFFF00' }}>
        <span style={{ backgroundColor: '#FFFFFF' }}>Lenders</span>
      </span>
    </b>
  </p>
  <ol>
    <li>
      <b>List your item</b> (upload photos, a description, pricing and
      location. <br/>Remember to block out the times you're using your stuff so it
      doesn't get&nbsp;booked &nbsp;when you need it)
    </li>
    <li>
      <b>Approve&nbsp; (or decline) requests</b> 
      {/* (arrange the time and place for
      delivery) */}
    </li>
    <li>
      <b>Lend your item out</b>&nbsp;
    </li>
    <li>
      <b>Earn cash</b> directly 
    </li>
    {/* <li>
      <b>Rate the borrower</b>
    </li> */}
  </ol>
  <div>
    <b>
      <br />
    </b>
  </div>
  <div>
    <b>
      <br />
    </b>
  </div>
</div>;

              </div>
              </section>
            );
          }
          
        
          
 
export default Howitworks;