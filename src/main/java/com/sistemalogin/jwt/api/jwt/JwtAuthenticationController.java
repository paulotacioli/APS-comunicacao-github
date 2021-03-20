package com.sistemalogin.jwt.api.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.sistemalogin.jwt.entities.Funcionario;
import com.sistemalogin.jwt.entities.Login;
import com.sistemalogin.jwt.services.FuncionarioService;
import com.sistemalogin.jwt.services.LoginService;
import com.sistemalogin.jwt.services.exceptions.ErroNaoMapeadoException;
import com.sistemalogin.jwt.services.exceptions.UsuarioInvalidoException;

@RestController
@CrossOrigin
@EnableWebSecurity
public class JwtAuthenticationController {
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private LoginService loginService;
	@Autowired
	private FuncionarioService funcionarioService;
	
	private Funcionario funcionario;

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
		System.out.println("Aqui entrou no public responseEntity /authenticate");
		funcionario = new Funcionario ();
		
		funcionario = funcionarioService.findById(authenticationRequest.getCpf());
		
		authenticate1(authenticationRequest.getCpf(), authenticationRequest.getSenha());
		final Login login = loginService.findByCpf(authenticationRequest.getCpf());
		final String token = jwtTokenUtil.generateToken(login);
		return ResponseEntity.ok(new JwtResponse(token));
	}

	private void authenticate1(Long cpf, String senha) throws Exception {
		System.out.println("Aqui entrou authenticate1 (long cpf, string senha)");
		
		try {
			
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(cpf, senha));
			
			
			
		} catch (DisabledException e) {

			throw new Exception("USER_DISABLED", e);
			
		} catch (BadCredentialsException e) {
			throw new UsuarioInvalidoException("");
		} catch (RuntimeException e) {
			e.printStackTrace();
//			throw new ErroNaoMapeadoException ("");
		}
	}
}