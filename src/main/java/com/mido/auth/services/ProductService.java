package com.mido.auth.services;

import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import com.mido.auth.exceptions.RecordNotFoundException;
import com.mido.auth.repository.ProductRepo;
import com.mido.auth.repository.ProductSpecificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public List<Product> findAll(){
        return (List<Product>) productRepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
    }

    public Product findById(Long id){
       Optional<Product> entity  = productRepo.findById(id);

        if(entity.isPresent()){
            return entity.get();
        }else{
            throw new RecordNotFoundException("product Not Found");
        }
    }


    public void delete(Long id){
        productRepo.deleteById(id);
    }


    public List<Product> findByCategoryId(Long categoryId){
        return productRepo.findByCategoryId(categoryId);
    }

    public Product insert(Product product){
        return productRepo.save(product);
    }

    public Product update(Product product){
        Product currentProduct = productRepo.findById(product.getId()).orElseThrow();
        currentProduct.setName(product.getName());
        currentProduct.setDescription(product.getDescription());
        currentProduct.setPrice(product.getPrice());
        currentProduct.setDiscount(product.getDiscount());
        currentProduct.setCategory(product.getCategory());
        return productRepo.save(currentProduct);
    }


    public List<Product> findProductByNameContaining(String name){
        return productRepo.findProductByNameContaining(name);
    }
}
