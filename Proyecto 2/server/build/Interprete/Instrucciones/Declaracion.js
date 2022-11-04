"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errores_1 = __importDefault(require("../Ast/Errores"));
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Primitivo_1 = __importDefault(require("../Expresiones/Primitivo"));
const Simbolo_1 = __importDefault(require("../TablaSimbolos/Simbolo"));
const Tipo_1 = require("../TablaSimbolos/Tipo");
class Declaracion {
    constructor(type, lista_ids, expresion, linea, columna, typeArray, E1, E2, Array) {
        this.type = type;
        this.lista_ids = lista_ids;
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
        this.E1 = E1;
        this.E2 = E2;
        this.typeArray = typeArray;
        this.Array = Array;
    }
    ejecutar(controlador, ts) {
        // int x, y, z = 0;
        // int a = 9;
        // boolean verdadero;
        for (let id of this.lista_ids) {
            //1er paso. verificar si existe en la tabla de simbolos actual
            if (ts.existeEnActual(id)) {
                let error = new Errores_1.default("Semantico", `La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar.`, this.linea, this.columna);
                controlador.errores.push(error);
                controlador.append(` *** ERROR: Semantico, La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar. En la linea ${this.linea} y columna ${this.columna}`);
                continue;
            }
            //console.log(this)
            //console.log("----------------------------")
            //console.log( this.type.enum_tipo);
            if (this.E1 == null) {
                if (this.expresion != null) {
                    let tipo_valor = this.expresion.getTipo(controlador, ts); //ENTERO
                    let valor = this.expresion.getValor(controlador, ts); //0
                    //console.log(this)
                    //console.log("----------------------------")
                    //console.log( this.type.enum_tipo);
                    //console.log(tipo_valor);
                    //console.log(valor);
                    if (tipo_valor == this.type.enum_tipo) {
                        let nuevo_simbolo = new Simbolo_1.default(1, this.type, id, valor, this.linea, this.columna);
                        ts.agregar(id, nuevo_simbolo);
                    }
                    else {
                        //Tomar en cuenta casteos implicitos
                        if (this.type.enum_tipo == Tipo_1.tipo.DOBLE && tipo_valor == Tipo_1.tipo.ENTERO) {
                            let nuevo_simbolo = new Simbolo_1.default(1, this.type, id, valor, this.linea, this.columna);
                            ts.agregar(id, nuevo_simbolo);
                        }
                        else if (this.type.enum_tipo == Tipo_1.tipo.ENTERO && tipo_valor == Tipo_1.tipo.DOBLE) {
                            let nuevo_simbolo = new Simbolo_1.default(1, this.type, id, Math.trunc(valor), this.linea, this.columna);
                            ts.agregar(id, nuevo_simbolo); // int x = 9.7; -> x = 9
                        }
                        else {
                            //reportar error semantico 
                        }
                    }
                }
                else {
                    let nuevo_simbolo = new Simbolo_1.default(1, this.type, id, null, this.linea, this.columna);
                    ts.agregar(id, nuevo_simbolo);
                    if (this.type.enum_tipo == Tipo_1.tipo.ENTERO) {
                        nuevo_simbolo.setValor(0);
                    }
                    else if (this.type.enum_tipo == Tipo_1.tipo.DOBLE) {
                        nuevo_simbolo.setValor(0.0);
                    }
                    else if (this.type.enum_tipo == Tipo_1.tipo.BOOLEANO) {
                        nuevo_simbolo.setValor(true);
                    }
                    else if (this.type.enum_tipo == Tipo_1.tipo.CADENA) {
                        nuevo_simbolo.setValor("");
                    }
                    else if (this.type.enum_tipo == Tipo_1.tipo.CARACTER) {
                        nuevo_simbolo.setValor('0');
                    }
                }
            }
            else {
                if (this.E2 == null) {
                    let tipo_valor = this.E1.getTipo(controlador, ts); //ENTERO
                    let valor = this.E1.getValor(controlador, ts); //0
                    // console.log(this)
                    //console.log("----------------------------")
                    //console.log( this.type.enum_tipo);
                    //console.log(tipo_valor);
                    //console.log(valor);
                    //console.log(new Array(valor));
                    var valores = new Array(valor);
                    let nuevo_simbolo = new Simbolo_1.default(4, this.type, id, valores, this.linea, this.columna);
                    ts.agregar(id, nuevo_simbolo);
                }
                else {
                    let global = new Array();
                    let i = 1;
                    let j = 1;
                    for (let obj of this.Array) {
                        let temp = new Array();
                        for (let oj of obj) {
                            if (!(oj instanceof Primitivo_1.default)) {
                                temp.push(oj);
                            }
                            else {
                                temp.push(oj.getValor(controlador, ts));
                            }
                        }
                        global.push(temp);
                    }
                    //var probandp = global.toString()
                    //console.log(probandp)
                    console.log(global[3]);
                    let nuevo_simbolo = new Simbolo_1.default(4, this.type, id, global, this.linea, this.columna);
                    ts.agregar(id, nuevo_simbolo);
                }
            }
        }
        return null;
    }
    recorrer() {
        try {
            let padre = new Nodo_1.default("DECLARACION", "");
            padre.AddHijo(new Nodo_1.default(this.type.nombre_tipo, ""));
            let hijos_id = new Nodo_1.default("Ids", "");
            for (let id of this.lista_ids) {
                hijos_id.AddHijo(new Nodo_1.default(id, ""));
            }
            padre.AddHijo(hijos_id);
            if (this.expresion != null) {
                padre.AddHijo(this.expresion.recorrer());
            }
            if (this.E2 != null) {
                let dimension = new Nodo_1.default("Posiciones", "");
                dimension.AddHijo(this.E1.recorrer());
                // let dimension2 = new Nodo("Posiciones","");
                //dimension2.AddHijo(this.E2.recorrer());
                padre.AddHijo(dimension);
                // padre.AddHijo(dimension2);
            }
            else if (this.E1 != null) {
                let dimension = new Nodo_1.default("Posiciones", "");
                dimension.AddHijo(this.E1.recorrer());
                padre.AddHijo(dimension);
            }
            return padre;
        }
        catch (error) {
            let padre = new Nodo_1.default("DECLARACION", "");
            return padre;
        }
    }
}
exports.default = Declaracion;
