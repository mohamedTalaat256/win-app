package com.mido.auth.controller;


import com.mido.auth.DTO.InsertProductDto;
import com.mido.auth.DTO.UpdateProductDto;
import com.mido.auth.entity.Cart;
import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import com.mido.auth.services.CartService;
import com.mido.auth.services.ProductService;
import com.mido.auth.services.SpecificationService;
import com.mido.auth.utilis.AppResponse;
import com.mido.auth.utilis.Utils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/carts")
@Transactional

public class CartController {

    @Autowired
    private CartService cartService;



    @GetMapping("/{userId}")
    public ResponseEntity<Object> findById(@PathVariable Long userId){
        return AppResponse.generateResponse("Success", HttpStatus.OK, cartService.findByUserId(userId), true);
    }

    @PostMapping("/insert")
    public ResponseEntity<Object> insert(@RequestBody @Valid Cart cart){

        return AppResponse.generateResponse("Success", HttpStatus.OK, cartService.save(cart), true);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        cartService.delete(id);
        return AppResponse.generateResponse("item deleted Successfully", HttpStatus.OK,null, true);
    }

}
