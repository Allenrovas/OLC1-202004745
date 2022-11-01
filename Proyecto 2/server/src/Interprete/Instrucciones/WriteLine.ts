import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

export default class WriteLine implements Instruccion{
    
    public expresion : Expresion;
    public linea : number;
    public columna : number;
    public validacion : boolean;

    constructor(expresion : Expresion,validacion: boolean ,linea : number, columna: number) {
        this.expresion =expresion;
        this.linea = linea;
        this.columna = columna;
        this.validacion = validacion;
    }
    
    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let tipo_valor = this.expresion.getTipo(controlador, ts);
        

        if(tipo_valor == tipo.ENTERO || tipo_valor == tipo.DOBLE || tipo_valor == tipo.CARACTER || tipo_valor == tipo.CADENA || tipo_valor == tipo.BOOLEANO){
            let numero = this.expresion.getValor(controlador,ts);
            if( tipo_valor == tipo.DOBLE ){
                if (numero % 1 == 0) {
                    controlador.print(numero.toFixed(2),this.validacion);
                } else {
                    controlador.print(numero,this.validacion);
                }
            }else{
                let valor = this.expresion.getValor(controlador,ts);
                controlador.print(valor,this.validacion);
            }
            
            
        }
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("INSTRUCCION", "");

        if(this.validacion){
            padre.AddHijo(new Nodo("println", ""));
        }else{
            padre.AddHijo(new Nodo("print", ""));
        }

       if(this.expresion != null){
           padre.AddHijo(this.expresion.recorrer())
       }

       return padre;
        
    }
}