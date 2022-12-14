package Structures;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;


public class Arbol {
    private Node raiz;

    public Arbol() {
    }

    public Arbol(Node raiz) {
        this.raiz = raiz;
    }

    public Node getRaiz() {
        return raiz;
    }

    public void setRaiz(Node raiz) {
        this.raiz = raiz;
    }

    public void graficar(){
        StringBuilder s = new StringBuilder();
        s.append("digraph G{\n");
        s.append("\"node").append(raiz.hashCode()).append("\" [ label = \"").append(raiz.getValor()).append("\",];\n");
        graficar(raiz, s);
        s.append("}");
        System.out.println(s.toString());
        try {
            File archivo = new File("grafo1.txt");
            BufferedWriter bw;
            if (archivo.exists()) {
                bw = new BufferedWriter(new FileWriter(archivo));
                bw.write(s.toString());
            } else {
                bw = new BufferedWriter(new FileWriter(archivo));
                bw.write(s.toString());
            }
            bw.close();
        } catch (IOException e) {
        }
    }

    public void graficar(Node raiz, StringBuilder s){
        LinkedList<Node> hijos = raiz.getHijos();
        if(hijos != null){
            for(Node hijo: hijos){
                s.append("\"node").append(hijo.hashCode()).append("\" [ label = \"").append(hijo.getValor()).append("\",];\n");
                graficar(hijo, s);
                s.append("\"node").append(raiz.hashCode()).append("\" -> \"node").append(hijo.hashCode()).append("\" [ label = \"\",];\n");
            }
        }
    }
}