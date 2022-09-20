package Structures.Instructions;

import java.util.LinkedList;

public class Repetir implements Instruccion{
    private final Operacion condicion;
    private final LinkedList<Instruccion> listaInstrucciones;

    public Repetir(Operacion a, LinkedList<Instruccion> b) {
        condicion=a;
        listaInstrucciones=b;
    }
    public Repetir(Operacion a) {
        condicion=a;
        listaInstrucciones=null;
    }

    @Override
    public String traducir() {

        String traduccion = "valor= true \nwhile ==true :\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducir();
            }
        }
        traduccion += "\tif valor= false:\n\tbreak";
        return traduccion;
    }

    @Override
    public String traducirGo(){
        String traduccion = "for true {\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducirGo();
            }
        }
        traduccion += "\t if("+this.condicion.traducirGo()+"){\n"+"break;\n"+"}\n";
        traduccion += "\n}";
        return traduccion;
    }
}
