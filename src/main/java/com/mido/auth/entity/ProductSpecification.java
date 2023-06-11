package com.mido.auth.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

@Entity
@Table(name ="product_specifications")

@Getter
@Setter
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "s_key")
    private String sKey;

    @Column(name = "s_value")
    private String sValue;

    @ManyToOne(fetch = FetchType.LAZY)
    /*
    لما بيرجع الحاجة بشكل lazy بيعمل اكتر من query لكن لما تكون eager بيعمل join
    يعني بيعمل كويري واحدة
    فا الحل اني استخدم ال Entity Graph
    هاروح في ملف ال Repo بتاع ال child و أكتب علي الميثود اللي بترجع
    @EntityGraph(attributePathes = "product")
    * */

    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

}
