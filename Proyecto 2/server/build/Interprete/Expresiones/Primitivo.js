"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Tipo_1 = __importDefault(require("../TablaSimbolos/Tipo"));
/**
 * @class Primitivo esta clase guarda los valores primitivos que son los enteros, dobles, cadenas, booleanos, caracteres
 * ejemplo
 * 1 -> primitivo -> tipo = ENTERO -> valor = 1
 * 1.5 -> primitivo -> tipo = DOBLE -> valor = 1.5
 * true -> primitivo -> tipo = BOOLEANO -> valor = true
 * 'A' -> primitivo -> tipo = CARACTER -> valor = A
 * "hola mundo" -> primitivo -> tipo = CADENA ->  valor = hola mundo
 */
class Primitivo {
    /**
     * @constructor creamos un nuevo primitivo
     * @param valor_primitivo hace referencia a los VALORES enteros, dobles, cadenas, caracteres, booleanos
     * @param tipo hace referencia al tipo del valor primitivo ENTERO, DOBLE, CADENA, CARACTER, BOOLEANO
     * @param linea idica la linea donde se encuentra
     * @param columna indica la columna donde se encuentra
     */
    constructor(valor_primitivo, tipo, linea, columna) {
        this.valor_primitivo = valor_primitivo;
        this.linea = linea;
        this.columna = columna;
        this.tipo = new Tipo_1.default(tipo);
    }
    getTipo(controlador, ts) {
        return this.tipo.enum_tipo;
    }
    getValor(controlador, ts) {
        return this.valor_primitivo;
    }
    recorrer() {
        let padre = new Nodo_1.default("Primitivo", ""); //Primitivo -> "hola mundo"
        padre.AddHijo(new Nodo_1.default(this.valor_primitivo.toString(), ""));
        return padre;
    }
}
exports.default = Primitivo;
