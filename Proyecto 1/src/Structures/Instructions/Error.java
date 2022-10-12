package Structures.Instructions;

public class Error implements Instruccion{

    public Error() {
    }
    public Error(String a) {
    }

    @Override
    public String traducir() {
        return "#Error en la traduccion"+"\n";
    }
    @Override
    public String traducirGo() {
        return "//Error en la traduccion"+"\n";
    }
}