import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Card } from "@mui/material";
import { ContextProvider, useStateContext } from "../../../context/ContextProvider";
import axiosClient from "../../../axios-client";
import { Navigate, useNavigate } from "react-router-dom";

export default function CheckoutForm({order_details}) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
   const { user, cartCount, setCartCount, setCartTotal } = useStateContext(ContextProvider);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        await stripe.confirmPayment({
            elements,
            confirmParams: {return_url: `${window.location.origin}/payment_succsses`,},
            redirect: 'if_required'
            }).then((result)=>{
                if (result.paymentIntent.status === "succeeded") {
                    setMessage("payment status : succeeded");
                   
                    console.log(result.paymentIntent);
                    saveOrder(result.paymentIntent.id);
                    navigate('/payment_succsses');
                }else{
                    setMessage("payment status : error");
                }
            setIsProcessing(false);
        });
       

    };



    function saveOrder(transactionId){
        const payload = {
            user_id: user.id,
            amount: order_details.total,
            transaction_id: transactionId,
            order_status: 1,
            payment_status: 1, 
        };

        axiosClient.post('/orders/store', payload).then(({ data }) => {
            console.log('saving order');
            console.log(data);
            setCartCount(0);
            setCartTotal(0);
            

             
         }).catch((err) => {
            console.log(err);
         });
    }







    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <Card elevation={1}>
                <PaymentElement id="payment-element" />
                
                <button disabled={isProcessing || !stripe || !elements} className="btn-pay" id="submit">
                    <span id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </Card>

        </form>
    );
}