import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Instruccion } from "../../Interfaces/Instruccion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";

export default class Break implements Instruccion{
    
    constructor() { 
        
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
       return this;
    }
    
    recorrer(): Nodo {
        let padre = new Nodo("Break","");
        return padre
    }
}