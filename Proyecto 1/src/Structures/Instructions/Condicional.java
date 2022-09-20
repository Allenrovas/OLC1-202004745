package Structures.Instructions;
import java.util.LinkedList;

public class Condicional implements Instruccion {
    private final Operacion condicion;
    private final LinkedList<Instruccion> listaInstrucciones;
    private LinkedList<Instruccion> listaElseIfInstrucciones;
    private LinkedList<Instruccion> listaInsElse;
    public Condicional(Operacion a, LinkedList<Instruccion> b) {
        condicion=a;
        listaInstrucciones=b;
    }
    public Condicional(Operacion a, LinkedList<Instruccion> b, LinkedList<Instruccion> c) {
        condicion=a;
        listaInstrucciones=b;
        listaInsElse=c;
    }
    public Condicional(Operacion a, LinkedList<Instruccion> b, LinkedList<Instruccion> l, LinkedList<Instruccion> c) {
        condicion=a;
        listaInstrucciones=b;
        listaElseIfInstrucciones = l;
        listaInsElse=c;
    }

    @Override
    public String traducir() {

        String traduccion = "if "+this.condicion.traducir()+" :\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducir()+"\n";
            }
        }
        if(listaElseIfInstrucciones != null){
            traduccion += "elif "+this.condicion.traducir()+" :\n";
            for(Instruccion ins: listaElseIfInstrucciones){
                traduccion += "\t"+ins.traducir()+"\n";;
            }
        }
        if(listaInsElse != null){
            traduccion += "else: \n";
            for(Instruccion ins: listaInsElse){
                traduccion += "\t"+ins.traducir()+"\n";;
            }
        }
        return traduccion;
    }
    @Override
    public String traducirGo(){
        String traduccion = "if"+this.condicion.traducirGo()+"{\n";
        if(listaInstrucciones != null) {
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducirGo()+"\n";;
            }
            traduccion += "\n}";
        }
        if(listaElseIfInstrucciones != null){
            traduccion += "else if"+this.condicion.traducirGo()+"{\n";
            for(Instruccion ins: listaElseIfInstrucciones){
                traduccion += "\t"+ins.traducirGo()+"\n";;
            }
            traduccion += "\n}";
        }
        if(listaInsElse != null){
            traduccion += "else{\n";
            for(Instruccion ins: listaInsElse){
                traduccion += "\t"+ins.traducirGo()+"\n";;
            }
            traduccion += "\n}";
        }
        return traduccion;
    }
}


