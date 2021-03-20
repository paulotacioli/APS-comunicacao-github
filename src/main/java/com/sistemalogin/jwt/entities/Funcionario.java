package com.sistemalogin.jwt.entities;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
@Table(name = "tb_funcionario", uniqueConstraints=
@UniqueConstraint(columnNames={"cpf"}))
public class Funcionario implements Serializable {
	private static final long serialVersionUID = 1L;
	
		
	@NotEmpty
	private String nome;
	
	@NotEmpty
	private String email;
	
	@NotEmpty
	private String celular;
	
	@NotEmpty
	private String senha;	
	
	@NotEmpty
	private String senhaConfirm;
	@Id
	@NotNull
	private Long cpf;

	@OneToOne(mappedBy = "funcionario", cascade = CascadeType.ALL)
	@JsonIgnore
	private Login login;
	
	
	
	public Funcionario() {
	}
	

	public Funcionario( String nome, String email, String celular, String senha, String senhaConfirm,
			 Long cpf) {
		super();
	
		this.nome = nome;
		this.email = email;
		this.celular = celular;
		this.senha = senha;
		this.senhaConfirm = senhaConfirm;
		this.cpf = cpf;
	}
	

	public String getNome() {
		return nome;
	}


	public void setNome(String nome) {
		this.nome = nome;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}

	public String getCelular() {
		return celular;
	}


	public void setCelular(String celular) {
		this.celular = celular;
	}


	public String getSenha() {
		return senha;
	}


	public void setSenha(String senha) {
		this.senha = senha;
	}


	public String getSenhaConfirm() {
		return senhaConfirm;
	}


	public void setSenhaConfirm(String senhaConfirm) {
		this.senhaConfirm = senhaConfirm;
	}

	public Long getCpf() {
		return cpf;
	}


	public void setCpf(Long cpf) {
		this.cpf = cpf;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public Login getLogin() {
		return login;
	}


	public void setLogin(Login login) {
		this.login = login;
	}
}
