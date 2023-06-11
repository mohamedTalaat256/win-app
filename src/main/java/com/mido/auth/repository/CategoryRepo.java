package com.mido.auth.repository;

import com.mido.auth.entity.Category;
import com.mido.auth.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {

    List<Category> findCategoryByNameContaining(String name);
}
