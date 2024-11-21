import React from 'react';
import { CreditCard } from 'lucide-react';
import './index.css';

const PaymentSection = () => {
  return (
    <div className="payment-section">
      <div className="payment-content">
        <CreditCard size={64} className="payment-icon" />
        <h2>Payment Section</h2>
        <p>This feature is currently under development. Please check back later!</p>
      </div>
    </div>
  );
};

export default PaymentSection;