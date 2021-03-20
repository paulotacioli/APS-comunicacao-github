package com.sistemalogin.jwt.repositores;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemalogin.jwt.entities.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{

	boolean existsById(Long cpf);

	Funcionario findByCpf(Long cpf); 

}
