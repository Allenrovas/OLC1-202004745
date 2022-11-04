"use strict";
/**
 * @class Tabla de Simbolos esta clase guarda la tabla de simbolos del programa, es decir,
 * guarda las variables, metodos y funciones
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
class TablaSimbolos {
    /**
     * @constructor creamos una nueva tabla.
     * @param ant indica quien es la tabla de simbolos anterior de la nueva tabla (para el manejo de ambitos)
     */
    constructor(ant, name) {
        this.ant = ant;
        this.tabla = new Map();
        if (ant != null) {
            ant.sig = this;
        }
        this.name = name;
    }
    agregar(id, simbolo) {
        this.tabla.set(id.toLowerCase(), simbolo); // Lo convertimos en minuscula ya que nuestro lenguaje es caseinsitive ej. variable = VARiabLE
    }
    existe(id) {
        let ts = this;
        while (ts != null) {
            let existe = ts.tabla.get(id.toLowerCase());
            if (existe != null) {
                return true;
            }
            ts = ts.ant;
        }
        return false;
    }
    getSimbolo(id) {
        let ts = this;
        while (ts != null) {
            let existe = ts.tabla.get(id.toLowerCase());
            if (existe != null) {
                return existe;
            }
            ts = ts.ant;
        }
        return null;
    }
    existeEnActual(id) {
        let ts = this;
        let existe = ts.tabla.get(id.toLowerCase());
        if (existe != null) {
            return true;
        }
        return false;
    }
}
exports.default = TablaSimbolos;
