import Errores from "../Ast/Errores";
import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import Primitivo from "../Expresiones/Primitivo";
import { Expresion } from "../Interfaces/Expresion";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolo";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo, { tipo } from "../TablaSimbolos/Tipo";

export default class Declaracion implements Instruccion{
    
    public type : Tipo; 
    public lista_ids : Array<string>;
    public expresion : Expresion;

    public linea : number;
    public columna: number;

    public E1 : Expresion;
    public E2 : Expresion;
    public typeArray : any; 

    public Array:any;
    constructor(type : Tipo, lista_ids : Array<string>, expresion: any, linea : number, columna: number,typeArray?:Tipo ,E1?:any,E2?:any,Array?:any) {
        this.type = type;
        this.lista_ids = lista_ids;
        this.expresion = expresion;
        this.linea = linea; 
        this.columna = columna;
        this.E1= E1;
        this.E2= E2;
        this.typeArray=typeArray;
        this.Array=Array;
    }

    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
        // int x, y, z = 0;
        // int a = 9;
        // boolean verdadero;
        for(let id of this.lista_ids){

            //1er paso. verificar si existe en la tabla de simbolos actual
            if(ts.existeEnActual(id)){
                let error = new Errores("Semantico", `La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar.`, this.linea, this.columna);
                controlador.errores.push(error);
                
                controlador.append(` *** ERROR: Semantico, La variable ${id} ya existe en el entorno actual, por lo que no se puede declarar. En la linea ${this.linea} y columna ${this.columna}`)
                continue;
            }
            //console.log(this)
            //console.log("----------------------------")
            //console.log( this.type.enum_tipo);

            if(this.E1 == null){ 
               
                    
                if(this.expresion != null){
                    
                   
                    let tipo_valor = this.expresion.getTipo(controlador, ts); //ENTERO
                    let valor = this.expresion.getValor(controlador,ts); //0
                    //console.log(this)
                    //console.log("----------------------------")
                    //console.log( this.type.enum_tipo);
                    //console.log(tipo_valor);
                    //console.log(valor);

                    if(tipo_valor == this.type.enum_tipo) {
                        let nuevo_simbolo = new Simbolo(1, this.type, id, valor,this.linea,this.columna);
                        ts.agregar(id, nuevo_simbolo);
                    }else{
                        //Tomar en cuenta casteos implicitos
                        if(this.type.enum_tipo == tipo.DOBLE && tipo_valor == tipo.ENTERO){
                            let nuevo_simbolo = new Simbolo(1, this.type, id, valor,this.linea,this.columna);
                            ts.agregar(id, nuevo_simbolo); 
                        }else if(this.type.enum_tipo == tipo.ENTERO && tipo_valor == tipo.DOBLE){
                            let nuevo_simbolo = new Simbolo(1, this.type, id, Math.trunc(valor),this.linea,this.columna);
                            ts.agregar(id, nuevo_simbolo); // int x = 9.7; -> x = 9
                        }else{
                            //reportar error semantico 
                        }
                    }
                }else{
                    let nuevo_simbolo = new Simbolo(1, this.type, id, null,this.linea,this.columna);
                    ts.agregar(id, nuevo_simbolo);
                    
                    if(this.type.enum_tipo == tipo.ENTERO){
                        nuevo_simbolo.setValor(0);
                    }else if(this.type.enum_tipo == tipo.DOBLE){
                        nuevo_simbolo.setValor(0.0);
                    }else if(this.type.enum_tipo == tipo.BOOLEANO){
                        nuevo_simbolo.setValor(true);
                    }else if(this.type.enum_tipo == tipo.CADENA){
                        nuevo_simbolo.setValor("");
                    }else if(this.type.enum_tipo == tipo.CARACTER){
                        nuevo_simbolo.setValor('0');
                    }
                }
            }else{
                if( this.E2 == null){
                    let tipo_valor = this.E1.getTipo(controlador, ts); //ENTERO
                    let valor = this.E1.getValor(controlador,ts); //0
                   // console.log(this)
                    //console.log("----------------------------")
                    //console.log( this.type.enum_tipo);
                    //console.log(tipo_valor);
                    //console.log(valor);
                    //console.log(new Array(valor));
                    var valores =  new Array(valor)
                    let nuevo_simbolo = new Simbolo(4, this.type, id, valores,this.linea,this.columna);
                    ts.agregar(id, nuevo_simbolo);
                }else{
                   
                    let global = new Array();
                    let i:number = 1;
                    let j:number = 1;
                    for(let obj of this.Array){

                        let temp = new Array();
                      
                        for(let oj of obj){
                                
                            if(! (oj  instanceof Primitivo)){
                                temp.push(oj)
                              
                            }else{
                                temp.push(oj.getValor(controlador, ts))

                            }
                        }
                        global.push(temp);
                    }
                    //var probandp = global.toString()
                    //console.log(probandp)

                   console.log(global[3])
                    

                    let nuevo_simbolo = new Simbolo(4, this.type, id, global,this.linea,this.columna);
                    ts.agregar(id, nuevo_simbolo);
                }
            }
        }
        return null;
    }
    recorrer(): Nodo {
    try {
        
       let padre = new Nodo("DECLARACION", "");

       padre.AddHijo(new Nodo(this.type.nombre_tipo, ""));

       let hijos_id = new Nodo("Ids",""); 
       for(let id of this.lista_ids){
        hijos_id.AddHijo(new Nodo(id, ""));
       }

       


       padre.AddHijo(hijos_id);
       if(this.expresion != null){
           padre.AddHijo(this.expresion.recorrer())
       }

    if(this.E2 != null){
        let dimension = new Nodo("Posiciones","");
        dimension.AddHijo(this.E1.recorrer());

       // let dimension2 = new Nodo("Posiciones","");
        //dimension2.AddHijo(this.E2.recorrer());

        padre.AddHijo(dimension);
       // padre.AddHijo(dimension2);
            
    }else if(this.E1!= null){
    
        let dimension = new Nodo("Posiciones","");
        dimension.AddHijo(this.E1.recorrer());
        padre.AddHijo(dimension);
    }
    return padre;   
    } catch (error) {
        let padre = new Nodo("DECLARACION", "");
        return padre
    }   
    }
}