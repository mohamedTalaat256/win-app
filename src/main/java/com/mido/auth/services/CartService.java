package com.mido.auth.services;

import com.mido.auth.DTO.ReturnCartDto;
import com.mido.auth.entity.Cart;
import com.mido.auth.entity.Product;
import com.mido.auth.projection.CartProjection;
import com.mido.auth.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class CartService {

    @Autowired
    private CartRepo cartRepo;




    public List<ReturnCartDto> findByUserId(Long userId){
        List<Object[]> data = cartRepo.findByUserId(userId);
        List<ReturnCartDto> cartList = new ArrayList<>();
        for (Object[] obj :data) {
            cartList.add(new ReturnCartDto(
                    (Long) obj[0],
                    (int) obj[1],
                    (Product) obj[2]
            ));
        }
        return cartList;
    }
    public Cart save(Cart cart){
        return cartRepo.save(cart);
    }


    public void delete(Long id){
         cartRepo.deleteById(id);
    }



    public int countByUserId(Long userId){
       return cartRepo.countByUserId(userId);
    }
}
