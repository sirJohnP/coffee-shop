package com.coffee.loyalty.repository;

import com.coffee.loyalty.entity.Admin;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
  Optional<Admin> findByLogin(String login);
}
