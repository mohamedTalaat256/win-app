package com.mido.auth.controller;


import com.mido.auth.utilis.AppResponse;
import com.mido.auth.entity.Category;
import com.mido.auth.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.xml.bind.DatatypeConverter;
import java.io.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

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

    @PostMapping("/insert")
     public ResponseEntity<Object> insert(@RequestBody Category category){

        String imageName = category.getName();
        String image64 = category.getImage();
        String[] strings = image64.split(",");
        String extension;
        switch (strings[0]) {//check image's extension
            case "data:image/jpeg;base64":
                extension = "jpeg";
                break;
            case "data:image/png;base64":
                extension = "png";
                break;
            default://should write cases for more images types
                extension = "jpg";
                break;
        }

        byte[] data = DatatypeConverter.parseBase64Binary(strings[1]);
        String path = "src\\main\\media\\"+imageName+"."+ extension;
        File file = new File(path);
        try (OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(file))) {
            outputStream.write(data);
        } catch (IOException e) {
            e.printStackTrace();
        }

        category.setCreatedAt(java.time.LocalDateTime.now().toString());
        category.setImage(imageName+"."+ extension);
        Category newCategory = categoryService.insert(category);
        return AppResponse.generateResponse("Category Added Successfully", HttpStatus.OK, newCategory, true);
    }

    @PutMapping("/update")
    public  Category update(Category category){
        return  categoryService.update(category);
    }



}
