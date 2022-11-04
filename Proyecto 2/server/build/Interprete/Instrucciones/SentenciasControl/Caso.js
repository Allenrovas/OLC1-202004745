"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
const TablaSimbolos_1 = __importDefault(require("../../TablaSimbolos/TablaSimbolos"));
const Break_1 = __importDefault(require("../SentenciasTransferencia/Break"));
class Caso {
    constructor(valor, instrucciones) {
        this.valor = valor;
        this.instrucciones = instrucciones;
    }
    ejecutar(controlador, ts) {
        let ts_local = new TablaSimbolos_1.default(ts, ts.name);
        for (let inst of this.instrucciones) {
            let res = inst.ejecutar(controlador, ts_local);
            console.log(inst);
            if (res instanceof Break_1.default) {
                return res;
            }
        }
    }
    recorrer() {
        let padre;
        if (this.valor != null) {
            padre = new Nodo_1.default("Caso", "");
            let expresion = new Nodo_1.default("Expresion", "");
            expresion.AddHijo(this.valor.recorrer());
            let litaintrucciones = new Nodo_1.default("Intrucciones", "");
            for (let ins of this.instrucciones) {
                //console.log(ins)
                litaintrucciones.AddHijo(ins.recorrer());
            }
            padre.AddHijo(expresion);
            padre.AddHijo(litaintrucciones);
        }
        else {
            padre = new Nodo_1.default("Default", "");
            let litaintrucciones = new Nodo_1.default("Intrucciones", "");
            for (let ins of this.instrucciones) {
                //console.log(ins)
                litaintrucciones.AddHijo(ins.recorrer());
            }
            padre.AddHijo(litaintrucciones);
        }
        return padre;
    }
}
exports.default = Caso;
