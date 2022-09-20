package Structures.Instructions;

public class Asignacion implements Instruccion {

    private final Operacion variable;
    private final Operacion valor;

    public Asignacion(Operacion a, Operacion b) {
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