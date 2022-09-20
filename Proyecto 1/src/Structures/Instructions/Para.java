package Structures.Instructions;

import java.util.LinkedList;

public class Para implements Instruccion {

    private final Operacion variable;
    private final Operacion valorInicial;
    private final Operacion valorFinal;
    private final Operacion valorIncremento;
    private final LinkedList<Instruccion> listaInstrucciones;
    public Para(Operacion a, Operacion b, Operacion c) {
        variable=a;
        valorInicial=b;
        valorFinal=c;
        valorIncremento=null;
        listaInstrucciones=null;
    }
    public Para(Operacion a, Operacion b, Operacion c,  LinkedList<Instruccion> d) {
        variable=a;
        valorInicial=b;
        valorFinal=c;
        listaInstrucciones=d;
        valorIncremento = null;
    }
    public Para(Operacion a, Operacion b, Operacion c, Operacion d, LinkedList<Instruccion> e) {
        variable=a;
        valorInicial=b;
        valorFinal=c;
        valorIncremento=d;
        listaInstrucciones=e;
    }
    public String traducir() {
        String traduccion = "";
        if (valorIncremento!= null){
            traduccion += "for "+this.variable.traducir()+" in range("+this.valorInicial.traducir()+","+this.valorFinal.traducir()+"):\n";
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducir();
            }
        }else {
            traduccion += "for "+this.variable.traducir()+" in range("+this.valorInicial.traducir()+","+this.valorFinal.traducir()+","+this.valorIncremento.traducir()+"):\n";
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducir();
            }
        }
        return traduccion;
    }
    public String traducirGo() {
        String traduccion = "";
        if (valorIncremento!= null){
            traduccion += "for "+this.variable.traducir()+":="+this.valorInicial.traducir()+";"+this.variable.traducir()+"<"+this.valorFinal.traducir()+";"+this.variable.traducir()+"++{\n";
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducirGo();
            }
            traduccion += "\n}";
        }else {
            traduccion += "for "+this.variable.traducir()+":="+this.valorInicial.traducir()+";"+this.variable.traducir()+"<"+this.valorFinal.traducir()+";"+this.variable.traducir()+"="+this.variable.traducir()+"+"+this.valorIncremento.traducir()+"{\n";
            for (Instruccion ins : listaInstrucciones) {
                traduccion += "\t" + ins.traducirGo();
            }
            traduccion += "\n}";
        }
        return traduccion;
    }
}

