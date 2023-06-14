package com.mido.auth.controller.user;


import com.mido.auth.entity.Category;
import com.mido.auth.services.CategoryService;
import com.mido.auth.utilis.AppResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class UserCategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping("")
    public ResponseEntity<Object> findAll(){
        List<Category> categories = categoryService.findAll();
        return AppResponse.generateResponse("success", HttpStatus.OK, categories, true);
    }

    @GetMapping("/{id}")
    public Category findById(@PathVariable Long id){
        return categoryService.findById(id);
    }


    @GetMapping("/find_by_name/{categoryName}")
    public ResponseEntity<Object> findProductByName(@PathVariable String categoryName){
        List<Category> categories  = categoryService.findCategoryByNameContaining(categoryName);

        return AppResponse.generateResponse("Success", HttpStatus.OK, categories, true);

    }

}
