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
class For {
    constructor(dec_asig, condicion, actualizacion, lista_instrucciones, linea, columna) {
        this.dec_asig = dec_asig;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(controlador, ts) {
        let ts_local = new TablaSimbolos_1.default(ts, ts.name);
        let temp = controlador.sent_ciclica;
        controlador.sent_ciclica = true;
        //console.log("estamos en el for")
        this.dec_asig.ejecutar(controlador, ts_local);
        //for(int i = 0; i < 10; i++){//int k; }
        if (this.condicion.getTipo(controlador, ts_local) == Tipo_1.tipo.BOOLEANO) {
            while (this.condicion.getValor(controlador, ts_local)) {
                let ts_local2 = new TablaSimbolos_1.default(ts_local, ts_local.name);
                for (let inst of this.lista_instrucciones) {
                    let ret = inst.ejecutar(controlador, ts_local2);
                    if (ret instanceof Break_1.default) {
                        controlador.sent_ciclica = temp;
                        return ret;
                    }
                }
                this.actualizacion.ejecutar(controlador, ts_local);
            }
        }
        else {
            controlador.errores.push(new Errores_1.default("Semantico", `la condicion no es booleana`, this.linea, this.columna));
            //reportamos error semantico de que la condicion no es booleana\
        }
        controlador.sent_ciclica = temp;
        return null;
    }
    recorrer() {
        let padre = new Nodo_1.default("Sentencia  For", "");
        padre.AddHijo(new Nodo_1.default("for", ""));
        padre.AddHijo(new Nodo_1.default("(", ""));
        padre.AddHijo(this.dec_asig.recorrer());
        padre.AddHijo(this.condicion.recorrer());
        padre.AddHijo(this.actualizacion.recorrer());
        padre.AddHijo(new Nodo_1.default(")", ""));
        let hijo_instrucciones = new Nodo_1.default("Instrucciones", "");
        for (let inst of this.lista_instrucciones) {
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        padre.AddHijo(hijo_instrucciones);
        return padre;
    }
}
exports.default = For;
