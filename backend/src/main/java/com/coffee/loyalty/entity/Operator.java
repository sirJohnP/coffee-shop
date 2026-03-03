package com.coffee.loyalty.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "operators")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Operator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String login;

    private String password;
}