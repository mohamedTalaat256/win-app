package com.mido.auth.controller;


import com.mido.auth.utilis.AppResponse;
import com.mido.auth.DTO.InsertProductDto;
import com.mido.auth.DTO.UpdateProductDto;
import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import com.mido.auth.services.ProductService;
import com.mido.auth.services.SpecificationService;
import com.mido.auth.utilis.Utils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/products")
@Transactional

public class ProductController {

    @Autowired
    private ProductService productService;


    @Autowired
    private SpecificationService specificationService;



    @GetMapping("")
    public ResponseEntity<Object> findAll(@RequestParam int pageNum, @RequestParam int pageSize){


      //  List<Product> products = productService.findAll();
        return AppResponse.generateResponse("Success", HttpStatus.OK, productService.findAll(pageNum, pageSize), true);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable Long id){

        //return productService.findById(id);

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

    @PostMapping("/insert")
    public ResponseEntity<Object> insert(@RequestBody @Valid InsertProductDto insertProductDto){


        String imageName = insertProductDto.getProduct().getName();
        String image64 = insertProductDto.getProduct().getImages();



        insertProductDto.getProduct().setImages(Utils.saveImage(image64, imageName));
        Product newProduct =   productService.insert(insertProductDto.getProduct());

        for (ProductSpecification s: insertProductDto.getSpecifications()) {
            s.setProduct(newProduct);
            specificationService.insert(s);
        }
        return AppResponse.generateResponse("Product Added Successfully", HttpStatus.OK,newProduct, true);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> update(@RequestBody UpdateProductDto updateProductDto){

        String imageName = updateProductDto.getProduct().getName();
        String image64 = updateProductDto.getProduct().getImages();


        Product newProduct =   productService.update(updateProductDto.getProduct());

        specificationService.deleteByProductId(updateProductDto.getProduct().getId());
        for (ProductSpecification s: updateProductDto.getSpecifications()) {
            s.setProduct(newProduct);
            specificationService.insert(s);
        }

        return AppResponse.generateResponse("Product Updated Successfully", HttpStatus.OK, updateProductDto, true);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id){
        productService.delete(id);
        return AppResponse.generateResponse("Product deleted Successfully", HttpStatus.OK,null, true);
    }

}
