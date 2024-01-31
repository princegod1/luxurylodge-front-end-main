import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const PaymentGateway = ({ darkMode, reservationDetails, onClose }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    


    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleExpiryDateChange = (e) => {
        setExpiryDate(e.target.value);
    };

    const handleCVVChange = (e) => {
        setCVV(e.target.value);
    };

    const processPayment = async () => {
        setIsProcessing(true);

        // Simulate a successful payment
        setPaymentStatus('success');

        // If the payment is successful, you may want to trigger other actions, e.g., finalize the reservation
        // This is where you would typically make an API call to your server to complete the reservation process

        // For this example, let's wait for a few seconds and then close the modal
        setTimeout(() => {
            setIsProcessing(false);
            onClose();
        }, 3000);
    };

    return (
        <div className={`PaymentGateway ${darkMode ? "dark" : ""}`}>
           
            <form>
                <label>
                    Card Number:
                    <input type="text" value={cardNumber} onChange={handleCardNumberChange} />
                </label>
                <br />
                <label>
                    Expiry Date:
                    <input type="text" value={expiryDate} onChange={handleExpiryDateChange} placeholder="MM/YY" />
                </label>
                <br />
                <label>
                    CVV:
                    <input type="text" value={cvv} onChange={handleCVVChange} />
                </label>
                <br />
            </form>
            <button onClick={processPayment} disabled={isProcessing}>
                {isProcessing ? (
                    <>
                        <FontAwesomeIcon icon={faSpinner} spin /> Processing...
                    </>
                ) : (
                    'Proceed to Payment'
                )}
            </button>

            {paymentStatus === 'success' && (
                <div>
                    <p>Payment successful!</p>
                    {/* Add any other payment details or components here */}
                </div>
            )}
        </div>
    );
};



const mapStateToProps = (state) => ({
    darkMode: state.darkMode,
});
export default connect(mapStateToProps)(PaymentGateway);