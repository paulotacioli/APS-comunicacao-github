package com.sistemalogin.jwt.services.exceptions;

public class ValidacaoTamanhoSenhaException extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public ValidacaoTamanhoSenhaException (String msg) {
		super (msg);
	}
}
