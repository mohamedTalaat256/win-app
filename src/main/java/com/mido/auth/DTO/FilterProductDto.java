package com.mido.auth.DTO;

import com.mido.auth.entity.ProductSpecification;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class FilterProductDto {
    public Long categoryId;
    public List<ProductSpecification> specifications;
}
