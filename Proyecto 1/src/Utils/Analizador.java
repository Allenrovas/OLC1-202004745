package Utils;

import java.io.File;
import java.io.FileInputStream;

public class Analizador {

    public Analizador() {
    }

    public void interpretar() {
        analizadores.Sintactico pars;
        try {
            pars = new analizadores.Sintactico(new analizadores.Lexico(new FileInputStream("entrada.txt")));
            pars.parse();
        } catch (Exception e) {
            System.out.println("Error en la compilacion");
        }

    }
}
