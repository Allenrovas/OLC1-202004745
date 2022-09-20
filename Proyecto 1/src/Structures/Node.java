package Structures;

import java.util.LinkedList;

public class Node {
    private LinkedList<Node> hijos;
    private String valor;

    public Node() {
    }

    public Node(LinkedList<Node> hijos, String valor) {
        this.hijos = hijos;
        this.valor = valor;
    }

    public Node(String valor) {
        this.valor = valor;
        this.hijos = new LinkedList<Node>();
    }

    public void addSon(String valor){
        this.hijos.add(new Node(null, valor));
    }

    public void addSon(Node valor){
        this.hijos.add(valor);
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    public LinkedList<Node> getHijos() {
        return hijos;
    }

    public void setHijos(LinkedList<Node> hijos) {
        this.hijos = hijos;
    }
}