package com.mido.auth.services;


import com.mido.auth.entity.AttributeGroup;
import com.mido.auth.repository.AttributeGroupRepo;
import com.mido.auth.repository.ProductSpecificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AttributeGroupService {

    @Autowired
    private AttributeGroupRepo attributeGroupRepo;

    public AttributeGroup insert(AttributeGroup attributeGroup){
        return attributeGroupRepo.save(attributeGroup);
    }

    public List<AttributeGroup> findByCategoryId(Long categoryId){

        return attributeGroupRepo.findByCategory(categoryId);
    }
}
