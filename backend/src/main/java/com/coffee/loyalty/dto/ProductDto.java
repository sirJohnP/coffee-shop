package com.coffee.loyalty.dto;

import lombok.Data;

@Data
public class ProductDto {
  private Long id;
  private String name;
  private Long price;
  private String imageUrl;
}