package Structures.Instructions;

import java.util.LinkedList;

public class Seleccion implements Instruccion {
    private final Operacion condicion;
    private final LinkedList<Instruccion> listaInstrucciones;
    private LinkedList<Instruccion> listaElseIfInstrucciones;
    private LinkedList<Instruccion> listaInsElse;
    public Seleccion(Operacion a, LinkedList<Instruccion> b) {
        condicion=a;
        listaInstrucciones=b;
    }
    public Seleccion(Operacion a, LinkedList<Instruccion> b, LinkedList<Instruccion> c) {
        condicion=a;
        listaInstrucciones=b;
        listaInsElse=c;
    }
    public Seleccion(Operacion a, LinkedList<Instruccion> b, LinkedList<Instruccion> l, LinkedList<Instruccion> c) {
        condicion=a;
        listaInstrucciones=b;
        listaElseIfInstrucciones = l;
        listaInsElse=c;
    }
    @Override
    public String traducir() {

        String traduccion = "if "+this.condicion.traducir()+" ==:\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducir();
            }
        }
        if(listaElseIfInstrucciones != null){
            traduccion += "elif "+this.condicion.traducir()+" ==:\n";
            for(Instruccion ins: listaElseIfInstrucciones){
                traduccion += "\t"+ins.traducir();
            }
        }
        if(listaInsElse != null){
            traduccion += "else: \n";
            for(Instruccion ins: listaInsElse){
                traduccion += "\t"+ins.traducir();
            }
        }
        return traduccion;
    }
    @Override
    public String traducirGo(){
        String traduccion = "if"+this.condicion.traducirGo()+"{\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducirGo();
            }
            traduccion += "\n}";
        }
        if(listaElseIfInstrucciones != null){
            traduccion += "else if"+this.condicion.traducirGo()+"{\n";
            for(Instruccion ins: listaElseIfInstrucciones){
                traduccion += "\t"+ins.traducirGo();
            }
            traduccion += "\n}";
        }
        if(listaInsElse != null){
            traduccion += "else{\n";
            for(Instruccion ins: listaInsElse){
                traduccion += "\t"+ins.traducirGo();
            }
            traduccion += "\n}";
        }
        return traduccion;
    }
}

