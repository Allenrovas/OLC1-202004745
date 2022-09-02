package principal_UI;


import Utils.Analizador;

public class Main {
    public static void main(String[] args) {
        Principal p = new Principal();
        p.setVisible(true);
        Analizador a = new Analizador();
        a.interpretar();
    }
}