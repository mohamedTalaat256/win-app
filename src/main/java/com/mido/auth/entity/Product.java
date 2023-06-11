package com.mido.auth.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name ="products")
@EntityListeners({AuditingEntityListener.class})
@Getter
@Setter

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String description;
    private String sku;

    private double price;
    private double rating;
    private double discount;


    @Column(name = "stock_qti")
    private int stockQti;

    private String images;



    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;



    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ProductSpecification> specifications;

    @Column(name = "is_active")
    private int isActive;

    //@Column(name = "created_date")
    @CreatedDate
    private LocalDateTime createdDate;


    @CreatedBy
    private String createdBy;
}
