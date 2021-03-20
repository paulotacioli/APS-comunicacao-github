package com.sistemalogin.jwt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.sistemalogin.jwt.entities.Funcionario;
import com.sistemalogin.jwt.entities.Login;
import com.sistemalogin.jwt.repositores.LoginRepository;
import com.sistemalogin.jwt.services.exceptions.DatabaseException;
import com.sistemalogin.jwt.services.exceptions.ResourceNotFoundException;

@Service
public class LoginService implements UserDetailsService {
	
	@Autowired
	private LoginRepository repository;

	public List<Login> findAll(){
		return repository.findAll();	

	}
	
	public Login findById(Long id) {
		Optional<Login> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}
	
	public Login insert(Login obj) {
			return repository.save(obj);
	}
	
	public Login findByCpf(Long cpf) {
		Optional<Login> obj = repository.findById(cpf);

		return obj.orElseThrow(() -> new ResourceNotFoundException(cpf));
	}

	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		  Login login = findByCpf(Long.parseLong(username));
		  
		  
		  System.out.println("TEMOS 40:"+ login.getId().toString());

		  UserBuilder builder = null;
		  if (login != null) {
		      builder = org.springframework.security.core.userdetails.User.withUsername(username);
		      builder.password(login.getSenha());
		      
		      builder.roles("USUARIO");
		      
		    } else {
		      throw new UsernameNotFoundException("User not found.");
		    }

		    return builder.build();
		  }
	
		public void saveLoginFuncionario(Funcionario obj) {
			Login login = new Login();
				login.setFuncionario(obj);
				login.setSenha(obj.getSenha());
				
				repository.save(login);
			}
		
	}
