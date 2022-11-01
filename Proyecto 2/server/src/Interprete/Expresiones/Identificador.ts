import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Expresion } from "../Interfaces/Expresion";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import { tipo } from "../TablaSimbolos/Tipo";


export default class Identificador implements Expresion{

    public identificador : string;
    public linea : number;
    public columna : number;

    public I1 : any;
    public I2 : any;

    constructor(identifador: string, linea : number, columna : number,I1?:Expresion ,I2?:Expresion) {
        this.identificador = identifador;
        this.linea = linea;
        this.columna = columna;
        this.I1 = I1;
        this.I2 = I2;
    }
    //writeline(x)
    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        let existe_id = ts.getSimbolo(this.identificador);

        if(existe_id != null){
            return existe_id.tipo.enum_tipo;
        }else{
            return tipo.ERROR;
        }
    }
    getValor(controlador: Controlador, ts: TablaSimbolos) {
        let existe_id = ts.getSimbolo(this.identificador);
        //console.log("TRTANDO DE RECUPERAR")
        //console.log(existe_id?.valor)
        if(existe_id != null){

            if(this.I2!= null){
                let indice1 = this.I1.getValor(controlador,ts);
                let indice2 = this.I2.getValor(controlador,ts);

                if(existe_id.valor[indice1][indice2] == undefined ){
                
                    controlador.errores.push(new Errores("Semantico", `Indice fuera del tamaño del arreglo`, this.linea, this.columna));
                    return "*Error indice: " + [indice1] + " fuera de los parametros"
                }
               
                return existe_id.valor[indice1][indice2];
            }else if(this.I1 != null){
               // console.log("TRTANDO DE RECUPERAR")
                let indice1 = this.I1.getValor(controlador,ts);
                if(existe_id.valor[indice1] == undefined){
                    controlador.errores.push(new Errores("Semantico", `Indice fuera del tamaño del arreglo`, this.linea, this.columna));
                    return "*Error indice: " + [indice1] + " fuera de los parametros"
                }
               
                return existe_id.valor[indice1];
            }else{
               // console.log("RETORNANDO")
               // console.log(existe_id.valor)
                return existe_id.valor;
            }
        }else{
            controlador.errores.push(new Errores("Semantico", `No se encontro dato`, this.linea, this.columna));
            // reportar error semantico
            return null;
        }
    }
    recorrer(): Nodo {
        let padre = new Nodo("Identificador","");
        padre.AddHijo(new Nodo(this.identificador,""));
        
         return padre;
    }
}