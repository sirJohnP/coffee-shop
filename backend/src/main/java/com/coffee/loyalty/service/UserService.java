package com.coffee.loyalty.service;

import static com.coffee.loyalty.service.Util.getPhoneNumber;

import com.coffee.loyalty.dto.BalanceResponse;
import com.coffee.loyalty.dto.RegisterRequest;
import com.coffee.loyalty.entity.Transaction;
import com.coffee.loyalty.entity.User;
import com.coffee.loyalty.repository.TransactionRepository;
import com.coffee.loyalty.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final TransactionRepository transactionRepository;

  private final PasswordEncoder passwordEncoder;

  public BalanceResponse getBalance(Long userId) {
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("Not found"));
    return new BalanceResponse(user.getBalance(), user.getName());
  }

  public List<Transaction> getHistory(Long userId) {
    return transactionRepository.findByUserIdOrderByTimestampDesc(userId);
  }

  public User register(RegisterRequest request) {
    String phoneNumber = getPhoneNumber(request.getPhoneNumber());

    if (userRepository.existsByPhoneNumber(phoneNumber)) {
      throw new IllegalArgumentException("User already exists");
    }
    User user = new User();
    user.setPhoneNumber(phoneNumber);
    user.setName(request.getName());
    user.setBalance(0);
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    return userRepository.save(user);
  }
}
