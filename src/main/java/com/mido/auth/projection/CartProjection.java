package com.mido.auth.projection;

import com.mido.auth.entity.Product;

public interface CartProjection {

    Long getId();
    int getAmount();

    Product getProduct();
}
