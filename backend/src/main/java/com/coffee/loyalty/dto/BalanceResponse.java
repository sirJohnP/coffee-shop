package com.coffee.loyalty.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class BalanceResponse {
  private Integer balance;
  private String name;
}
