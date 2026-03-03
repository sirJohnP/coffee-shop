package com.coffee.loyalty.service;

import java.util.regex.Pattern;

public class Util {
  protected static boolean validatePhoneNumber(String phoneNumber) {
    String regex = "((\\+7)|8)\\d{10}";
    return Pattern.compile(regex).matcher(phoneNumber).matches();
  }

  protected static String getPhoneNumber(String phoneNumber) {
    if (!validatePhoneNumber(phoneNumber)) {
      throw  new RuntimeException("Invalid phone number");
    }
    if (phoneNumber.charAt(0) == '+') {
      return phoneNumber;
    }
    return phoneNumber.replaceAll("^\\d", "+7");
  }
}
