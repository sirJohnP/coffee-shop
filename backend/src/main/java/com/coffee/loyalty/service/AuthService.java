package com.coffee.loyalty.service;

import static com.coffee.loyalty.service.Util.getPhoneNumber;

import com.coffee.loyalty.dto.AuthResponse;
import com.coffee.loyalty.dto.LoginRequest;
import com.coffee.loyalty.entity.Admin;
import com.coffee.loyalty.entity.Operator;
import com.coffee.loyalty.entity.User;
import com.coffee.loyalty.repository.AdminRepository;
import com.coffee.loyalty.repository.OperatorRepository;
import com.coffee.loyalty.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final OperatorRepository operatorRepository;
  private final AdminRepository adminRepository;


  private final PasswordEncoder passwordEncoder;

  private static final String SECRET_KEY = "coffee-loyalty-system-secret-key";

  public AuthResponse login(LoginRequest request) {
    switch (request.getRole()) {
      case "customer":
        String phoneNumber = getPhoneNumber(request.getLogin());

        User user = userRepository.findByPhoneNumber(phoneNumber)
            .orElseThrow(() -> new RuntimeException("User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
          throw new RuntimeException("Wrong password");
        }
        return new AuthResponse(
            generateToken(user.getId(), "customer"),
            "customer",
            user.getName(),
            user.getId()
        );

      case "operator":
        Operator op = operatorRepository.findByLogin(request.getLogin())
            .orElseThrow(() -> new RuntimeException("Operator not found"));
        if (!passwordEncoder.matches(request.getPassword(), op.getPassword())) {
          throw new RuntimeException("Wrong password");
        }
        return new AuthResponse(
            generateToken(op.getId(), "operator"),
            "operator",
            op.getLogin(),
            0L
        );

      case "admin":
        Admin admin = adminRepository.findByLogin(request.getLogin())
            .orElseThrow(() -> new RuntimeException("Admin not found"));
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
          throw new RuntimeException("Wrong password");
        }
        return new AuthResponse(
            generateToken(admin.getId(), "admin"),
            "admin",
            admin.getLogin(),
            0L
        );

      default:
        throw new RuntimeException("Unknown role");
    }
  }

  private String generateToken(Long id, String role) {
    return Jwts.builder()
        .subject(id.toString())
        .claim("role", role)
        .issuedAt(new Date())
        .expiration(new Date(System.currentTimeMillis() + 86400000))
        .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
        .compact();
  }
}
