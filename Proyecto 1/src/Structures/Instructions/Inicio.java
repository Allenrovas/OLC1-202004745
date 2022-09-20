package Structures.Instructions;

import java.util.LinkedList;
public class Inicio implements Instruccion {

    private final LinkedList<Instruccion> listaInstrucciones;

    public Inicio(LinkedList<Instruccion> b) {
        listaInstrucciones=b;
    }

    @Override
    public String traducir() {

        String traduccion = "def main():\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t"+ins.traducir();
            }
        }
        traduccion += "if __name__ == '__main__':\n" +"\tmain()";

        return traduccion;
    }

    @Override
    public String traducirGo() {
        String traduccion = "package main\n";
        traduccion += "import(\n" +"\"math\"\n"+"\"fmt\"\n"+")";


        traduccion += "func main() {\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += ins.traducirGo();
            }
        }
        traduccion += "}";

        return traduccion;
    }
}

