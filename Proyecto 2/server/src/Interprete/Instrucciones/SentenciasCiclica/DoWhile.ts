import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Break from "../SentenciasTransferencia/Break";
import Continue from "../SentenciasTransferencia/Continue";

export default class While implements Instruccion{

    public condicion: Expresion;
    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;
    
   
    constructor(condicion : Expresion, lista_instrucciones: Array<Instruccion>, linea:number, columna:number) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        let temp = controlador.sent_ciclica;
        controlador.sent_ciclica = true;

        if(this.condicion.getTipo(controlador,ts) == tipo.BOOLEANO){
            siguiente:
            do {
                let ts_local = new TablaSimbolos(ts,ts.name);
                for(let inst of this.lista_instrucciones){
                    let ret = inst.ejecutar(controlador,ts_local);  
                    if(ret instanceof Break){
                        console.log("ME SALI POR ERROR")
                        controlador.sent_ciclica = temp;
                        return ret;
                    }
                    if(ret instanceof Continue){
                        continue siguiente;
                    }
                }

            }  
            while(this.condicion.getValor(controlador,ts))             
        }else{
            controlador.errores.push(new Errores("Semantico", `condicion no es booleana`, this.linea, this.columna));
            //reportamos error semantico de que la condicion no es booleana\
            
        }


        controlador.sent_ciclica = temp;
        return null;
    }
    recorrer(): Nodo {
        let padre = new Nodo("Sentencia Do While", "");
        padre.AddHijo(new Nodo("Do", ""));

        let hijo_instrucciones = new Nodo("Instrucciones","");
        for(let inst of this.lista_instrucciones){
             hijo_instrucciones.AddHijo(inst.recorrer());
        }
 
         padre.AddHijo(hijo_instrucciones);
 

      

        let condicion_while = new Nodo("Condicion","");

        padre.AddHijo(new Nodo("(", ""));

        condicion_while.AddHijo(this.condicion.recorrer())

        padre.AddHijo(condicion_while)
    
        padre.AddHijo(new Nodo(")", ""));
        
       
        return padre;
    }
}