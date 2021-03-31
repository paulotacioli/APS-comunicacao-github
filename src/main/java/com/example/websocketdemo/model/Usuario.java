package com.example.websocketdemo.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by rajeevkumarsingh on 24/07/17.
 */
@Entity
@Table(name = "tb_usuario")
public class Usuario {
	@Id
	@NotEmpty
	private String nome;
	

	
	@NotEmpty
	private String senha;



	public String getNome() {
		return nome;
	}



	public void setNome(String nome) {
		this.nome = nome;
	}



	public String getSenha() {
		return senha;
	}



	public void setSenha(String senha) {
		this.senha = senha;
	}	
	

	


	

}
