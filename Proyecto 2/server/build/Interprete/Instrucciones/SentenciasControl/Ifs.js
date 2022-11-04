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
const Return_1 = __importDefault(require("../SentenciasTransferencia/Return"));
class Ifs {
    /**
     *
     */
    constructor(condicion, lista_instrucciones_ifs, lista_instrucciones_elses, linea, columna) {
        this.condicion = condicion;
        this.lista_instrucciones_ifs = lista_instrucciones_ifs;
        this.lista_instrucciones_elses = lista_instrucciones_elses;
        this.columna = columna;
        this.linea = linea;
    }
    ejecutar(controlador, ts) {
        /**
         * int x = 20;
         *  if(true){
         *     int a = 8;
         *      print(a);
         * }else{
         *       x = 30;
         * }
         * print(x); // 20
         */
        let ts_local = new TablaSimbolos_1.default(ts, ts.name);
        let valor_condicion = this.condicion.getValor(controlador, ts); //true | false
        if (this.condicion.getTipo(controlador, ts) == Tipo_1.tipo.BOOLEANO) {
            if (valor_condicion) {
                for (let inst of this.lista_instrucciones_ifs) {
                    let ret = inst.ejecutar(controlador, ts_local);
                    if (ret instanceof Break_1.default) {
                        if (controlador.sent_ciclica) {
                            return ret;
                        }
                        else {
                            let error = new Errores_1.default("Semantico", `No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Break dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`);
                        }
                    }
                    if (ret instanceof Continue_1.default) {
                        if (controlador.sent_ciclica) {
                            return ret;
                        }
                        else {
                            let error = new Errores_1.default("Semantico", `No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if.`, this.linea, this.columna);
                            controlador.errores.push(error);
                            controlador.append(` *** ERROR: Semantico, No se puede ejecutar la sentencia de transferencia Continue dentro de la sentencia de control if. En la linea ${this.linea} y columna ${this.columna}`);
                        }
                    }
                    if (ret instanceof Return_1.default) {
                        return ret;
                    }
                    if (ret != null) {
                        return ret;
                    }
                }
            }
            else {
                /**
                 * if () {} else if(){} else { }
                 */
                for (let inst of this.lista_instrucciones_elses) {
                    let ret = inst.ejecutar(controlador, ts_local);
                    if (ret instanceof Break_1.default) {
                        if (controlador.sent_ciclica) {
                            return ret;
                        }
                        else {
                            //error semantico, no se puede tener un break dentro de un else 
                        }
                    }
                    if (ret instanceof Return_1.default) {
                        return ret;
                    }
                    if (ret != null) {
                        return ret;
                    }
                }
            }
        }
        return null;
    }
    recorrer() {
        let padre = new Nodo_1.default("Instruccion", "");
        let SI = new Nodo_1.default("IF", "");
        //console.log(this.condicion)
        let condicion = this.condicion.recorrer();
        padre.AddHijo(SI);
        padre.AddHijo(condicion);
        let intrucicones_if = new Nodo_1.default("Intrucciones", "");
        for (let ins of this.lista_instrucciones_ifs) {
            intrucicones_if.AddHijo(ins.recorrer());
        }
        padre.AddHijo(intrucicones_if);
        if (this.lista_instrucciones_elses != null) {
            let intrucicones_Else = new Nodo_1.default("Else", "");
            for (let ins of this.lista_instrucciones_elses) {
                intrucicones_Else.AddHijo(ins.recorrer());
            }
            padre.AddHijo(intrucicones_Else);
        }
        return padre;
    }
}
exports.default = Ifs;
