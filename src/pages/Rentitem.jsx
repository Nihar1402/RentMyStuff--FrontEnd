import { BASE_URL } from '../services/helper';
import React, { useState } from "react";
import "./styledate.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import Loading from "./loading";

const Rentitem = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [validationError, setValidationError] = useState(false);
 
  const [isLoading, setIsLoading] = useState(false);
 
  const location = useLocation();
  const { id } = location.state;

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    // Check if the new quantity is within the valid range
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      setValidationError(false);
    } else {
      setValidationError(true);
    }
  };

  const handleIncrement = (event) => {
    event.preventDefault();
    // Increment quantity by 1, if it's within the valid range
    if (quantity < 10) {
      setQuantity(quantity + 1);
      setValidationError(false);
    } else {
      setValidationError(true);
    }
  };

  const handleDecrement = (event) => {
    event.preventDefault();
    // Decrement quantity by 1, if it's within the valid range
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setValidationError(false);
    } else {
      setValidationError(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setIsLoading(true);
    // console.log(location.pathname)
    console.log(id);
    const data = { startDate: startDate, endDate: endDate, quantity: quantity };

    const result = await axios
      .post(`BASE_URL/products/${id}/bookings`, data, {
        withCredentials: true,
        credentials: "include",
        headers: {
          "content-type": "application/json",
          Authorization: "*",
          crossdomain: "true",
          // "Content-Length": formData.length,
        },
      })
      .then((result) => {
        // console.log(result)
        setIsLoading(false);
        setStartDate("");
        setEndDate("");
        setQuantity(1);
        toast.success(result.data);
        return;
      })
      .catch((err) => {
        setIsLoading(false);
        toast.warning("something went wrong!..");
      });

    // useEffect(()=>{
    //     const date= new Date();
    //     console
    //     },[])
  };
  return (
    <React.Fragment>
    <div className="date-range-picker-container">
      <form onSubmit={handleSubmit}>
      {/* <h2 className="date-range-picker-heading">Date Range Picker</h2> */}
      <div className="date-range-picker-form">
        <label htmlFor="startDate" className="date-range-picker-label">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="date-range-picker-input"
          required
        />

        <label htmlFor="endDate" className="date-range-picker-label">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          className="date-range-picker-input"
          required
        />

        <label htmlFor="quantity" className="date-range-picker-label">
          Quantity:
        </label>
        <div className="quantity-input-container">
          <button  onClick={handleDecrement} className="quantity-input-button">
            -
          </button>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />

          <button onClick={handleIncrement} className="quantity-input-button">
            +
          </button>
        </div>
        {validationError && (
          <p className="validation-error">Quantity must be between 1 and 10.</p>
        )}
      </div>
      <div className="date-range-picker-summary">
        <p>
          <strong>Start Date  :</strong> {startDate}
        </p>
        <p>
          <strong>End Date  :</strong> {endDate}
        </p>
        <p>
          <strong>Quantity  :</strong> {quantity}
        </p>
      </div>
      <div className="d-flex justify-content-center">
      <button
        type="submit"
        className={` ogbtn ${isLoading ? "disabled" : ""}`}
        
      >
        Rent
      </button></div>
      {isLoading && <Loading />}
      </form>
    </div>
    </React.Fragment>
  );
};

export default Rentitem;
