"use strict";
/**
 * @class Simbolo esta clase define los simbolos del lenguaje que seran variables o funciones/metodos
 * los metodos para esta clase seran explicados proximamente
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    /**
     * @constructor
     * @param simbolo indica el tipo de simbolo que es: 1- variable  2- funcion  3- metodo  4- vector  5- lista  6- param
     * @param tipo indica el tipo de la variable
     * @param identificador nombre identificador de la variable
     * @param valor valor de la variable
     * @param lista_params lista de simbolos de tipo parametro (para funciones o metodos)
     * @param metodo booleano que indica si es metodo (true) o funcion (false)
     */
    constructor(simbolo, tipo, identificador, valor, linea, columna, lista_params, metodo, ambito) {
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.lista_params = lista_params;
        this.metodo = metodo;
        this.ambito = ambito;
        this.linea = linea;
        this.columna = columna;
    }
    setValor(valor, I1, I2) {
        if (I2 != null) {
            if (I1 != null) {
                if (I1 < this.valor.length || I2 < this.valor.length) {
                    this.valor[I1][I2] = valor;
                }
                else {
                    console.log("ERROR FUER ADE INDICE");
                }
            }
        }
        else if (I1 != null) {
            if (I1 < this.valor.length) {
                this.valor[I1] = valor;
            }
            else {
                console.log("ERROR FUER ADE INDICE");
            }
        }
        else {
            this.valor = valor;
        }
    }
}
exports.default = Simbolo;
