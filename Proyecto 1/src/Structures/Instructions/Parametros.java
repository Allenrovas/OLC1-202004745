package Structures.Instructions;

import java.util.LinkedList;

public class Parametros implements Instruccion {
    private final String nombre;
    private final String tipo;
    private final LinkedList<Instruccion> listaParametros;

    public Parametros(String a, String b, LinkedList<Instruccion> c) {
        nombre=a;
        tipo=b;
        listaParametros=c;
    }

    public Parametros(String a, String b) {
        nombre=a;
        tipo=b;
        listaParametros=null;
    }

    @Override
    public String traducir() {
        String traduccion = this.nombre;

        return traduccion;
    }
    @Override
    public String traducirGo(){
        String traduccion = "";
        if(tipo.equals("boolen")){
            traduccion += this.nombre+" bool";
        } else if (tipo.equals("numero")){
            traduccion += this.nombre+" float64";
        } else if (tipo.equals("cadena")){
            traduccion += this.nombre+" string";
        } else if (tipo.equals("caracter")){
            traduccion += this.nombre+" byte";
        }
        if(listaParametros != null){
            for(Instruccion ins: listaParametros){
                traduccion += ","+ins.traducirGo();
            }
        }
        return traduccion;
    }
}
