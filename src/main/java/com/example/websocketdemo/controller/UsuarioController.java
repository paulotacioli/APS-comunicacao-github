package com.example.websocketdemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.websocketdemo.model.Usuario;

/**
 * Created by rajeevkumarsingh on 24/07/17.
 */
@Controller
@RequestMapping("/usuario")
public class UsuarioController {
     
    
    @RequestMapping(value = "/cadastrar",  method =  RequestMethod.POST)
    public Usuario addUsuario(@RequestBody Usuario usuario ) {

		return usuario;
    }

}
