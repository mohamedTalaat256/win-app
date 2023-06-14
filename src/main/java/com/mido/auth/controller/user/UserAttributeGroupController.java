package com.mido.auth.controller.user;


import com.mido.auth.entity.AttributeGroup;
import com.mido.auth.services.AttributeGroupService;
import com.mido.auth.utilis.AppResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attribute_groups")
public class UserAttributeGroupController {

    @Autowired
    private AttributeGroupService attributeGroupService;


    @GetMapping("/{categoryId}")
    public ResponseEntity<Object> findByCategoryId(@PathVariable Long categoryId){

        List<AttributeGroup> attributesGroup = attributeGroupService.findByCategoryId(categoryId);

        return AppResponse.generateResponse("Success", HttpStatus.OK, attributesGroup, true);
    }
}
