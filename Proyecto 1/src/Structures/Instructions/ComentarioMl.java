package Structures.Instructions;

public class ComentarioMl implements Instruccion {
    private final String comentario;
    public ComentarioMl(String a) {
        comentario=a;
    }
    @Override
    public String traducir() {
        return "\"\"\""+comentario+"\"\"\""+"\n";
    }
    @Override
    public String traducirGo(){
        return comentario+"\n";
    }
}

