package com.campuscart.controller;

import com.campuscart.model.CartItem;
import com.campuscart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired private CartService cartService;

    @PostMapping("/add")
    public CartItem addToCart(@RequestParam Long userId,
                              @RequestParam Long productId,
                              @RequestParam int quantity) {
        return cartService.addToCart(userId, productId, quantity);
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartService.getCart(userId);
    }

    @DeleteMapping("/remove/{cartItemId}")
    public String removeItem(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return "Item removed";
    }
}