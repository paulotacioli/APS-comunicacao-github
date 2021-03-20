package com.sistemalogin.jwt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionSystemException;

import com.sistemalogin.jwt.entities.Funcionario;
import com.sistemalogin.jwt.repositores.FuncionarioRepository;
import com.sistemalogin.jwt.repositores.LoginRepository;
import com.sistemalogin.jwt.services.exceptions.DatabaseException;
import com.sistemalogin.jwt.services.exceptions.ResourceNotFoundException;
import com.sistemalogin.jwt.services.exceptions.SenhasDiferentesException;
import com.sistemalogin.jwt.services.exceptions.ValidacaoTamanhoSenhaException;
import com.sistemalogin.jwt.services.exceptions.ViolationException;

@Service
public class FuncionarioService {

	@Autowired
	private FuncionarioRepository repository;

	@Autowired
	private LoginService loginService;

	@Autowired
	private LoginRepository loginRepository;
	

	public List<Funcionario> findAll() {
		return repository.findAll();

	}

	public Funcionario findById(Long id) {
		Optional<Funcionario> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ResourceNotFoundException(id));
	}

	public Funcionario insert(Funcionario obj) {

		if (obj.getSenha().toString().equals(obj.getSenhaConfirm().toString())) {

			if (repository.existsById(obj.getCpf())) {

				throw new DatabaseException(obj.getCpf().toString());
			} else {

				if (obj.getSenha().length() > 5) {

					try {

						Funcionario objEcp = new Funcionario();

						objEcp = obj;
						objEcp.setSenha(new BCryptPasswordEncoder().encode(obj.getSenha()));
						objEcp.setSenhaConfirm(new BCryptPasswordEncoder().encode(obj.getSenhaConfirm()));
						loginService.saveLoginFuncionario(objEcp);
						System.out.println("Salvou no login service!");

						repository.save(obj);

						repository.save(objEcp);

					} catch (TransactionSystemException e) {
						System.out.println("2");

						e.printStackTrace();
						e.getCause().getStackTrace();
						throw new ViolationException(obj, e.getMostSpecificCause().toString());
					} catch (JpaSystemException e) {
						System.out.println("3");

						e.printStackTrace();
						throw new ViolationException(obj, e.getMostSpecificCause().toString());
					} catch (RuntimeException e) {
						e.printStackTrace();
					}
				} else {

					throw new ValidacaoTamanhoSenhaException("A senha deve conter no maximo 6 caracteres!");
				}
			}

		} else {
			throw new SenhasDiferentesException("Senhas no cadastro de corretores nao estao iguais.");
		}

		return obj;
	}
}
