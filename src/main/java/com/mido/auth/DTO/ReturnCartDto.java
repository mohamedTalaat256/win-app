package com.mido.auth.DTO;

import com.mido.auth.entity.AppUser;
import com.mido.auth.entity.Product;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReturnCartDto {

    public ReturnCartDto(Long id, int amount, Product product) {
        this.id = id;
        this.amount = amount;
        this.product = product;
    }

    private Long id;
    private int amount;
    private Product product;

}
