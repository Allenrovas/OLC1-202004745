
/**
 * @class Tabla de Simbolos esta clase guarda la tabla de simbolos del programa, es decir,
 * guarda las variables, metodos y funciones 
 *  
 */

import Simbolo from "./Simbolo";

export default class TablaSimbolos{
    public name:any;
    public ant : TablaSimbolos;
    public tabla : Map<string, Simbolo>;
    public sig:any;

    /**
     * @constructor creamos una nueva tabla.
     * @param ant indica quien es la tabla de simbolos anterior de la nueva tabla (para el manejo de ambitos)
     */
    constructor(ant : TablaSimbolos | any,name?:string|any) {
        this.ant = ant;
        this.tabla = new Map<string, Simbolo>();
        if(ant!= null){
            ant.sig = this;
        }
        this.name = name
    }

    agregar(id: string, simbolo : Simbolo){
        this.tabla.set(id.toLowerCase(), simbolo); // Lo convertimos en minuscula ya que nuestro lenguaje es caseinsitive ej. variable = VARiabLE
    }

    existe(id: string): boolean{
        let ts : TablaSimbolos = this;

        while(ts != null){
            let existe = ts.tabla.get(id.toLowerCase());

            if(existe != null){
                return true;
            }
            ts = ts.ant;
        }
        return false;
    }

    getSimbolo(id: string){
        let ts : TablaSimbolos = this; 

        while(ts != null){
            let existe = ts.tabla.get(id.toLowerCase()); 

            if(existe != null){
                return existe;
            }
            ts = ts.ant;
        }
        return null;
    }

    existeEnActual(id: string): boolean{
        let ts : TablaSimbolos = this;

        let existe = ts.tabla.get(id.toLowerCase()); 

        if(existe != null){
            return true;
        }
        return false;
    }
}