package com.example.websocketdemo.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.model.Usuario;

/**
 * Created by rajeevkumarsingh on 24/07/17.
 */
@Controller
public class UsuarioController {

    @MessageMapping("/criarUser")
    @SendTo("/topic/public")
    public Usuario sendMessage(@Payload Usuario usuario) {
    	System.out.println("Entrou aqui");
        return usuario;
    }

}
