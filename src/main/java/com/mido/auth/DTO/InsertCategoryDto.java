package com.mido.auth.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsertCategoryDto {
    private String name;
    private String description;

    private String image;

    private String isActive;
}
