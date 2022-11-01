import Nodo from "../Ast/Nodo";
import Controlador from "../Controlador";
import { Instruccion } from "../Interfaces/Instruccion";
import Simbolo from "../TablaSimbolos/Simbolo";
import TablaSimbolos from "../TablaSimbolos/TablaSimbolos";
import Tipo from "../TablaSimbolos/Tipo";

export default class Funcion extends Simbolo implements Instruccion{

    public lista_instrucciones : Array<Instruccion>;
    public linea : number;
    public columna : number;

    
    constructor(simbolo: number, tipo: Tipo, identificador: string, lista_params:Array<Simbolo>, metodo:boolean, lista_instrucciones : Array<Instruccion>, linea: number, columna: number ) {
        super(simbolo, tipo, identificador, null,linea,columna, lista_params, metodo);
        this.lista_instrucciones = lista_instrucciones;
        this.linea = linea;
        this.columna = columna;
    }

    //-- agregamos un metodo para agregar el simbolo de la funcion a la tabla de simbolos
    agregarFuncionTS(ts: TablaSimbolos){
        console.log(`guardamos ${this.identificador}`);
         if(!(ts.existe(this.identificador))){
             ts.agregar(this.identificador, this);
         }else{
             // error semantico.
         }
    }


    ejecutar(controlador: Controlador, ts: TablaSimbolos) {
       // Aqui solo necesitamos mandar a ejecutar las instrucciones ya que las validaciones para llegar hasta aca se hacen en la clase llamada
       let ts_local = new TablaSimbolos(ts,this.identificador);
        //console.log("estamos en funcion");
        
       for(let inst of this.lista_instrucciones){
           
            let retorno = inst.ejecutar(controlador,ts_local);

            if(retorno != null){
                return retorno;
            }
       }

       return null;
    }

    recorrer(): Nodo {
        let padre = new Nodo("Funcion",""); 

        try{
            padre.AddHijo(new Nodo(this.tipo.nombre_tipo.toString(),""));
           
        }catch (error) {
            padre.AddHijo(new Nodo(this.tipo.toString(),""));
        }

      
        padre.AddHijo(new Nodo(this.identificador.toString(),""));
        
        padre.AddHijo(new Nodo("(",""));

        //TODO: AGREGAR NODOS PARAMETROS SOLO SI HAY
        
        if(this.lista_params != null){
            //console.log("Lista parametros")
           // console.log(this.lista_params)
         

            let Parametros = new Nodo("Parametros","");

            for(let parametro of this.lista_params){
                let Tipo = new Nodo(parametro.tipo.nombre_tipo,"")
                Tipo.AddHijo(new Nodo(parametro.identificador.toString(),""));
                Parametros.AddHijo(Tipo)
            } 

            padre.AddHijo(Parametros);
        }
        

        padre.AddHijo(new Nodo(")",""));

        padre.AddHijo(new Nodo("{",""));

        let hijo_instrucciones = new Nodo("Instrucciones","");
  
        
        for(let inst of this.lista_instrucciones){
            hijo_instrucciones.AddHijo(inst.recorrer());
        }
        
        padre.AddHijo(hijo_instrucciones);
        padre.AddHijo(new Nodo("}",""));
        
       return padre;
    }
}