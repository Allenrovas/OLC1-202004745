import Controlador from "../Controlador";
import Asignacion from "../Instrucciones/Asignacion";
import Declaracion from "../Instrucciones/Declaracion";
import Funcion from "../Instrucciones/Funcion";
import StartWith from "../Instrucciones/StartWith";
import { Instruccion } from "../Interfaces/Instruccion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Nodo from "./Nodo";

export default class Ast implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;

    constructor(lista_instruciones : Array<Instruccion>) {
        this.lista_instrucciones = lista_instruciones;
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        
        //1era pasada vamos a guardar las funciones y metodos del programa
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Funcion){
                let funcion = instruccion as Funcion;
                funcion.agregarFuncionTS(ts);
            }
        }

        //2 da pasada. ejecutar las declaraciones de variables
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof Declaracion || instruccion instanceof Asignacion){
            //if(instruccion instanceof Declaracion ){

                instruccion.ejecutar(controlador,ts);
            }
        }

        //3ra pada. ejecutamos todas las demas instrucciones
        for(let instruccion of this.lista_instrucciones){
            if(instruccion instanceof StartWith){
                instruccion.ejecutar(controlador,ts);
                break;
            }
        }

        for(let instruccion of this.lista_instrucciones){
            if(!(instruccion instanceof Declaracion) && !(instruccion instanceof Funcion) && !(instruccion instanceof StartWith)){
                instruccion.ejecutar(controlador,ts);
            }
        }
          
    }

    recorrer(): Nodo {
        let raiz = new Nodo("INICIO","");

        for(let inst of this.lista_instrucciones){
            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }
}