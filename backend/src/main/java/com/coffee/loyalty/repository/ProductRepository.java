package com.coffee.loyalty.repository;

import com.coffee.loyalty.entity.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {
  @Query(value = "SELECT * FROM products WHERE price <= :balance ORDER BY price DESC LIMIT 4", nativeQuery = true)
  List<Product> getAvailableProducts(@Param("balance") Long balance);
}
