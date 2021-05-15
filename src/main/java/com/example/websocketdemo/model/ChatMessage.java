package com.example.websocketdemo.model;

import java.io.File;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "tb_chat")
public class ChatMessage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    private String file;
	
    private MessageType type;
    
    private String content;
    
    private String sender;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


   

	public enum MessageType {
        CHAT,
        JOIN,
        LEAVE
    }

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setFile(String file) {
        this.file = file;
    }
    public String getFile() {
        return file;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

	@Override
	public String toString() {
		return "ChatMessage [id=" + id + ", file=" + file + ", type=" + type + ", content=" + content + ", sender="
				+ sender + "]";
	}
    
    
}
