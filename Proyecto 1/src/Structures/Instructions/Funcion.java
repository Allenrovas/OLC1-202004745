package Structures.Instructions;

import java.util.LinkedList;

public class Funcion implements Instruccion {
    private final String nombre;
    private LinkedList<Instruccion> instrucciones;
    private final String parametros;
    private final String tipo;
    public Funcion(String a, LinkedList<Instruccion> b, String c) {
        nombre=a;
        parametros=null;
        instrucciones=b;
        tipo=c;
    }
    public Funcion(String a, String b, LinkedList<Instruccion> c, String d) {
        nombre=a;
        parametros=b;
        instrucciones=null;
        tipo=d;
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
        String tipo1 = "";
        if (tipo.equals("numero")) {
            tipo1 = "int";
        } else if (tipo.equals("cadena")) {
            tipo1 = "string";
        } else if (tipo.equals("boolean")) {
            tipo1 = "bool";
        }

        String traduccion = "func "+nombre+"(";
        if(parametros != null) {
            traduccion += parametros;
        }
        traduccion += ")"+tipo1+ "{\n";
        if(instrucciones != null) {
            for (Instruccion ins : instrucciones) {
                traduccion += "\t" + ins.traducirGo()+"\n";
            }
        }
        traduccion += "\n}";
        return traduccion;
    }
}