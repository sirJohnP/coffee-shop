package com.coffee.loyalty.service;

import static com.coffee.loyalty.service.Util.getPhoneNumber;

import com.coffee.loyalty.entity.Transaction;
import com.coffee.loyalty.entity.User;
import com.coffee.loyalty.repository.TransactionRepository;
import com.coffee.loyalty.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OperatorService {
  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;

  @Transactional
  public void awardPoints(String userPhone, Integer amount) {
    String phoneNumber = getPhoneNumber(userPhone);

    User user = userRepository.findByPhoneNumber(phoneNumber)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setBalance(user.getBalance() + amount);
    userRepository.save(user);

    transactionRepository.save(new Transaction(
        null,
        user.getId(),
        LocalDateTime.now(),
        "AWARD",
        amount
    ));
  }

  @Transactional
  public void redeemPoints(String userPhone, Integer amount) {
    String phoneNumber = getPhoneNumber(userPhone);

    User user = userRepository.findByPhoneNumber(phoneNumber)
        .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getBalance() < amount) {
      throw new RuntimeException("Not enough points");
    }

    user.setBalance(user.getBalance() - amount);
    userRepository.save(user);

    transactionRepository.save(new Transaction(
        null,
        user.getId(),
        LocalDateTime.now(),
        "REDEEM",
        amount
    ));
  }
}
