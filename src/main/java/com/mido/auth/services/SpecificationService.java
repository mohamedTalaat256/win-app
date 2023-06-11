package com.mido.auth.services;


import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import com.mido.auth.repository.ProductSpecificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class SpecificationService {

    @Autowired
    private ProductSpecificationRepo productSpecificationRepo;


    public ProductSpecification insert(ProductSpecification productSpecification){
        return productSpecificationRepo.save(productSpecification);
    }

    public Long deleteByProductId(Long productId){
        return productSpecificationRepo.deleteByProductId(productId);
    }

    public ProductSpecification update(ProductSpecification productSpecification){

        ProductSpecification current = productSpecificationRepo.findById(productSpecification.getId()).orElseThrow();

        current.setSKey(productSpecification.getSKey());
        current.setSValue(productSpecification.getSValue());

        return productSpecificationRepo.save(productSpecification);
    }

}
