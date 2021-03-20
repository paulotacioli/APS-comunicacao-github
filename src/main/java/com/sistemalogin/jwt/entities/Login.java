package com.sistemalogin.jwt.entities;

	import java.io.Serializable;

	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;
	import javax.persistence.MapsId;
	import javax.persistence.OneToOne;
	import javax.persistence.Table;

	import com.fasterxml.jackson.annotation.JsonIgnore;

	@Entity
	@Table (name = "tb_login")

	public class Login implements Serializable {
		private static final long serialVersionUID = 1L; 
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long Id;
		
		
		private String senha;

		@JsonIgnore
		@OneToOne
		@MapsId
		private Funcionario funcionario;
		

		public Login () {
			
		}
		
		public Login(String senha, Funcionario funcionario) {
			super();
			this.senha = senha;
			this.funcionario = funcionario;
		}
		
		public Long getId() {
			return Id;
		}

		public void setId(Long id) {
			Id = id;
		}

		public String getSenha() {
			return senha;
		}

		public void setSenha(String senha) {
			this.senha = senha;
		}

		public Funcionario getFuncionario() {
			return funcionario;
		}

		public void setFuncionario(Funcionario funcionario) {
			this.funcionario = funcionario;
		}

		

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((Id == null) ? 0 : Id.hashCode());
			result = prime * result + ((senha == null) ? 0 : senha.hashCode());
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			Login other = (Login) obj;
			if (Id == null) {
				if (other.Id != null)
					return false;
			} else if (!Id.equals(other.Id))
				return false;
			if (senha == null) {
				if (other.senha != null)
					return false;
			} else if (!senha.equals(other.senha))
				return false;
			return true;
		}

		

	}
