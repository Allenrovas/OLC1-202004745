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
        return variable.traducir()+" = "+valor.traducir()+";\n";
    }
    @Override
    public String traducirGo() {
        return variable.traducirGo()+" = "+valor.traducirGo()+";\n";
    }
}
