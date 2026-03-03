package com.coffee.loyalty.repository;

import com.coffee.loyalty.entity.Operator;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperatorRepository extends JpaRepository<Operator, Long> {
  Optional<Operator> findByLogin(String login);
}
