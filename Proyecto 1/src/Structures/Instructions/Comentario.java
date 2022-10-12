package Structures.Instructions;

public class Comentario implements Instruccion {
    private final String comentario;
    public Comentario(String a) {
        comentario=a;
    }
    @Override
    public String traducir() {
        return "#"+comentario+"\n";
    }
    @Override
    public String traducirGo(){
        return comentario+"\n";
    }
}
