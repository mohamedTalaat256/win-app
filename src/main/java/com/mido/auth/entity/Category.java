package com.mido.auth.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Entity
@Table(name ="categories")

@Getter
@Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    private String image;

    @Column(name = "is_active")
    int isActive;


    @Column(name = "created_at")
    private String createdAt;
}
