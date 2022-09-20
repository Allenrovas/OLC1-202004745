package Structures.Instructions;

import java.util.LinkedList;

public class Mientras implements Instruccion{
    private final Operacion condicion;
    private final LinkedList<Instruccion> listaInstrucciones;

    public Mientras(Operacion a, LinkedList<Instruccion> b) {
        condicion=a;
        listaInstrucciones=b;
    }
    public Mientras(Operacion a) {
        condicion=a;
        listaInstrucciones=null;
    }

    @Override
    public String traducir() {
        String traduccion = "while "+this.condicion.traducir()+" :\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducir();
            }
        }
        return traduccion;
    }
    @Override
    public String traducirGo(){
        String traduccion = "for true {\n";
        traduccion += "\t if !("+this.condicion.traducirGo()+"){\n"+"break\n"+"}\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducirGo();
            }
        }
        traduccion += "\n}";
        return traduccion;
    }
}
