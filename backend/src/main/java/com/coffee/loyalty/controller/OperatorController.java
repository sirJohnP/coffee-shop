package com.coffee.loyalty.controller;

import com.coffee.loyalty.dto.AwardRequest;
import com.coffee.loyalty.service.OperatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/operator")
@RequiredArgsConstructor
public class OperatorController {
  private final OperatorService operatorService;

  @PostMapping("/award")
  public ResponseEntity<Void> awardPoints(@RequestBody AwardRequest request) {
    operatorService.awardPoints(request.getUserLogin(), request.getAmount());
    return ResponseEntity.ok().build();
  }

  @PostMapping("/redeem")
  public ResponseEntity<Void> redeemPoints(@RequestBody AwardRequest request) {
    operatorService.redeemPoints(request.getUserLogin(), request.getAmount());
    return ResponseEntity.ok().build();
  }
}
