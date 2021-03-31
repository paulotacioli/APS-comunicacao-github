package com.example.websocketdemo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.websocketdemo.model.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
