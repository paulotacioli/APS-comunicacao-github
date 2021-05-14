package com.example.websocketdemo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.websocketdemo.model.ChatMessage;
import com.example.websocketdemo.repository.ChatMessageRepository;

@Service
public class ChatService {
	
	@Autowired
	private ChatMessageRepository repository;

	public List<ChatMessage> findAll() {
		return repository.findAll();

	}
	

}
