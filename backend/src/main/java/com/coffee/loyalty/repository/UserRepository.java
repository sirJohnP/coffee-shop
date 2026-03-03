package com.coffee.loyalty.repository;

import com.coffee.loyalty.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByPhoneNumber(String phoneNumber);

  @Modifying
  @Query("UPDATE User u SET u.balance = 0")
  void updateAllBalancesToZero();

  boolean existsByPhoneNumber(String phoneNumber);

  @Query("SELECT COUNT(u) FROM User u WHERE u.balance > 0")
  Integer countActiveUsers();
}
