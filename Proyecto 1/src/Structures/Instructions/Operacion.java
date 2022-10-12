package Structures.Instructions;

import java.util.ArrayList;
import java.util.LinkedList;

public class Operacion implements Instruccion {

    public static enum Tipo_operacion{
        NEGATIVO,
        SUMA,
        RESTA,
        MULTIPLICACION,
        DIVISION,
        MODULO,
        POTENCIA,
        mayor,
        menor,
        mayor_o_igual,
        menor_o_igual,
        igual,
        es_igual,
        es_diferente,
        or,
        and,
        NUMERO,
        NOT,
        VARIABLE,
        CADENA,
        CARACTER,
        CARACTER_ASCII,
        VERDADERO,
        FALSO,
        CONCATENACION
    }

    private Tipo_operacion tipo;
    private Operacion operadorIzq;
    private Operacion operadorDer;


    private Object valor;
    public Operacion(Operacion operadorIzq, Operacion operadorDer, Tipo_operacion tipo) {
        this.tipo = tipo;
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
    }

    public Operacion(Operacion operadorIzq, Tipo_operacion tipo) {
        this.tipo = tipo;
        this.operadorIzq = operadorIzq;
    }

    public Operacion(String a, Tipo_operacion tipo) {
        this.valor=a;
        this.tipo = tipo;
    }

    @Override
    public String traducir() {
        if(tipo== Tipo_operacion.DIVISION){
            return operadorIzq.traducir() + "/" + operadorDer.traducir();
        }else if(tipo== Tipo_operacion.MULTIPLICACION){
            return operadorIzq.traducir() + "*" + operadorDer.traducir();
        }else if(tipo== Tipo_operacion.RESTA){
            return operadorIzq.traducir() + "-" + operadorDer.traducir();
        }else if(tipo== Tipo_operacion.SUMA){
            return operadorIzq.traducir() + "+" + operadorDer.traducir();
        }else if(tipo== Tipo_operacion.NEGATIVO){
            return "-" + operadorIzq.traducir();
        }else if (tipo== Tipo_operacion.POTENCIA){
            return operadorIzq.traducir() + "**" + operadorDer.traducir();
        }else if (tipo== Tipo_operacion.MODULO){
            return operadorIzq.traducir() + "%" + operadorDer.traducir();
        }
        /* ======== OPERACIONES UNARIOS ======== */
        else if(tipo == Tipo_operacion.NUMERO){
            return valor.toString();
        }else if(tipo == Tipo_operacion.VARIABLE){
            return valor.toString();
        }else if(tipo == Tipo_operacion.CADENA){
            return valor.toString();
        }else if(tipo == Tipo_operacion.CARACTER){
            return this.valor.toString();
        } else if(tipo == Tipo_operacion.CARACTER_ASCII){
            String a = this.valor.toString();
            a = a.replace("'","");
            a = a.replace("$","");
            a = a.replace("{","");
            a = a.replace("}","");
            String caracter = Character.toString((char) Integer.parseInt(a));
            caracter = "'" + caracter + "'";
            return caracter;
        } else if(tipo == Tipo_operacion.VERDADERO){
            String a = "true";
            return a;
        } else if (tipo == Tipo_operacion.FALSO){
            String a = "false";
            return a;
        }
        /* ======== OPERACIONES RELACIONALES ======== */
        else if(tipo== Tipo_operacion.NOT){
            return operadorIzq.traducir()+ "not" + operadorDer.traducir();
        }else if(tipo== Tipo_operacion.and){
            return operadorIzq.traducir()+ "and" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.or){
            return operadorIzq.traducir()+ "or" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.es_igual){
            return operadorIzq.traducir()+ "==" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.es_diferente){
            return operadorIzq.traducir()+ "!=" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.mayor){
            return operadorIzq.traducir()+ ">" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.menor){
            return operadorIzq.traducir()+ "<" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.mayor_o_igual){
            return operadorIzq.traducir()+ ">=" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.menor_o_igual){
            return operadorIzq.traducir()+ "<=" +operadorDer.traducir();
        }else if(tipo== Tipo_operacion.CONCATENACION){
            return operadorIzq.traducir().toString() +"+"+operadorDer.traducir().toString();
        }


        else{
            return "";
        }
    }

    @Override
    public String traducirGo() {
        if(tipo== Tipo_operacion.DIVISION){
            return operadorIzq.traducirGo() + "/" + operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.MULTIPLICACION){
            return operadorIzq.traducirGo() + "*" + operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.RESTA){
            return operadorIzq.traducirGo() + "-" + operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.SUMA){
            return operadorIzq.traducirGo() + "+" + operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.NEGATIVO){
            return "-" + operadorIzq.traducirGo();
        }else if (tipo== Tipo_operacion.POTENCIA){
            return "math.Pow(float64("+operadorIzq.traducirGo() + "),float64(" + operadorDer.traducirGo()+"))";
        }else if (tipo== Tipo_operacion.MODULO){
            return operadorIzq.traducirGo() + "%" + operadorDer.traducirGo();
        }
        /* ======== OPERACIONES UNARIOS ======== */
        else if(tipo == Tipo_operacion.NUMERO){
            return valor.toString();
        }else if(tipo == Tipo_operacion.VARIABLE){
            try {
                String var = valor.toString();
                String [] variables = var.split(",");
                String variable = "";
                for (int i = 0; i < variables.length; i++) {
                    variable += "var "+variables[i];
                }
                return variable.toString();
            }catch (Exception e) {
                return "var "+valor.toString();
            }
        }else if(tipo == Tipo_operacion.CADENA){
            return valor.toString();
        }else if(tipo == Tipo_operacion.CARACTER){
            return this.valor.toString();
        } else if(tipo == Tipo_operacion.CARACTER_ASCII){
            String a = this.valor.toString();
            a = a.replace("'","");
            a = a.replace("$","");
            a = a.replace("{","");
            a = a.replace("}","");
            String caracter = Character.toString((char) Integer.parseInt(a));
            caracter = "'" + caracter + "'";
            return caracter;
        } else if(tipo == Tipo_operacion.VERDADERO){
            String a = "true";
            return a;
        } else if (tipo == Tipo_operacion.FALSO){
            String a = "false";
            return a;
        }
        /* ======== OPERACIONES RELACIONALES ======== */
        else if(tipo== Tipo_operacion.NOT){
            return operadorIzq.traducirGo()+ "!" + operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.and){
            return operadorIzq.traducirGo()+ "&&" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.or){
            return operadorIzq.traducirGo()+ "||" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.es_igual){
            return operadorIzq.traducirGo()+ "==" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.es_diferente){
            return operadorIzq.traducirGo()+ "!=" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.mayor){
            return operadorIzq.traducirGo()+ ">" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.menor){
            return operadorIzq.traducirGo()+ "<" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.mayor_o_igual){
            return operadorIzq.traducirGo()+ ">=" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.menor_o_igual){
            return operadorIzq.traducirGo()+ "<=" +operadorDer.traducirGo();
        }else if(tipo== Tipo_operacion.CONCATENACION){
            return operadorIzq.traducirGo().toString() +"+"+operadorDer.traducirGo().toString();
        }else{
            return "";
        }
    }


}
