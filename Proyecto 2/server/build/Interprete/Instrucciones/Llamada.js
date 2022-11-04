"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errores_1 = __importDefault(require("../Ast/Errores"));
const Nodo_1 = __importDefault(require("../Ast/Nodo"));
const Simbolo_1 = __importDefault(require("../TablaSimbolos/Simbolo"));
const TablaSimbolos_1 = __importDefault(require("../TablaSimbolos/TablaSimbolos"));
class Llamada {
    constructor(identificador, parametros, linea, columna) {
        this.identificador = identificador;
        this.parametros = parametros;
        this.columna = columna;
        this.linea = linea;
    }
    getTipo(controlador, ts) {
        let simbolo_funcion = ts.getSimbolo(this.identificador);
        return simbolo_funcion.tipo.enum_tipo;
    }
    getValor(controlador, ts) {
        //1. Verificar si el método existe en la tabla de símbolos.
        if (ts.existe(this.identificador)) {
            //2. Crear una nueva tabla de símbolos la cual será local.
            let ts_local = new TablaSimbolos_1.default(ts, ts.name);
            //3. obtener el simbolo del metodo 
            let simbolo_funcion = ts.getSimbolo(this.identificador);
            //4. verificar si los parametros estan correctos
            if (this.validar_parametros(this.parametros, simbolo_funcion.lista_params, controlador, ts, ts_local)) {
                let retorno = simbolo_funcion.ejecutar(controlador, ts_local);
                if (retorno != null) {
                    return retorno;
                }
            }
        }
        else {
            controlador.errores.push(new Errores_1.default("Semantico", `No existe la funcion a llamar`, this.linea, this.columna));
            // error semantico no existe el metodo a llamar
        }
    }
    // string s = holamundo();
    // string holamundo(){  writeline("hola mundo"); return "holamundo "; }
    ejecutar(controlador, ts) {
        //1. Verificar si el método existe en la tabla de símbolos.
        if (ts.existe(this.identificador)) {
            //2. Crear una nueva tabla de símbolos la cual será local.
            let ts_local = new TablaSimbolos_1.default(ts, ts.name);
            //3. obtener el simbolo del metodo 
            let simbolo_funcion = ts.getSimbolo(this.identificador);
            console.log("llamada");
            //4. verificar si los parametros estan correctos
            if (this.validar_parametros(this.parametros, simbolo_funcion.lista_params, controlador, ts, ts_local)) {
                let retorno = simbolo_funcion.ejecutar(controlador, ts_local);
                if (retorno != null) {
                    return retorno;
                }
            }
        }
        else {
            controlador.errores.push(new Errores_1.default("Semantico", `No existe el metodo a llamar`, this.linea, this.columna));
            // error semantico no existe el metodo a llamar
        }
    }
    validar_parametros(parametros_llamada, parametros_funcion, controlador, ts, ts_local) {
        /* 4. Verificar si la cantidad de parámetros en la llamada
            es igual a la cantidad de parámetros que posee el método. */
        //console.log("validar params");
        if (parametros_llamada.length == parametros_funcion.length) {
            //--> parametros desde funcion/metodo
            let aux; // -> parametro
            let aux_id; // -> id parametro 
            let aux_tipo; //-> tipo parametro 
            //--> valores de la llamada
            let aux_exp; //-> expresion que se le va a asignar al parametro 
            let aux_exp_tipo; //-> tipo de la expresio 
            let aux_exp_valor; //-> valor de la expresion 
            // 5. Verificar que cada valor a asignar sea del mismo tipo de los parametros del metodo.
            for (let i = 0; i < parametros_llamada.length; i++) {
                // void suma( int n1 , int n2){... }
                // suma(3,4); 
                // int n1 = 3; int n2 = 4; 
                //--> vamos a guardar la informacion del parametro de la funcion
                aux = parametros_funcion[i];
                aux_id = aux.identificador;
                aux_tipo = aux.tipo.enum_tipo; // ENTERO, DOBLE 
                //--> Vamos a guardar la informacion del parametro de la llamada
                aux_exp = parametros_llamada[i];
                aux_exp_tipo = aux_exp.getTipo(controlador, ts);
                aux_exp_valor = aux_exp.getValor(controlador, ts);
                // validar si el valor del parametro de llamada es igual al valor del parametro de la funcion
                if (aux_tipo == aux_exp_tipo) {
                    // 5. a) Si son del mismo tipo se debe de guardar cada parámetro con su valor en la tabla de símbolos local. 
                    let simbolo = new Simbolo_1.default(aux.simbolo, aux.tipo, aux_id, aux_exp_valor, this.linea, this.columna);
                    ts_local.agregar(aux_id, simbolo);
                }
            }
            return true;
        }
        else {
            controlador.errores.push(new Errores_1.default("Semantico", `No se esperaba este dato`, this.linea, this.columna));
            //reportamos error semantico
            return false;
        }
        return true;
    }
    recorrer() {
        let padre = new Nodo_1.default("Llamada", "");
        padre.AddHijo(new Nodo_1.default(this.identificador, ""));
        padre.AddHijo(new Nodo_1.default("(", ""));
        //TODO: AGREGAR NODOS HIJOS DE PARAMETROS
        if (this.parametros != null) {
            let parametros = new Nodo_1.default("Parametros", "");
            for (let para of this.parametros) {
                parametros.AddHijo(para.recorrer());
            }
            padre.AddHijo(parametros);
        }
        padre.AddHijo(new Nodo_1.default(")", ""));
        return padre;
    }
}
exports.default = Llamada;
