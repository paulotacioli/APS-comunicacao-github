package com.sistemalogin.jwt.repositores;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemalogin.jwt.entities.Login;

public interface LoginRepository extends JpaRepository<Login, Long>{

}
