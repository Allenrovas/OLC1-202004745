"use strict";
/**
 * @class Clase que nos permitira llevar el control de errores y la consola de todo el programa.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Controlador {
    constructor() {
        this.errores = new Array();
        this.consola = "";
        this.sent_ciclica = false;
    }
    obtenererrores() {
        var TextSalida = "";
        for (let error of this.errores) {
            TextSalida += error.tipo + "," + error.descripcion + "," + error.linea + "," + error.columna;
            TextSalida += '~';
        }
        return TextSalida;
    }
    print(cadena, tipo) {
        if (tipo) {
            this.consola = this.consola + cadena + " \r\n ";
        }
        else {
            this.consola = this.consola + cadena;
        }
    }
    append(cadena) {
        this.consola = this.consola + cadena + " \r\n ";
    }
    /**
     * @function graficar_ts funcion para graficar la tabla de simbolos
     * @param controlador lleva el control del programa
     * @param ts accede a la tabla de simbolos
     * @returns retorna el cuerpo de la tabla de simbolos de html
     */
    graficar_ts(controlador, ts) {
        var TextSalida = "";
        //console.log("------------------------------------------------------------------")
        while (ts != null) {
            //console.log(ts)
            ts.tabla.forEach((sim, key) => {
                TextSalida += this.getRol(sim) + "," + sim.identificador + "," + this.getTipo(sim) + "," + this.getAmbito(ts) + "," + this.getValor(sim) + "," + this.parametros(sim) + "," + sim.linea + "," + sim.columna;
                TextSalida += '~';
            });
            ts = ts.sig;
        }
        //console.log(TextSalida)
        return TextSalida;
    }
    /**
     * @function getValor obtiene el valor del simbolo de la tabla
     * @param sim simbolo de la tabla
     * @returns retorna el valor del simbolo
     */
    getValor(sim) {
        if (sim.valor != null) {
            return sim.valor.toString();
        }
        else {
            return '...';
        }
    }
    /**
     * @function getTipo obtiene el tipo del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el tipo del simbolo
     */
    getTipo(sim) {
        try {
            return sim.tipo.nombre_tipo.toLowerCase();
        }
        catch (error) {
            return sim.tipo.toString();
        }
    }
    /**
     * @function getTipo obtiene el rol del simbolo de la tabla
     * @param sim  simbolo de la tabla
     * @returns retorna el rol del simbolo
     */
    getRol(sim) {
        let rol = '';
        switch (sim.simbolo) {
            case 1:
                rol = "variable";
                break;
            case 2:
                rol = "funcion";
                break;
            case 3:
                rol = "metodo";
                break;
            case 4:
                rol = "vector";
                break;
            case 5:
                rol = "lista";
                break;
            case 6:
                rol = "parametro";
                break;
        }
        return rol;
    }
    /**
    * @function getTipo Le indicamos el ambito del simbolo
    * @returns retorna el ambito del simbolo
    */
    getAmbito(ts) {
        if (ts.name != null) {
            return ts.name;
        }
        return 'global';
    }
    /**
    * @function getTipo obtiene la cantidad de parametros del simbolo de la tabla
    * @param sim  simbolo de la tabla
    * @returns retorna la cantidad de parametros del simbolo si es que tiene
    */
    parametros(sim) {
        if (sim.lista_params != undefined) {
            return sim.lista_params.length;
        }
        else {
            return "...";
        }
    }
}
exports.default = Controlador;
