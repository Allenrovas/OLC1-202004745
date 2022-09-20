package Structures.Instructions;

public class Ejecutar implements Instruccion{
    private final String nombre;
    private final String parametros;

    public Ejecutar(String a, String b) {
        nombre=a;
        parametros=b;
    }
    public Ejecutar(String a) {
        nombre=a;
        parametros=null;
    }

    @Override
    public String traducir() {
        String traduccion = nombre+"(";
        if(parametros != null) {
            traduccion += parametros;
        }
        traduccion += ")\n";
        return traduccion;
    }
    @Override
    public String traducirGo() {
        String traduccion = nombre+"(";
        if(parametros != null) {
            traduccion += parametros;
        }
        traduccion += ")\n";
        return traduccion;
    }
}
