package com.coffee.loyalty.controller;

import com.coffee.loyalty.dto.BalanceResponse;
import com.coffee.loyalty.dto.ProductDto;
import com.coffee.loyalty.dto.RegisterRequest;
import com.coffee.loyalty.entity.Transaction;
import com.coffee.loyalty.service.UserService;
import com.coffee.loyalty.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final ProductService productService;


  @GetMapping("/balance")
  public ResponseEntity<BalanceResponse> getBalance(@RequestParam Long userId) {
    return ResponseEntity.ok(userService.getBalance(userId));
  }

  @GetMapping("/history")
  public ResponseEntity<List<Transaction>> getHistory(@RequestParam Long userId) {
    return ResponseEntity.ok(userService.getHistory(userId));
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
    try {
      userService.register(request);
      return ResponseEntity.ok("Registration successful");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @GetMapping("/products")
  public ResponseEntity<List<ProductDto>> getAffordableProducts(@RequestParam Long userId) {
    Integer balance = userService.getBalance(userId).getBalance();
    List<ProductDto> products = productService.getAffordableProducts((long) balance);
    return ResponseEntity.ok(products);
  }
}