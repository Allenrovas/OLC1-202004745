package Structures.Instructions;

public class Retorno implements Instruccion {
    private final Operacion valor;

    public Retorno(Operacion a) {
        valor=a;
    }

    @Override
    public String traducir() {
        return "return "+valor.traducir()+"\n";
    }
    @Override
    public String traducirGo() {
        return "return "+valor.traducirGo()+"\n";
    }
}

