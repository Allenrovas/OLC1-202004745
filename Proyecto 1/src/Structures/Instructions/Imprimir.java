package Structures.Instructions;

public class Imprimir implements Instruccion {
    private final Operacion operacion;

    public Imprimir(Operacion a) {
        operacion=a;
    }

    @Override
    public String traducir() {
        return "print("+this.operacion.traducir()+")";
    }
    @Override
    public String traducirGo(){
        return "fmt.Println("+this.operacion.traducirGo()+")";
    }
}
