"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Tipo_1 = require("../TablaSimbolos/Tipo");
class WriteLine {
    constructor(expresion, validacion, linea, columna) {
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.validacion = validacion;
    }
    ejecutar(controlador, ts) {
        let tipo_valor = this.expresion.getTipo(controlador, ts);
        if (tipo_valor == Tipo_1.tipo.ENTERO || tipo_valor == Tipo_1.tipo.DOBLE || tipo_valor == Tipo_1.tipo.CARACTER || tipo_valor == Tipo_1.tipo.CADENA || tipo_valor == Tipo_1.tipo.BOOLEANO) {
            let numero = this.expresion.getValor(controlador, ts);
            if (tipo_valor == Tipo_1.tipo.DOBLE) {
                if (numero % 1 == 0) {
                    controlador.print(numero.toFixed(2), this.validacion);
                }
                else {
                    controlador.print(numero, this.validacion);
                }
            }
            else {
                let valor = this.expresion.getValor(controlador, ts);
                controlador.print(valor, this.validacion);
            }
        }
    }
    recorrer() {
        let padre = new Nodo_1.default("INSTRUCCION", "");
        if (this.validacion) {
            padre.AddHijo(new Nodo_1.default("println", ""));
        }
        else {
            padre.AddHijo(new Nodo_1.default("print", ""));
        }
        if (this.expresion != null) {
            padre.AddHijo(this.expresion.recorrer());
        }
        return padre;
    }
}
exports.default = WriteLine;
