
import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import axiosClient from "../../../axios-client";
import { CircularProgress, Stack, Typography } from "@mui/material";
function Payment({order_details }) {
  const [stripePromise, setStripePromise] = useState(loadStripe("pk_test_51LYUvnBVDibabXHisH0GvAI2H39DwKOoMLKVVVTNvqu4niaeCnMpQdJVkGQlPrOpDqjn6n6JBUpZt6tpr8swrH4u00IWn8PtCa"));
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);



  useEffect(() => {

    setLoading(true);
    axiosClient.get('get_client_secrete/5').then(({ data }) => {
      setClientSecret(data.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);

    })
  }, []);

  return (
    <>
      {
        clientSecret && stripePromise 
        ?
        (<Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <CheckoutForm order_details={order_details}/>
          </Elements>)
        :
        <Stack direction='column' alignItems={'center'}>
          <CircularProgress sx={{ display: 'flex', margin: 'auto', color:'text.secondary' }} />
          <Typography variant='subtitle1'>Loading Payment From...</Typography>
        </Stack>
      }
    </>
  );
}

export default Payment;


