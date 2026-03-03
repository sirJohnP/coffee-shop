package com.coffee.loyalty.dto;

import lombok.Data;

@Data
public class CreateOperatorRequest {
  private String login;
  private String password;
}