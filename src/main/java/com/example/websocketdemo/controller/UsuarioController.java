package com.example.websocketdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.websocketdemo.model.Usuario;
import com.example.websocketdemo.service.UsuarioService;

/**
 * Created by rajeevkumarsingh on 24/07/17.
 */
@Controller
@RequestMapping("/usuario")
public class UsuarioController {
     
	@Autowired
	private UsuarioService service;
    
    @RequestMapping(value = "/cadastrar",  method =  RequestMethod.POST)
    public Usuario addUsuario(@RequestBody Usuario usuario ) {
    	usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
    	service.insert(usuario);

    	
    	System.out.println("ENTROUUUUUUUUUUUUUUUUUUUUUUUU" + usuario.toString());

    	return usuario;
    }
    
    @RequestMapping(value = "/authenticate",  method =  RequestMethod.POST)
    public String autenticar(@RequestBody Usuario usuario ) {
    	System.out.println("entrou no authenticate do resource");
    	return service.authenticate(usuario);

    	


    }
    
}
