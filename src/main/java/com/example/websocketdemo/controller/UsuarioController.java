package com.example.websocketdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.websocketdemo.model.Usuario;
import com.example.websocketdemo.service.UsuarioService;


@Controller
@RequestMapping("/usuario")
public class UsuarioController {
     
	@Autowired
	private UsuarioService service;
    
    @RequestMapping(value = "/cadastrar",  method =  RequestMethod.POST)
    public ResponseEntity<Usuario> addUsuario(@RequestBody Usuario usuario ) {
    	usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
    	service.insert(usuario);

    	
    	System.out.println("ENTROUUUUUUUUUUUUUUUUUUUUUUUU" + usuario.toString());

    	return ResponseEntity.ok().body(usuario);   
    }
    
    @RequestMapping(value = "/authenticate",  method =  RequestMethod.POST)
    public ResponseEntity<String> autenticar(@RequestBody Usuario usuario ) {
    	System.out.println("entrou no authenticate do resource");
    	String response = "";
    	response = service.authenticate(usuario);
    	
		return ResponseEntity.ok().body(response);

    }
    
	@RequestMapping(value = "/editar",  method =  RequestMethod.POST)
    public ResponseEntity<Usuario> editarSenha(@RequestBody Usuario obj ) {
		System.out.println("editar usuario obj"+ obj);
		obj = service.editarSenha(obj);
		return ResponseEntity.ok().body(obj);
	 
	}
    
}
