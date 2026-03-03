package com.coffee.loyalty.dto;

import lombok.Data;

@Data
public class LoginRequest {
  private String login;
  private String password;
  private String role;
}