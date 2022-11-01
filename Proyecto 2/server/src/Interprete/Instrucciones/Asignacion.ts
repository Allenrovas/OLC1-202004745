import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";

export default class Asignacion implements Instruccion{

    public identificador : string;
    public valor : Expresion;
    public linea : number;
    public columna : number;

    public I1 : any;
    public I2 : any;

    /**
     *
     */
    constructor(identificador : string, valor : Expresion, linea: number, columna: number,I1?:Expresion ,I2?:Expresion) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.I1 = I1;
        this.I2 = I2;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        //1. verificamos si existe en la tabla de simbolos 
        if(ts.existe(this.identificador)){
            //2. si existe verificamos que el valor a asignar sea del mismo tipo de la variable 
            let valor = this.valor.getValor(controlador,ts);
            let variable = ts.getSimbolo(this.identificador);
            let tipo_valor = this.valor.getTipo(controlador,ts);
            if(variable?.tipo.enum_tipo == this.valor.getTipo(controlador,ts) ){
                //3. si es del mismo tipo se asigna de lo contrario se reporta error. 

                if(this.I2 != null){
                    let indice1 = this.I1.getValor(controlador,ts);
                    let indice2 = this.I2.getValor(controlador,ts);
                    ts.getSimbolo(this.identificador)?.setValor(valor,indice1,indice2);


                }else if(this.I1 != null){
                    let indice1 = this.I1.getValor(controlador,ts);
                    ts.getSimbolo(this.identificador)?.setValor(valor,indice1);
                }else{
                    ts.getSimbolo(this.identificador)?.setValor(valor);
                }
               
            }else{
                if(variable?.tipo.enum_tipo == tipo.DOBLE && tipo_valor == tipo.ENTERO){
                    ts.getSimbolo(this.identificador)?.setValor(valor);
                }else if(variable?.tipo.enum_tipo == tipo.ENTERO && tipo_valor == tipo.DOBLE){
                   
                    ts.getSimbolo(this.identificador)?.setValor(Math.trunc(valor)); 
                }else{
                     //reportar error semantico 
                     return null;
                }
                
            }
        }else{
            //reportar error semantico 
            let error = new Errores("Semantico", `La variable ${this.identificador} no existe en la tabla de simbolos, por lo que no se le puede asignar un valor.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(` *** ERROR: Semantico, La variable ${this.identificador} no existe en la tabla de simbolos, por lo que no se le puede asignar un valor. En la linea ${this.linea} y columna ${this.columna}`)
            console.log(controlador.errores)
            return null;
        }
        
        
        
    }
    recorrer(): Nodo {
        let padre = new Nodo("ASignacion", "");
        let hijos_id = new Nodo(this.identificador.toString() ,""); 
        padre.AddHijo(hijos_id);

        if(this.I2 != null){
            let dimension = new Nodo("Posicion","");
            dimension.AddHijo(this.I1.recorrer());
           // let dimension2 = new Nodo("Posicion","");
           // dimension2.AddHijo(this.I2.recorrer());

            hijos_id.AddHijo(dimension);

           // hijos_id.AddHijo(dimension2);
            
        }else if(this.I1!= null){
            
            let dimension = new Nodo("Posicion","");
            dimension.AddHijo(this.I1.recorrer());
            hijos_id.AddHijo(dimension);
        }

        if(this.valor != null){
            hijos_id.AddHijo(this.valor.recorrer())
        }
 
        return padre;
    }
}