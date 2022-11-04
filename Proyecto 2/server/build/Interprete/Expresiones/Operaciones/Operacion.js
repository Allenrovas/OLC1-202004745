"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Operador = void 0;
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
/**
 * @enum Este sirve para enumerar la lista de operadores que maneja nuestro lenguaje
 */
var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["POT"] = 4] = "POT";
    Operador[Operador["MOD"] = 5] = "MOD";
    Operador[Operador["UNARIO"] = 6] = "UNARIO";
    Operador[Operador["IGUALIGUAL"] = 7] = "IGUALIGUAL";
    Operador[Operador["DIFERENCIA"] = 8] = "DIFERENCIA";
    Operador[Operador["MENORQUE"] = 9] = "MENORQUE";
    Operador[Operador["MAYORQUE"] = 10] = "MAYORQUE";
    Operador[Operador["MENORIGUAL"] = 11] = "MENORIGUAL";
    Operador[Operador["MAYORIGUAL"] = 12] = "MAYORIGUAL";
    Operador[Operador["OR"] = 13] = "OR";
    Operador[Operador["AND"] = 14] = "AND";
    Operador[Operador["NOT"] = 15] = "NOT";
    Operador[Operador["CASTEOINT"] = 16] = "CASTEOINT";
    Operador[Operador["CASTEODOUBLE"] = 17] = "CASTEODOUBLE";
    Operador[Operador["CASTEOCHAR"] = 18] = "CASTEOCHAR";
    Operador[Operador["CASTEOSTRING"] = 19] = "CASTEOSTRING";
    Operador[Operador["CASTEOTIPO"] = 20] = "CASTEOTIPO";
    Operador[Operador["UPPER"] = 21] = "UPPER";
    Operador[Operador["LOWER"] = 22] = "LOWER";
    Operador[Operador["LENGHT"] = 23] = "LENGHT";
    Operador[Operador["ROUND"] = 24] = "ROUND";
    Operador[Operador["CHARARRAY"] = 25] = "CHARARRAY";
    Operador[Operador["CASTEOBOOLEAN"] = 26] = "CASTEOBOOLEAN";
    Operador[Operador["X"] = 27] = "X";
})(Operador = exports.Operador || (exports.Operador = {}));
/**
 * @class Clase para el manejo de operaciones del programa
 */
class Operacion {
    /**
      * @constructor Creamos una nueva operacion
      * @param exp1 expresion izquierda de la operacion
      * @param signo_operador operador de la operacion
      * @param exp2 expresion derecha de la operacion
      * @param linea linea donde se ubica la operacion
      * @param columna columna donde se ubica la operacion
      * @param expU boolean que indica si la operacion es una expresion unaria
      */
    constructor(exp1, signo_operador, exp2, linea, columna, expU) {
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.columna = columna;
        this.linea = linea;
        this.signo_operador = signo_operador;
        this.expU = expU;
        this.operador = this.getOperador(signo_operador);
    }
    /**
     * @function getOperador obtiene el tipo de operador que se maneja
     * @param op operador en string
     * @returns retorna un tipo de operador
     */
    getOperador(signo_operador) {
        if (signo_operador == '+') {
            return Operador.SUMA;
        }
        else if (signo_operador == '-') {
            return Operador.RESTA;
        }
        else if (signo_operador == '*') {
            return Operador.MULTIPLICACION;
        }
        else if (signo_operador == '/') {
            return Operador.DIVISION;
        }
        else if (signo_operador == 'UNARIO') {
            return Operador.UNARIO;
        }
        else if (signo_operador == '^') {
            return Operador.POT;
        }
        else if (signo_operador == '%') {
            return Operador.MOD;
        }
        else if (signo_operador == '<') {
            return Operador.MENORQUE;
        }
        else if (signo_operador == '>') {
            return Operador.MAYORQUE;
        }
        else if (signo_operador == '<=') {
            return Operador.MENORIGUAL;
        }
        else if (signo_operador == '>=') {
            return Operador.MAYORIGUAL;
        }
        else if (signo_operador == '||') {
            return Operador.OR;
        }
        else if (signo_operador == '&&') {
            return Operador.AND;
        }
        else if (signo_operador == '!') {
            return Operador.NOT;
        }
        else if (signo_operador == '==') {
            return Operador.IGUALIGUAL;
        }
        else if (signo_operador == '!=') {
            return Operador.DIFERENCIA;
        }
        else if (signo_operador == '(int)') {
            return Operador.CASTEOINT;
        }
        else if (signo_operador == '(boolean)') {
            return Operador.CASTEOBOOLEAN;
        }
        else if (signo_operador == '(double)') {
            return Operador.CASTEODOUBLE;
        }
        else if (signo_operador == '(char)') {
            return Operador.CASTEOCHAR;
        }
        else if (signo_operador == '(string)') {
            return Operador.CASTEOSTRING;
        }
        else if (signo_operador == '(tipo)') {
            return Operador.CASTEOTIPO;
        }
        else if (signo_operador == '(lower)') {
            return Operador.LOWER;
        }
        else if (signo_operador == '(upper)') {
            return Operador.UPPER;
        }
        else if (signo_operador == '(length)') {
            return Operador.LENGHT;
        }
        else if (signo_operador == '(round)') {
            return Operador.ROUND;
        }
        else if (signo_operador == '(chararray)') {
            return Operador.CHARARRAY;
        }
        else {
            return Operador.X;
        }
    }
    /**
     * En esta clase no agregaremos codigo en los metodos de abajo.
     * Ya que esta es la clase padre le heredamos el contructor a las clases que extienden de el
     */
    getTipo(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    getValor(controlador, ts) {
        throw new Error("Method not implemented.");
    }
    recorrer() {
        let padre = new Nodo_1.default("Condicion!", "");
        //console.log("22222222222222222")
        //console.log(this.exp1.recorrer())
        //console.log(this.exp2.recorrer())
        return padre;
    }
}
exports.default = Operacion;
