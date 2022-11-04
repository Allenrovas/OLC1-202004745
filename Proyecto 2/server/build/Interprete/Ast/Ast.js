"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Asignacion_1 = __importDefault(require("../Instrucciones/Asignacion"));
const Declaracion_1 = __importDefault(require("../Instrucciones/Declaracion"));
const Funcion_1 = __importDefault(require("../Instrucciones/Funcion"));
const StartWith_1 = __importDefault(require("../Instrucciones/StartWith"));
const Nodo_1 = __importDefault(require("./Nodo"));
class Ast {
    constructor(lista_instruciones) {
        this.lista_instrucciones = lista_instruciones;
    }
    ejecutar(controlador, ts) {
        //1era pasada vamos a guardar las funciones y metodos del programa
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof Funcion_1.default) {
                let funcion = instruccion;
                funcion.agregarFuncionTS(ts);
            }
        }
        //2 da pasada. ejecutar las declaraciones de variables
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof Declaracion_1.default || instruccion instanceof Asignacion_1.default) {
                //if(instruccion instanceof Declaracion ){
                instruccion.ejecutar(controlador, ts);
            }
        }
        //3ra pada. ejecutamos todas las demas instrucciones
        for (let instruccion of this.lista_instrucciones) {
            if (instruccion instanceof StartWith_1.default) {
                instruccion.ejecutar(controlador, ts);
                break;
            }
        }
        for (let instruccion of this.lista_instrucciones) {
            if (!(instruccion instanceof Declaracion_1.default) && !(instruccion instanceof Funcion_1.default) && !(instruccion instanceof StartWith_1.default)) {
                instruccion.ejecutar(controlador, ts);
            }
        }
    }
    recorrer() {
        let raiz = new Nodo_1.default("INICIO", "");
        for (let inst of this.lista_instrucciones) {
            raiz.AddHijo(inst.recorrer());
        }
        return raiz;
    }
}
exports.default = Ast;
