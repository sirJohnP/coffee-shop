package com.coffee.loyalty.controller;

import com.coffee.loyalty.dto.CreateOperatorRequest;
import com.coffee.loyalty.entity.Operator;
import com.coffee.loyalty.repository.OperatorRepository;
import com.coffee.loyalty.repository.TransactionRepository;
import com.coffee.loyalty.repository.UserRepository;
import com.coffee.loyalty.service.AdminService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

  private final OperatorRepository operatorRepository;
  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;
  private final PasswordEncoder passwordEncoder;

  private final AdminService adminService;

  @GetMapping("/operators")
  public List<Operator> getAllOperators() {
    return operatorRepository.findAll();
  }

  @PostMapping("/operators")
  public Operator createOperator(@RequestBody CreateOperatorRequest request) {
    Operator op = new Operator();
    op.setLogin(request.getLogin());
    op.setPassword(passwordEncoder.encode(request.getPassword()));
    return operatorRepository.save(op);
  }

  @PostMapping("/season/reset")
  public String resetSeason() {
    adminService.resetSeason();
    return "Season reseted";
  }

  @GetMapping("/stats")
  public Map<String, Integer> getStats() {
    int total = userRepository.countActiveUsers();
    int totalAwarded = transactionRepository.sumByType("AWARD");
    int totalRedeemed = transactionRepository.sumByType("REDEEM");
    return Map.of(
        "totalUsers", total,
        "totalAwarded", totalAwarded,
        "totalRedeemed", totalRedeemed
    );
  }
}