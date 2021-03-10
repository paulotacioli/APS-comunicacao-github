import java.io.PrintStream;
import java.net.Socket;

public class Cliente {

	public static void main(String[] args) {
		
		try {
		//Declarar o socket cliente
		Socket cliente = new Socket("127.0.0.1", 7000);
		
		//IP DO windows 192.168.1.107
		//IP DO MAC 192.168.1.106
		
		System.out.println("Cliente iniciado");
		
		// Fluxo de dados pra envio 
		PrintStream ps = new PrintStream(cliente.getOutputStream());
		
		ps.println("Oi, Prof. Miltin aqui : " + (int) (Math.random()*10000));
		
		cliente.close();
		System.out.println("Cliente finalizado");
		
		} catch (Exception e) {
			System.out.println("Ocorreu um erro durante a conexao");
		}
		 

	}

}
