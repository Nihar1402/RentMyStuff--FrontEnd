import { BASE_URL } from '../services/helper';
import React from 'react';
import '../css/Loading.css';

function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
    </div>
  );
}

export default Loading;