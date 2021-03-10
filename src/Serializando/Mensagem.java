package Serializando;

import java.io.Serializable;
import java.util.UUID;

public class Mensagem implements Serializable {
	public String nome;
	public String msg;
	private String token;
	
	Mensagem (String nomeUsuario, String mensagem) {
		this.nome = nomeUsuario;
		this.msg = mensagem;
	}
	
	public void TokenServer () {
		this.token = UUID.randomUUID().toString();
	}
	
	public String toString() {
		return this.nome + "\t" + " msg: " + this.msg + "\t" + " token: " + this.token;
	}

}
