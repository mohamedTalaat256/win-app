package com.mido.auth.controller;

import com.mido.auth.payment.StripeClient;


import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentGatewayController {

    @Autowired
    private StripeClient stripeClient;

    @PostMapping("/charge")
    public Charge chargeCard(@RequestHeader(value="token") String token, @RequestHeader(value="amount") Double amount) throws Exception {
        return this.stripeClient.chargeNewCard(token, amount);
    }

/*    @PostMapping("/get_client_secret/{clientId}")
    public Charge getClientSecrit(@PathVariable Long clientId) {


    }*/


}
