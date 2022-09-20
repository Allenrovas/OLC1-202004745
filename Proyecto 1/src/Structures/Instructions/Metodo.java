package Structures.Instructions;

import java.util.LinkedList;

public class Metodo implements Instruccion {
    private final String nombre;
    private LinkedList<Instruccion> instrucciones;
    private final String parametros;
    public Metodo(String a, LinkedList<Instruccion> b) {
        nombre=a;
        parametros=null;
        instrucciones=b;
    }
    public Metodo(String a, String b, LinkedList<Instruccion> c) {
        nombre=a;
        parametros=b;
        instrucciones=null;
    }
    @Override
    public String traducir() {
        String traduccion = "def "+nombre+"(";
        if(parametros != null) {
            traduccion += parametros;
        }
        traduccion += ") :\n";
        if(instrucciones != null) {
            for (Instruccion ins : instrucciones) {
                traduccion += "\t" + ins.traducir()+"\n";
            }
        }
        return traduccion;
    }

    @Override
    public String traducirGo() {
        String traduccion = "func "+nombre+"(";
        if(parametros != null) {
            traduccion += parametros;
        }
        traduccion += ") {\n";
        if(instrucciones != null) {
            for (Instruccion ins : instrucciones) {
                traduccion += "\t" + ins.traducirGo()+"\n";
            }
        }
        traduccion += "\n}";
        return traduccion;
    }
}
