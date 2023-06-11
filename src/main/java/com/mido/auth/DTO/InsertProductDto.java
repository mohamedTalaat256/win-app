package com.mido.auth.DTO;


import com.mido.auth.entity.Category;
import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InsertProductDto {

    private Product product;
    private List<ProductSpecification> specifications;
}
