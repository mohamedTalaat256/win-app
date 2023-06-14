package com.mido.auth.services;

import com.mido.auth.entity.Product;
import com.mido.auth.entity.ProductSpecification;
import com.mido.auth.exceptions.RecordNotFoundException;
import com.mido.auth.repository.ProductRepo;
import com.mido.auth.repository.ProductSpecificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ProductSpecificationRepo specificationRepo;



    public Page<Product> findAll(int pageNum, int pageSize){
        Pageable page = PageRequest.of(pageNum, pageSize,Sort.by(Sort.Direction.DESC, "id"));
        return productRepo.findAll(page);
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

    /********************************user ***************************************/
    /********************************user ***************************************/
    /********************************user ***************************************/
    /********************************user ***************************************/
    /********************************user ***************************************/

    public List<Product> userFindAll(){
        return productRepo.findAll();
    }


    public  Set<Long> findProductsIdsBySpecifications(List<ProductSpecification> specifications){
        ArrayList<Long> finalIds = new ArrayList<>();
        for (ProductSpecification item: specifications){
            List<Long> ids = specificationRepo.findIds(item.getSKey(),item.getSValue());
            finalIds.addAll(ids);
        }
        //use SET to remove Dublicates
        Set<Long> set = new HashSet<>(finalIds.size());
        finalIds.removeIf(p -> !set.add(p));
        return set;
    }

    public List<Product> findByIds(Set<Long> ids, Long categoryId){


       return productRepo.findByIds(ids, categoryId);
    }

}
