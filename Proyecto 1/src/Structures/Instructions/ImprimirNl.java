package Structures.Instructions;

public class ImprimirNl implements Instruccion {
    private final Operacion operacion;

    public ImprimirNl(Operacion a) {
        operacion=a;
    }

    @Override
    public String traducir() {
        String traduccion = "print("+this.operacion.traducir()+")\n";
        return traduccion;
    }
    @Override
    public String traducirGo(){
        return "fmt.Println("+this.operacion.traducirGo()+")\n";
    }
}
