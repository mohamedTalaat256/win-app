package com.mido.auth.services;


import com.mido.auth.entity.Category;
import com.mido.auth.entity.Product;
import com.mido.auth.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CategoryService{

    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> findAll(){
        return (List<Category>)categoryRepo.findAll();
    }

    public List<Category> findCategoryByNameContaining(String name){
        return (List<Category>)categoryRepo.findCategoryByNameContaining(name);
    }

    public Category findById(Long id){
        return categoryRepo.findById(id).orElseThrow();
    }


    public Category insert(Category category){
        return categoryRepo.save(category);
    }

    public Category update(Category category){
        Category currentCategory = categoryRepo.findById(category.getId()).orElseThrow();
        currentCategory.setName(category.getName());
        currentCategory.setDescription(category.getDescription());
        return categoryRepo.save(currentCategory);
    }
}
