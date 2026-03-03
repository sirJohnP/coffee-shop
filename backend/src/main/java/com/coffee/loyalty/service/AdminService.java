// AdminService.java
package com.coffee.loyalty.service;

import com.coffee.loyalty.repository.TransactionRepository;
import com.coffee.loyalty.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {
  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;

  @Transactional
  public void resetSeason() {
    transactionRepository.deleteAllTransactions();
    userRepository.updateAllBalancesToZero();
  }
}