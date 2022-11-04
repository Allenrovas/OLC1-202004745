"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Simbolo_1 = __importDefault(require("../TablaSimbolos/Simbolo"));
const TablaSimbolos_1 = __importDefault(require("../TablaSimbolos/TablaSimbolos"));
class Funcion extends Simbolo_1.default {
    constructor(simbolo, tipo, identificador, lista_params, metodo, lista_instrucciones, linea, columna) {
        super(simbolo, tipo, identificador, null, linea, columna, lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    //-- agregamos un metodo para agregar el simbolo de la funcion a la tabla de simbolos
    agregarFuncionTS(ts) {
        console.log(`guardamos ${this.identificador}`);
        if (!(ts.existe(this.identificador))) {
            ts.agregar(this.identificador, this);
        }
        else {
            // error semantico.
        }
    }
    ejecutar(controlador, ts) {
        // Aqui solo necesitamos mandar a ejecutar las instrucciones ya que las validaciones para llegar hasta aca se hacen en la clase llamada
        let ts_local = new TablaSimbolos_1.default(ts, this.identificador);
        //console.log("estamos en funcion");
        for (let inst of this.lista_instrucciones) {
            let retorno = inst.ejecutar(controlador, ts_local);
            if (retorno != null) {
                return retorno;
            }
        }
        return null;
    }
    recorrer() {
        let padre = new Nodo_1.default("Funcion", "");
        try {
            padre.AddHijo(new Nodo_1.default(this.tipo.nombre_tipo.toString(), ""));
        }
        catch (error) {
            padre.AddHijo(new Nodo_1.default(this.tipo.toString(), ""));
        }
        padre.AddHijo(new Nodo_1.default(this.identificador.toString(), ""));
        padre.AddHijo(new Nodo_1.default("(", ""));
        //TODO: AGREGAR NODOS PARAMETROS SOLO SI HAY
        if (this.lista_params != null) {
            //console.log("Lista parametros")
            // console.log(this.lista_params)
            let Parametros = new Nodo_1.default("Parametros", "");
            for (let parametro of this.lista_params) {
                let Tipo = new Nodo_1.default(parametro.tipo.nombre_tipo, "");
                Tipo.AddHijo(new Nodo_1.default(parametro.identificador.toString(), ""));
                Parametros.AddHijo(Tipo);
            }
            padre.AddHijo(Parametros);
        }
        padre.AddHijo(new Nodo_1.default(")", ""));
        padre.AddHijo(new Nodo_1.default("{", ""));
        let hijo_instrucciones = new Nodo_1.default("Instrucciones", "");
        for (let inst of this.lista_instrucciones) {
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        padre.AddHijo(hijo_instrucciones);
        padre.AddHijo(new Nodo_1.default("}", ""));
        return padre;
    }
}
exports.default = Funcion;
