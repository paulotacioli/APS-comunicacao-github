package com.example.websocketdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.websocketdemo.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	
	Usuario findByNome(String nome);
}
