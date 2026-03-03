package com.coffee.loyalty.dto;

import lombok.*;

@Data
public class AwardRequest {
  private String userLogin;
  private Integer amount;
}
