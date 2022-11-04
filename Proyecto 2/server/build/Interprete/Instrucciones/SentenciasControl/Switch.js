"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Errores_1 = __importDefault(require("../../Ast/Errores"));
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
const TablaSimbolos_1 = __importDefault(require("../../TablaSimbolos/TablaSimbolos"));
const Break_1 = __importDefault(require("../SentenciasTransferencia/Break"));
class Switch {
    constructor(condicion, lista_casos, ist_default, linea, column) {
        this.condicion = condicion;
        this.lista_casos = lista_casos;
        this.ist_default = ist_default;
        this.linea = linea;
        this.column = column;
    }
    ejecutar(controlador, ts) {
        //switch (1){ 
        // case 1: 
        //print("es uno");
        //break;
        // case 2: 
        //print("es dos"); 
        //default: 
        //print("default");
        //}
        console.log("sadsdasdsadsad");
        console.log(this.condicion);
        let ts_local = new TablaSimbolos_1.default(ts, ts.name);
        // Manejamos 2 banderas 
        let bandera_break = false; // nos indica cuando dentro de un caso vino la sentencia break
        let bandera_entro_caso = false; // nos indica cuando paso las validaciones y entro a ejecutar las instrucciones de un caso
        //la bandera si entro al caso es necesaria ya que si entramos a ejecutar un caso y no tiene un break continua ejecutando los siguientes casos hasta encontrar un break
        for (let caso of this.lista_casos) {
            if (this.condicion.getTipo(controlador, ts) == caso.valor.getTipo(controlador, ts)) {
                //Validamos si la condicion tiene el mismo valor del caso y si no es el mismo valor validamos si ya entro a ejecutar un caso
                if (this.condicion.getValor(controlador, ts) == caso.valor.getValor(controlador, ts) || bandera_entro_caso) {
                    bandera_entro_caso = true; //indicamos que entro a ejecutar un caso
                    let res = caso.ejecutar(controlador, ts_local);
                    if (res instanceof Break_1.default) {
                        console.log("Cometi un error");
                        bandera_break = true;
                        return null;
                    }
                }
            }
            else {
                controlador.errores.push(new Errores_1.default("Semantico", `no se esperaba este simbolo`, this.linea, this.column));
                //error
            }
        }
        if (!bandera_break && this.ist_default != null) {
            let res = this.ist_default.ejecutar(controlador, ts_local);
            if (res instanceof Break_1.default) {
                console.log("Cometi un error x2");
                bandera_break = true;
                return null;
            }
        }
    }
    recorrer() {
        let padre = new Nodo_1.default("Instruccion", "");
        let switch_var = new Nodo_1.default("Switch", "");
        switch_var.AddHijo(this.condicion.recorrer());
        padre.AddHijo(switch_var);
        for (let caso of this.lista_casos) {
            padre.AddHijo(caso.recorrer());
        }
        if (this.ist_default != null) {
            let default_nodo = new Nodo_1.default("Deafault", "");
            default_nodo.AddHijo(this.ist_default.recorrer());
            padre.AddHijo(default_nodo);
        }
        return padre;
    }
}
exports.default = Switch;
