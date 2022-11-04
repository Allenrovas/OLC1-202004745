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
class Relacional extends Operacion_1.default {
    /**
     * @constructor este constructor utiliza el mismo de la clase Operacion
     */
    constructor(exp1, signo_operador, exp2, linea, columna, expU) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
    }
    getTipo(controlador, ts) {
        let tipo_exp1;
        let tipo_exp2;
        /** Ejemplo 1
         *  5.5 < 5 -> exp1 < exp2 -> exp1 = 5.5, exp2 = 5
         *  exp1.getTipo = DOBLE
         *  exp2.getTipo = ENTERO
         *
         */
        tipo_exp1 = this.exp1.getTipo(controlador, ts);
        tipo_exp2 = this.exp2.getTipo(controlador, ts);
        if (tipo_exp1 == Tipo_1.tipo.ERROR || tipo_exp2 == Tipo_1.tipo.ERROR) {
            return Tipo_1.tipo.ERROR;
        }
        /** segun el enununciado
         * Se pueden realizar operaciones relacionales entre: entero-entero, entero-doble,
           entero-caracter, doble-entero, doble-caracter, caracter-entero, caracterdoble,
           caracter-carácter y cualquier otra operación relacional entre entero, doble
           y carácter
         */
        if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
            if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                return Tipo_1.tipo.BOOLEANO;
            }
            else {
                return Tipo_1.tipo.ERROR;
            }
        }
        else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
            if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                return Tipo_1.tipo.BOOLEANO;
            }
            else {
                return Tipo_1.tipo.ERROR;
            }
        }
        else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
            if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE || tipo_exp2 == Tipo_1.tipo.CARACTER || tipo_exp2 == Tipo_1.tipo.CADENA) {
                return Tipo_1.tipo.BOOLEANO;
            }
            else {
                return Tipo_1.tipo.ERROR;
            }
        }
        else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
            if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                return Tipo_1.tipo.BOOLEANO;
            }
            else {
                return Tipo_1.tipo.ERROR;
            }
        }
        else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
            if (tipo_exp2 == Tipo_1.tipo.CADENA || tipo_exp2 == Tipo_1.tipo.CARACTER) {
                return Tipo_1.tipo.BOOLEANO;
            }
            else {
                controlador.errores.push(new Errores_1.default("Semantico", `No esperaba este simbolo`, this.linea, this.columna));
                return Tipo_1.tipo.ERROR;
            }
        }
        return Tipo_1.tipo.ERROR;
    }
    getValor(controlador, ts) {
        let valor_exp1;
        let valor_exp2;
        let tipo_exp1;
        let tipo_exp2;
        //Ejemplo si fuera  8 >= 8.5 -> exp1 = 8, exp2 = 8.5
        tipo_exp1 = this.exp1.getTipo(controlador, ts); // ENTERO
        tipo_exp2 = this.exp2.getTipo(controlador, ts); // DOBLE 
        valor_exp1 = this.exp1.getValor(controlador, ts); // 8
        valor_exp2 = this.exp2.getValor(controlador, ts); // 8.5
        switch (this.operador) {
            case Operacion_1.Operador.IGUALIGUAL:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semanticoS
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 == num_ascci_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_bool_exp1 = 1;
                        if (valor_exp1 == false) {
                            num_bool_exp1 = 0;
                        }
                        let num_bool_exp2 = 1;
                        if (valor_exp2 == false) {
                            num_bool_exp2 = 0;
                        }
                        return num_bool_exp1 == num_bool_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
                    if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 == valor_exp2; //"hola" == "hola"
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                break;
            case Operacion_1.Operador.DIFERENCIA:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semanticoS
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 == num_ascci_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.BOOLEANO) {
                    if (tipo_exp2 == Tipo_1.tipo.BOOLEANO) {
                        let num_bool_exp1 = 1;
                        if (valor_exp1 == false) {
                            num_bool_exp1 = 0;
                        }
                        let num_bool_exp2 = 1;
                        if (valor_exp2 == false) {
                            num_bool_exp2 = 0;
                        }
                        return num_bool_exp1 == num_bool_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CADENA) {
                    if (tipo_exp2 == Tipo_1.tipo.CADENA) {
                        return valor_exp1 == valor_exp2; //"hola" == "hola"
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        return valor_exp1 == valor_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                break;
            case Operacion_1.Operador.MENORQUE:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) { // 5 < 'a' 
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semanticoS
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 < num_ascci_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                break;
            case Operacion_1.Operador.MAYORQUE:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) { // 5 < 'a' 
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semanticoS
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 < num_ascci_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                break;
            case Operacion_1.Operador.MENORIGUAL:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) { // 5 < 'a' 
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semanticoS
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 < num_ascci_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                break;
            case Operacion_1.Operador.MAYORIGUAL:
                if (tipo_exp1 == Tipo_1.tipo.ENTERO) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) { // 5 < 'a' 
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semanticoS
                        return null;
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.DOBLE) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        return valor_exp1 < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci = valor_exp2.charCodeAt(0);
                        return valor_exp1 < num_ascci;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                else if (tipo_exp1 == Tipo_1.tipo.CARACTER) {
                    if (tipo_exp2 == Tipo_1.tipo.ENTERO || tipo_exp2 == Tipo_1.tipo.DOBLE) {
                        let num_ascci = valor_exp1.charCodeAt(0);
                        return num_ascci < valor_exp2;
                    }
                    else if (tipo_exp2 == Tipo_1.tipo.CARACTER) {
                        let num_ascci_exp1 = valor_exp1.charCodeAt(0);
                        let num_ascci_exp2 = valor_exp2.charCodeAt(0);
                        return num_ascci_exp1 < num_ascci_exp2;
                    }
                    else {
                        controlador.errores.push(new Errores_1.default("Semantico", `Incompatibilidad de tipos`, this.linea, this.columna));
                        //reportar error semantico
                    }
                }
                break;
        }
    }
    recorrer() {
        //console.log("-----sEGUNDO------")
        let padre = new Nodo_1.default("Condicion", "");
        padre.AddHijo(this.exp1.recorrer());
        padre.AddHijo(new Nodo_1.default(this.signo_operador, ""));
        padre.AddHijo(this.exp2.recorrer());
        return padre;
    }
}
exports.default = Relacional;
