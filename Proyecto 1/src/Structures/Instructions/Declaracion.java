package Structures.Instructions;

public class Declaracion implements Instruccion {

    private final Operacion variable;
    private final Operacion valor;

    public Declaracion(Operacion a, Operacion b) {
        variable=a;
        valor=b;
    }
    @Override
    public String traducir() {
        return this.variable.traducir()+" = "+this.valor.traducir()+"\n";
    }
    @Override
    public String traducirGo() {
        return this.variable.traducirGo()+" = "+this.valor.traducirGo()+";\n";
    }
}
