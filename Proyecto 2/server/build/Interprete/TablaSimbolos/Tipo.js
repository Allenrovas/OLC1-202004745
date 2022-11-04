"use strict";
/**
 * @enum de Tipo nos permite enumerar los tipos del lenguaje
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipo = void 0;
var tipo;
(function (tipo) {
    tipo[tipo["ENTERO"] = 0] = "ENTERO";
    tipo[tipo["DOBLE"] = 1] = "DOBLE";
    tipo[tipo["BOOLEANO"] = 2] = "BOOLEANO";
    tipo[tipo["CARACTER"] = 3] = "CARACTER";
    tipo[tipo["CADENA"] = 4] = "CADENA";
    tipo[tipo["ERROR"] = 5] = "ERROR";
    tipo[tipo["VOID"] = 6] = "VOID";
})(tipo = exports.tipo || (exports.tipo = {}));
/**
 * @class me permite llevar el control de los tipos del programa ENTERO, DOBLE, CADENA ...
 */
class Tipo {
    /**
     * @constructor Guarda el string con el nombre del tipo y el enum que identifica al tipo
     */
    constructor(nombre_tipo) {
        this.nombre_tipo = nombre_tipo;
        this.enum_tipo = this.gettipo();
    }
    gettipo() {
        if (this.nombre_tipo == 'ENTERO') {
            return tipo.ENTERO;
        }
        else if (this.nombre_tipo == 'DOBLE') {
            return tipo.DOBLE;
        }
        else if (this.nombre_tipo == 'CADENA') {
            return tipo.CADENA;
        }
        else if (this.nombre_tipo == 'CARACTER') {
            return tipo.CARACTER;
        }
        else if (this.nombre_tipo == 'BOOLEANO') {
            return tipo.BOOLEANO;
        }
        else if (this.nombre_tipo == 'VOID') {
            return tipo.VOID;
        }
        else {
            return tipo.ERROR;
        }
    }
}
exports.default = Tipo;
