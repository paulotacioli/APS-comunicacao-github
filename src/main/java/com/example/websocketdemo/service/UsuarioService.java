package com.example.websocketdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.websocketdemo.model.Usuario;
import com.example.websocketdemo.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;

	public List<Usuario> findAll() {
		return repository.findAll();

	}

	public String authenticate(Usuario obj) {
		Usuario user = new Usuario();
		user = repository.findByNome(obj.getNome());

		BCryptPasswordEncoder b = new BCryptPasswordEncoder();
		if (user == null) {
			System.out.println("entrou no usuario nao existe");
			return "Usuario não existe!";
		}

		if (b.matches(obj.getSenha(), user.getSenha()) == true) {
			System.out.println("entrou no senha é igual a outra senha!");
			return "true";

		} else {
			System.out.println("entrou no senha invalida do login");
			return "Senha invalida!";
		}

	}

	public Usuario insert(Usuario usuario) {
		return repository.save(usuario);
	}

}
