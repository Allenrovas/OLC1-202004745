"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errores_1 = __importDefault(require("../../Ast/Errores"));
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
const Tipo_1 = require("../../TablaSimbolos/Tipo");
const Operacion_1 = __importStar(require("./Operacion"));
class Aritmetica extends Operacion_1.default {
    /**
     * @constructor este constructor utiliza el mismo de la clase Operacion
     */
    constructor(exp1, signo_operador, exp2, linea, columna, expU) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
    }
    //geTipo retorna el tipo de la expresion aritmetica 
    getTipo(controlador, ts) {
        let tipo_exp1;
        let tipo_exp2;
        if (this.expU == false) {
            /** Ejemplo 1
             *  10 + 30.5 -> exp1 + exp2 -> exp1 = 10, exp2 = 30.5
             *  exp1.getTipo = ENTERO
             *  exp2.getTipo = DOBLE
             *
             *  Ejemplo 2
             *  13.4 + 9 - 8 -> exp1 + exp2 -> exp1 = (13.4 + 9), exp2 = 8
             *  exp1.getTipo = DOBLE
             *  exp2.getTipo = ENTERO
             *
             */
            tipo_exp1 = this.exp1.getTipo(controlador, ts);
            tipo_exp2 = this.exp2.getTipo(controlador, ts);
            if (tipo_exp1 == Tipo_1.tipo.ERROR || tipo_exp2 == Tipo_1.tipo.ERROR) {
                return Tipo_1.tipo.ERROR;
            }
        }
        else {
            /* Ejemplo de como trabajamos una expresion Unaria con el booleano expU
             * 1 + 1 -> expU -> falso
             * -1 -> expU -> verdadero
             *
             * Ejemplo:
             * -1 -> -exp1 -> exp1 = -1
             * exp1.getTipo = ENTERO
             */
            tipo_exp1 = this.exp1.getTipo(controlador, ts);
            if (tipo_exp1 == Tipo_1.tipo.ERROR) {
                return Tipo_1.tipo.ERROR;
            }
            tipo_exp2 = Tipo_1.tipo.ERROR;
        }
        /**
         * Para las siguientes validaciones nos basamos en la tabla de
         * de las operaciones aritmeticas permitidas que soporta el lenguaje descrito en el enunciado.
         */
        switch (this.operador) {
            case Operacion_1.Operador.SUMA:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return Tipo_1.tipo.CADENA;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return Tipo_1.tipo.CADENA; // 1.2 + "hola" -> "1.2hola"
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return Tipo_1.tipo.CADENA; // true + "hola" -> "truehola"
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.CADENA;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER || tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return Tipo_1.tipo.CADENA;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                break;
            case Operacion_1.Operador.RESTA:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return Tipo_1.tipo.CADENA; // 1.2 + "hola" -> "1.2hola"
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return Tipo_1.tipo.CADENA; // true + "hola" -> "truehola"
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
                    return Tipo_1.tipo.ERROR;
                }
                break;
            case Operacion_1.Operador.MULTIPLICACION:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
                    return Tipo_1.tipo.ERROR;
                }
                break;
            case Operacion_1.Operador.DIVISION:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.CARACTER || tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.CARACTER || tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                break;
            case Operacion_1.Operador.MOD:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                break;
            case Operacion_1.Operador.POT:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                }
                else if (tipo_exp1 = Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return Tipo_1.tipo.DOBLE;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        return Tipo_1.tipo.ENTERO;
                    }
                    else {
                        return Tipo_1.tipo.ERROR;
                    }
                } // TODO: Hacer las siguientes validaciones revisando la tabla para POT en el enunciado 
                break;
            case Operacion_1.Operador.UNARIO:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    return Tipo_1.tipo.ENTERO;
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    return Tipo_1.tipo.DOBLE;
                }
                else {
                    return Tipo_1.tipo.ERROR;
                }
                break;
            default:
                break;
        }
        return Tipo_1.tipo.ERROR;
    }
    getValor(controlador, ts) {
        let valor_exp1;
        let valor_exp2;
        let valor_expU;
        let tipo_exp1;
        let tipo_exp2;
        let tipo_expU;
        if (this.expU == false) {
            //Ejemplo si fuera  1 + 2.5 -> exp1 = 1, exp2 = 2.5
            tipo_exp1 = this.exp1.getTipo(controlador, ts); // ENTERO
            tipo_exp2 = this.exp2.getTipo(controlador, ts); // DOBLE 
            tipo_expU = Tipo_1.tipo.ERROR;
            valor_exp1 = this.exp1.getValor(controlador, ts); // 1 
            valor_exp2 = this.exp2.getValor(controlador, ts); // 2.5
        }
        else {
            tipo_expU = this.exp1.getTipo(controlador, ts);
            tipo_exp1 = Tipo_1.tipo.ERROR;
            tipo_exp2 = Tipo_1.tipo.ERROR;
            valor_expU = this.exp1.getValor(controlador, ts);
        }
        switch (this.operador) {
            case Operacion_1.Operador.SUMA:
                if (tipo_exp1 === Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 === Tipo_1.tipo.ENTERO) {
                        return valor_exp1 + valor_exp2; // 1+2.5 = 3.5
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 + valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        // Ejemplo: 1 + true -> 1 + 1 = 2 
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 + num_del_booleano;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        // 1 + 'A' -> 1 + 65 = 66
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 + num_ascci;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 + valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //TODO: reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 + valor_exp2; // 1.1 +2.5 = 3.6
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 + valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        // 1 + true -> 1 + 1 = 2 
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 + num_del_booleano;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        // 1.1 + 'A' -> 1.1 + 65 = 66.1
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 + num_ascci;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 + valor_exp2;
                    }
                    else {
                        // 3.4 +  id (id no existe en la tabla de simblos)
                        let error = new Errores_1.default("Semantico", `Incompatibilidad de tipos, no se puede operar la SUMA porque se produjo un error.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede operar la SUMA porque se produjo un error. En la linea ${this.linea} y columna ${this.columna}`);
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    // valor_exp1 = true | false
                    let num_bool_exp1 = 1;
                    if (valor_exp1 == false) {
                        num_bool_exp1 = 0;
                    }
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return num_bool_exp1 + valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return num_bool_exp1 + valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 + valor_exp2; //true + "hola" -> "truehola"
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //TODO: reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    // 'A' + 1 -> 65 + 1 -> 66
                    let num_ascci = valor_exp1.charCodeAt(0);
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return num_ascci + valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return num_ascci + valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return valor_exp1 + valor_exp2; //'A' + 'A' -> AA
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 + valor_exp2; //'A' + "hola" -> "Ahola"
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //TODO: reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.BOOLEANO || tipo_exp2 == Tipo_1.tipo.CARACTER || tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 + valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //TODO: reportar error semantico
                        return null;
                    }
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //reportar error semantico
                    return null;
                }
                break;
            case Operacion_1.Operador.RESTA:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 - valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 - valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 - num_del_booleano;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 - num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci - valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci - valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci - num_ascci2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //TODO: reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 - valor_exp2; // 1.1 +2.5 = 3.6
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 - valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        // 1 + true -> 1 + 1 = 2 
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 - num_del_booleano;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        // 1.1 + 'A' -> 1.1 + 65 = 66.1
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 - num_ascci;
                    }
                    else {
                        // 3.4 +  id (id no existe en la tabla de simblos)
                        let error = new Errores_1.default("Semantico", `Incompatibilidad de tipos, no se puede operar la SUMA porque se produjo un error.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede operar la SUMA porque se produjo un error. En la linea ${this.linea} y columna ${this.columna}`);
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano - valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano - valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //TODO: reportar error semantico
                        return null;
                    }
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //reportar error semantico
                    return null;
                }
                break;
            case Operacion_1.Operador.MULTIPLICACION:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 * num_del_booleano;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 * num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 * num_del_booleano;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 * num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano * valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci * valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 * num_ascci2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //reportar error semantico
                    return null;
                } // TODO: Hacer las siguientes validaciones revisando la tabla para MULTIPLICACION en el enunciado 
                break;
            case Operacion_1.Operador.DIVISION:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 / num_ascci;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 / num_del_booleano;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 / num_ascci;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 / num_del_booleano;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci1 = valor_exp1.charCodeAt(0);
                        let num_ascci2 = valor_exp2.charCodeAt(0);
                        return num_ascci1 / num_ascci2;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano / valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano / valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //reportar error semantico
                    return null;
                }
                break;
            case Operacion_1.Operador.MOD:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 % valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 % valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 % valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 % valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //reportar error semantico
                    return null;
                }
                break;
            case Operacion_1.Operador.POT:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 ** valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 ** valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 ** num_del_booleano;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        return valor_exp1 ** valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 ** valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 ** num_del_booleano;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano ** valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_del_booleano = 1;
                        if (valor_exp1 == false) {
                            num_del_booleano = 0;
                        }
                        return num_del_booleano ** valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_del_booleano = 1;
                        if (valor_exp2 == false) {
                            num_del_booleano = 0;
                        }
                        return valor_exp1 ** num_del_booleano;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                        return null;
                    }
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //reportar error semantico
                    return null;
                }
                break;
            case Operacion_1.Operador.UNARIO:
                if (tipo_expU == Tipo_1.tipo.ENTERO || tipo_expU == Tipo_1.tipo.DOBLE) {
                    return -valor_expU;
                }
                else {
                    controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                    //TODO: reportar error semantico
                    return null;
                }
                break;
            default:
                break;
        }
        return null;
    }
    recorrer() {
        let padre = new Nodo_1.default("Exp", "");
        if (this.expU) { //-1
            padre.AddHijo(new Nodo_1.default(this.signo_operador, ""));
            padre.AddHijo(this.exp1.recorrer());
        }
        else { // 1+1
            padre.AddHijo(this.exp1.recorrer());
            padre.AddHijo(new Nodo_1.default(this.signo_operador, ""));
            padre.AddHijo(this.exp2.recorrer());
        }
        return padre;
    }
}
exports.default = Aritmetica;
