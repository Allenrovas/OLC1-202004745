"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errores_1 = __importDefault(require("../Ast/Errores"));
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Tipo_1 = require("../TablaSimbolos/Tipo");
class Asignacion {
    /**
     *
     */
    constructor(identificador, valor, linea, columna, I1, I2) {
        this.identificador = identificador;
        this.valor = valor;
        this.linea = linea;
        this.columna = columna;
        this.I1 = I1;
        this.I2 = I2;
    }
    ejecutar(controlador, ts) {
        var _a, _b, _c, _d, _e;
        //1. verificamos si existe en la tabla de simbolos 
        if (ts.existe(this.identificador)) {
            //2. si existe verificamos que el valor a asignar sea del mismo tipo de la variable 
            let valor = this.valor.getValor(controlador, ts);
            let variable = ts.getSimbolo(this.identificador);
            let tipo_valor = this.valor.getTipo(controlador, ts);
            if ((variable === null || variable === void 0 ? void 0 : variable.tipo.enum_tipo) == this.valor.getTipo(controlador, ts)) {
                //3. si es del mismo tipo se asigna de lo contrario se reporta error. 
                if (this.I2 != null) {
                    let indice1 = this.I1.getValor(controlador, ts);
                    let indice2 = this.I2.getValor(controlador, ts);
                    (_a = ts.getSimbolo(this.identificador)) === null || _a === void 0 ? void 0 : _a.setValor(valor, indice1, indice2);
                }
                else if (this.I1 != null) {
                    let indice1 = this.I1.getValor(controlador, ts);
                    (_b = ts.getSimbolo(this.identificador)) === null || _b === void 0 ? void 0 : _b.setValor(valor, indice1);
                }
                else {
                    (_c = ts.getSimbolo(this.identificador)) === null || _c === void 0 ? void 0 : _c.setValor(valor);
                }
            }
            else {
                if ((variable === null || variable === void 0 ? void 0 : variable.tipo.enum_tipo) == Tipo_1.tipo.DOBLE && tipo_valor == Tipo_1.tipo.ENTERO) {
                    (_d = ts.getSimbolo(this.identificador)) === null || _d === void 0 ? void 0 : _d.setValor(valor);
                }
                else if ((variable === null || variable === void 0 ? void 0 : variable.tipo.enum_tipo) == Tipo_1.tipo.ENTERO && tipo_valor == Tipo_1.tipo.DOBLE) {
                    (_e = ts.getSimbolo(this.identificador)) === null || _e === void 0 ? void 0 : _e.setValor(Math.trunc(valor));
                }
                else {
                    //reportar error semantico 
                    return null;
                }
            }
        }
        else {
            //reportar error semantico 
            let error = new Errores_1.default("Semantico", `La variable ${this.identificador} no existe en la tabla de simbolos, por lo que no se le puede asignar un valor.`, this.linea, this.columna);
            controlador.errores.push(error);
            controlador.append(` *** ERROR: Semantico, La variable ${this.identificador} no existe en la tabla de simbolos, por lo que no se le puede asignar un valor. En la linea ${this.linea} y columna ${this.columna}`);
            console.log(controlador.errores);
            return null;
        }
    }
    recorrer() {
        let padre = new Nodo_1.default("ASignacion", "");
        let hijos_id = new Nodo_1.default(this.identificador.toString(), "");
        padre.AddHijo(hijos_id);
        if (this.I2 != null) {
            let dimension = new Nodo_1.default("Posicion", "");
            dimension.AddHijo(this.I1.recorrer());
            // let dimension2 = new Nodo("Posicion","");
            // dimension2.AddHijo(this.I2.recorrer());
            hijos_id.AddHijo(dimension);
            // hijos_id.AddHijo(dimension2);
        }
        else if (this.I1 != null) {
            let dimension = new Nodo_1.default("Posicion", "");
            dimension.AddHijo(this.I1.recorrer());
            hijos_id.AddHijo(dimension);
        }
        if (this.valor != null) {
            hijos_id.AddHijo(this.valor.recorrer());
        }
        return padre;
    }
}
exports.default = Asignacion;
