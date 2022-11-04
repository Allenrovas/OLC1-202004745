"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
class Retorno {
    constructor(valor_retorno) {
        this.valor_retorno = valor_retorno;
    }
    ejecutar(controlador, ts) {
        //Verificamos que el valor no sea nulo 
        if (this.valor_retorno != null) {
            return this.valor_retorno.getValor(controlador, ts);
        }
        else {
            this;
        }
    }
    recorrer() {
        let padre = new Nodo_1.default("Return", "");
        padre.AddHijo(this.valor_retorno.recorrer());
        return padre;
    }
}
exports.default = Retorno;
