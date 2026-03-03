package com.coffee.loyalty.service;

import com.coffee.loyalty.dto.ProductDto;
import com.coffee.loyalty.repository.ProductRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
  private final ProductRepository productRepository;

  public List<ProductDto> getAffordableProducts(Long balance) {
    return productRepository.getAvailableProducts(balance)
        .stream()
        .map(p -> {
          ProductDto dto = new ProductDto();
          dto.setId(p.getId());
          dto.setName(p.getName());
          dto.setPrice(p.getPrice());
          dto.setImageUrl(p.getPathToImage());
          return dto;
        })
        .toList();
  }
}