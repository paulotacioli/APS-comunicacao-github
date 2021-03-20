package com.sistemalogin.jwt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.sistemalogin.jwt.repositores.FuncionarioRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner{
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@Override
	public void run(String... args) throws Exception {
		


//		Funcionario f1 = new Funcionario( "Maria Clara", "Mariaclara@gmail.com", "111111", "1234", "1234", "Descrição Maria", "cpfMaria", 0, 0, func1);
//		Funcionario f2 = new Funcionario("Paulo Tacioli", "Paulo@gmail.com", "111111", "123", "123", "descricao Paulo", "CpfPaulo", 0, 0, func3);
//		
//
//
//		funcionarioRepository.saveAll(Arrays.asList(f1, f2));
//		
	}

}
