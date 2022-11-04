"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
class StartWith {
    constructor(llamada, linea, columna) {
        this.llamada = llamada;
        this.linea = linea;
        this.column = columna;
    }
    ejecutar(controlador, ts) {
        this.llamada.ejecutar(controlador, ts);
    }
    recorrer() {
        let padre = new Nodo_1.default("RUN", "");
        padre.AddHijo(this.llamada.recorrer());
        return padre;
    }
}
exports.default = StartWith;
