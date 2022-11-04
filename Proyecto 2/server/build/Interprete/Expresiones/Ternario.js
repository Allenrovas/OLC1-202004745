"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Tipo_1 = require("../TablaSimbolos/Tipo");
class Ternario {
    constructor(condicion, verdadero, falso, linea, columna) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.linea = linea;
        this.columna = columna;
    }
    getTipo(controlador, ts) {
        // condicion ? true : false;
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (this.condicion.getTipo(controlador, ts) == Tipo_1.tipo.BOOLEANO) {
            return valor_condicion ? this.verdadero.getTipo(controlador, ts) : this.falso.getTipo(controlador, ts);
        }
        else {
            return Tipo_1.tipo.ERROR;
        }
    }
    getValor(controlador, ts) {
        let valor_condicion = this.condicion.getValor(controlador, ts);
        if (this.condicion.getTipo(controlador, ts) == Tipo_1.tipo.BOOLEANO) {
            return valor_condicion ? this.verdadero.getValor(controlador, ts) : this.falso.getValor(controlador, ts);
        }
        else {
            //reportamos error semantico 
            return null;
        }
    }
    recorrer() {
        let padre = new Nodo_1.default("Ternario", "");
        padre.AddHijo(this.verdadero.recorrer());
        padre.AddHijo(new Nodo_1.default("?", ""));
        padre.AddHijo(this.falso.recorrer());
        return padre;
    }
}
exports.default = Ternario;
