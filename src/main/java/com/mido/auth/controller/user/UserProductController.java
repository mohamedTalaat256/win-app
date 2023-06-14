package com.mido.auth.controller.user;


import com.mido.auth.DTO.FilterProductDto;
import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import com.mido.auth.services.ProductService;
import com.mido.auth.services.SpecificationService;
import com.mido.auth.utilis.AppResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/products")
@Transactional

public class UserProductController {

    @Autowired
    private ProductService productService;


    @Autowired
    private SpecificationService specificationService;



    @GetMapping("")
    public ResponseEntity<Object> userFindAll(){
        return AppResponse.generateResponse("Success", HttpStatus.OK, productService.userFindAll(), true);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id){
        return AppResponse.generateResponse("Success", HttpStatus.OK, productService.findById(id), true);
    }


    @GetMapping("/find_by_category_id/{categoryId}")
    public ResponseEntity<Object> findByCategoryId(@PathVariable Long categoryId){
        List<Product> products = productService.findByCategoryId(categoryId);

        return AppResponse.generateResponse("Success", HttpStatus.OK, products, true);

    }

    @GetMapping("/find_by_name/{productName}")
    public ResponseEntity<Object> findProductByName(@PathVariable String productName){
        List<Product> products  = productService.findProductByNameContaining(productName);

        return AppResponse.generateResponse("Success", HttpStatus.OK, products, true);
    }


    @PostMapping("/filter")
    public ResponseEntity<Object> filterProducts(@RequestBody FilterProductDto filterProductDto){

        Long categoryId = filterProductDto.getCategoryId();
        List<ProductSpecification> specifications = filterProductDto.getSpecifications();


        //Set products id
        Set<Long> ids = productService.findProductsIdsBySpecifications(specifications);

        productService.findByIds(ids, categoryId);

         /*
            find products where ids =[ , , , , , , ,];
        */




        return AppResponse.generateResponse("Success", HttpStatus.OK, productService.findByIds(ids, categoryId), true);
    }






}
