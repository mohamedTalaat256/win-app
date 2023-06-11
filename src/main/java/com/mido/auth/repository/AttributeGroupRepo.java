package com.mido.auth.repository;

import com.mido.auth.entity.AttributeGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AttributeGroupRepo extends JpaRepository<AttributeGroup, Long> {



    @Query(value = "select arrt from AttributeGroup arrt join arrt.category cat where cat.id = :categoryId")
    List<AttributeGroup> findByCategory(Long categoryId);
}
