package com.mido.auth.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name ="attribute_groups")

@Getter
@Setter
public class AttributeGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attr_key")
    private String attrKey;

    @Column(name = "attr_values")
    private String attrValues;

    @ManyToOne
    @JoinColumn(name = "category_id")
    //@JsonIgnore
    private Category category;

}
