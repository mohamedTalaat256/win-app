package com.mido.auth.DTO;


import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UpdateProductDto {

    private Product product;
    private List<ProductSpecification> specifications;
}
