package com.coffee.loyalty.repository;

import com.coffee.loyalty.entity.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
  List<Transaction> findByUserIdOrderByTimestampDesc(Long userId);

  @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.type = :type")
  int sumByType(String type);

  @Modifying
  @Query("DELETE FROM Transaction")
  void deleteAllTransactions();
}
