"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errores_1 = __importDefault(require("../../Ast/Errores"));
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
const TablaSimbolos_1 = __importDefault(require("../../TablaSimbolos/TablaSimbolos"));
const Tipo_1 = require("../../TablaSimbolos/Tipo");
const Break_1 = __importDefault(require("../SentenciasTransferencia/Break"));
const Continue_1 = __importDefault(require("../SentenciasTransferencia/Continue"));
class While {
    constructor(condicion, lista_instrucciones, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let temp = controlador.sent_ciclica;
        controlador.sent_ciclica = true;
        if (this.condicion.getTipo(controlador, ts) == Tipo_1.tipo.BOOLEANO) {
            siguiente: do {
                let ts_local = new TablaSimbolos_1.default(ts, ts.name);
                for (let inst of this.lista_instrucciones) {
                    let ret = inst.ejecutar(controlador, ts_local);
                    if (ret instanceof Break_1.default) {
                        console.log("ME SALI POR ERROR");
                        controlador.sent_ciclica = temp;
                        return ret;
                    }
                    if (ret instanceof Continue_1.default) {
                        continue siguiente;
                    }
                }
            } while (this.condicion.getValor(controlador, ts));
        }
        else {
            controlador.errores.push(new Errores_1.default("Semantico", `condicion no es booleana`, this.linea, this.columna));
            //reportamos error semantico de que la condicion no es booleana\
        }
        controlador.sent_ciclica = temp;
        return null;
    }
    recorrer() {
        let padre = new Nodo_1.default("Sentencia Do While", "");
        padre.AddHijo(new Nodo_1.default("Do", ""));
        let hijo_instrucciones = new Nodo_1.default("Instrucciones", "");
        for (let inst of this.lista_instrucciones) {
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        padre.AddHijo(hijo_instrucciones);
        let condicion_while = new Nodo_1.default("Condicion", "");
        padre.AddHijo(new Nodo_1.default("(", ""));
        condicion_while.AddHijo(this.condicion.recorrer());
        padre.AddHijo(condicion_while);
        padre.AddHijo(new Nodo_1.default(")", ""));
        return padre;
    }
}
exports.default = While;
