import e from "express";
import Errores from "../../Ast/Errores";
import Nodo from "../../Ast/Nodo";
import Controlador from "../../Controlador";
import { Expresion } from "../../Interfaces/Expresion";
import TablaSimbolos from "../../TablaSimbolos/TablaSimbolos";
import { tipo } from "../../TablaSimbolos/Tipo";
import Operacion, { Operador } from "./Operacion";

export default class Logica extends Operacion implements Expresion{

    /**
     * @constructor este constructor utiliza el mismo de la clase Operacion
     */
    constructor(exp1: Expresion, signo_operador : string, exp2: Expresion, linea: number, columna : number, expU: boolean) {
        super(exp1, signo_operador, exp2, linea, columna, expU);
        
    }


    getTipo(controlador: Controlador, ts: TablaSimbolos): tipo {
        
        let tipo_exp1 : tipo;
        let tipo_exp2 : tipo; 
        let tipo_expU : tipo;

           
        if(this.expU == false){
             /** Ejemplo 1
             *  true || flase -> exp1 or exp2 -> exp1 = true, exp2 = false
             *  exp1.getTipo = BOOLEANO 
             *  exp2.getTipo = BOOLEANO
             * 
             *  Ejemplo 2
             *  false || 5 > 4.9 -> exp1 or exp2 -> exp1 = false, exp2 = 5 > 4.9 -> 
             *  exp1.getTipo = BOOLEANO 
             *  exp2.getTipo = BOOLEANO
             */
            tipo_exp1 = this.exp1.getTipo(controlador,ts); // BOOLEANO
            tipo_exp2 = this.exp2.getTipo(controlador,ts); // BOOLEANO 
                
            tipo_expU = tipo.ERROR;
     
    
        }else{ 
           

            tipo_expU = this.exp1.getTipo(controlador,ts);
            //console.log("PASO 1 -" + tipo_expU + " " + this.exp1.getValor(controlador,ts));
            
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;
    
        }
        
            /** segun el enununciado 
             * Se comparan simbolos a nivel logico -> verdadero o falso 
             */
            
       // console.log("valor: " + this.exp1.getValor(controlador,ts));
        if(this.expU == false){ 
            if(tipo_exp1 == tipo.BOOLEANO){
                if(tipo_exp2 == tipo.BOOLEANO){
                    return tipo.BOOLEANO;
                }else{
                    return tipo.ERROR;
                }
            }else{
               return tipo.ERROR;
            }
        }else{

            if(this.operador == Operador.CHARARRAY||this.operador == Operador.CASTEOINT || this.operador == Operador.CASTEODOUBLE || this.operador == Operador.CASTEOSTRING || this.operador == Operador.CASTEOCHAR ||  this.operador == Operador.CASTEOTIPO || this.operador == Operador.UPPER ||  this.operador == Operador.LOWER || this.operador == Operador.LENGHT || this.operador == Operador.ROUND)

                switch (this.operador) {
                    case Operador.CASTEOINT:
                        return tipo.ENTERO;
                        break;
        
                    case Operador.CASTEODOUBLE:
                        return tipo.DOBLE;
                        break;
        
                    case Operador.CASTEOSTRING:
                        return tipo.CADENA;
                        break;
        
                    case Operador.CASTEOCHAR:
                        return tipo.CARACTER;
                        break;
                    
                    case Operador.CASTEOTIPO:
                        return tipo.CADENA;
                        break;

                    case Operador.UPPER:
                        return tipo.CADENA;
                        break;
                        
                    case Operador.LOWER:
                        return tipo.CADENA;
                        break;
                    
                    case Operador.LENGHT:
                            return tipo.ENTERO;
                            break;
                    case Operador.ROUND:
                        return tipo.ENTERO;
                        break;
                    case Operador.CHARARRAY:
                        return tipo.CARACTER;
                        break;
                    default:
                        return tipo.ERROR;
                        break;
            }else{
                
                if(tipo_expU == tipo.BOOLEANO){
                    return tipo.BOOLEANO;  
                }else{
                    return tipo.ERROR;
                }
            }  

        }
                
        return tipo.ERROR;

    }

    getValor(controlador: Controlador, ts: TablaSimbolos) {
        
        let valor_exp1;
        let valor_exp2;
        let valor_expU;

        let tipo_exp1 :tipo;
        let tipo_exp2 : tipo;
        let tipo_expU : tipo;

 
        if(this.expU == false){
             /** 
             *  Ejemplo 
             *  false || 5 > 4.9 -> exp1 or exp2 -> exp1 = false, exp2 = 5 > 4.9 = true 
             *  exp1.getTipo = BOOLEANO 
             *  exp2.getTipo = BOOLEANO
             */
            tipo_exp1 = this.exp1.getTipo(controlador,ts); // BOOLEANO
            tipo_exp2 = this.exp2.getTipo(controlador,ts); // BOOLEANO 
            
            tipo_expU = tipo.ERROR;

            valor_exp1 = this.exp1.getValor(controlador,ts); // false 
            valor_exp2 = this.exp2.getValor(controlador,ts); // true

        }else{
            /**
             * Ejemplo
             * !(9 > 10) -> !exp1 = exp1 = (9>10) = false 
             */
            tipo_expU = this.exp1.getTipo(controlador,ts); // BOOLEANO
            tipo_exp1 = tipo.ERROR;
            tipo_exp2 = tipo.ERROR;

            valor_expU = this.exp1.getValor(controlador,ts); // false

        }
        //console.log("--------------------LLEGO---------------------------------")
        //console.log(this.operador)
        switch (this.operador) {
            case Operador.AND:
                if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO ){
                        return valor_exp1 && valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica AND.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica AND. En la linea ${this.linea} y columna ${this.columna}`)
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica AND ya que solo se permiten valores booleanos.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica AND ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                } 
                break;
            case Operador.OR:
                if(tipo_exp1 == tipo.BOOLEANO){
                    if(tipo_exp2 == tipo.BOOLEANO ){
                       return valor_exp1 || valor_exp2;
                    }else{
                        let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica OR.`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica OR. En la linea ${this.linea} y columna ${this.columna}`)
                        return null;
                    }
                }else{
                    let error = new Errores("Semantico", `Incompatibilidad de tipos, no se puede realizar la operacion logica OR ya que solo se permiten valores booleanos.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, Incompatibilidad de tipos, no se puede realizar la operacion logica OR ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                } 
                break;
            case Operador.NOT:
                if(tipo_expU == tipo.BOOLEANO){
                    return !valor_expU; 
                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;
            case Operador.CASTEOINT:
                if(tipo_expU == tipo.CARACTER || tipo_expU == tipo.DOBLE){

                    if(tipo_expU == tipo.CARACTER){
                        return valor_expU.charCodeAt(0);; 
                    }else{
                        return valor_expU | 0;
                    }
                    
                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion de casteo int`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;
            case Operador.CASTEODOUBLE:
               
                if(tipo_expU == tipo.CARACTER || tipo_expU == tipo.ENTERO){

                    if(tipo_expU == tipo.CARACTER){
                        let temporal = valor_expU.charCodeAt(0);
                        return (temporal); 
                    }else{
                        return (valor_expU);
                    }
                    
                }else{
                    let error = new Errores("Semantico", `No se puede realizar el cateo de double`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;
            case Operador.CASTEOSTRING:
                if(tipo_expU == tipo.ENTERO || tipo_expU == tipo.DOBLE || tipo_expU == tipo.BOOLEANO){

                    return  valor_expU.toString();        

                }else{
                    let error = new Errores("Semantico", `No se puede realizar el casteo de string`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;
            case Operador.CASTEOCHAR:
                if(tipo_expU == tipo.ENTERO ){
                    tipo_expU = tipo.CARACTER;
                    return  String.fromCharCode(valor_expU);      
                        
                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion casteo char`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;           
            case Operador.CASTEOTIPO:

                try {

                    if(tipo_expU == tipo.ENTERO){
                        return "Int"
                    }else if(tipo_expU == tipo.DOBLE){
                        return "Double"
                    }else if(tipo_expU == tipo.BOOLEANO){
                        return "Boolean"
                    }else if(tipo_expU == tipo.CARACTER){
                        return "Char"
                    }else if(tipo_expU == tipo.CADENA){
                        return "String"
                    }else{
                        let error = new Errores("Semantico", `No se puede realizar la operacion de obtner tipo`, this.linea, this.columna);
                        controlador.errores.push(error);
                        controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                        return null;
                    }

                        
                } catch (errror) {
                    let error = new Errores("Semantico", `No se esperaba este simbolo`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;

                }
                
                break;

            case Operador.UPPER:
                try {
                    return valor_expU.toUpperCase();
                } catch (errror) {
                    let error = new Errores("Semantico", `No se puede realizar la operacion UPPER`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;

            case Operador.LOWER:
                try {
                    return valor_expU.toLowerCase();
                } catch (errror) {
                    let error = new Errores("Semantico", `No se puede realizar la operacion LOWER`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
                break;

            case Operador.LENGHT:
               // if(tipo_expU == tipo.CADENA ){
                if(true ){

                    return  valor_expU.length;        

                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano.`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }

            case Operador.ROUND:
                if(tipo_expU == tipo.ENTERO || tipo_expU==tipo.DOBLE){

                    return  Math.round(valor_expU);        

                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion round`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
            case Operador.CHARARRAY:
                if(tipo_expU == tipo.CADENA ){
        
                    return Array.from(valor_expU);        

                }else{
                    let error = new Errores("Semantico", `No se puede realizar la operacion tocharr array`, this.linea, this.columna);
                    controlador.errores.push(error);
                    controlador.append(` *** ERROR: Semantico, No se puede realizar la operacion logica NOT, ya que solo se permiten valores booleano. En la linea ${this.linea} y columna ${this.columna}`)
                    return null;
                }
           
        }
    }

    recorrer(): Nodo {
        //console.log("-----PRIMERO------")
        //console.log(this)
        let padre = new Nodo("Condicion","");

        let expre1_nodo:any; 
        if(this.exp1!=null){
            expre1_nodo = this.exp1.recorrer()  
        }
        
        let expre2_nodo:any; 
        if(this.exp2!=null){
            expre2_nodo = this.exp2.recorrer()   
        }
       
        if(this.signo_operador == '!'){
            padre.AddHijo(new Nodo(this.signo_operador , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(int)'){
            padre.AddHijo(new Nodo(this.signo_operador , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(double)'){
            padre.AddHijo(new Nodo(this.signo_operador , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(char)'){
            padre.AddHijo(new Nodo(this.signo_operador , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(string)'){
            padre.AddHijo(new Nodo("toString" , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(tipo)'){
            padre.AddHijo(new Nodo("typeof" , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(lower)'){
            padre.AddHijo(new Nodo("toLower" , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(upper)'){
            padre.AddHijo(new Nodo("toUpper" , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(length)'){
            padre.AddHijo(new Nodo('length' , ""))
            padre.AddHijo(expre1_nodo)
        }else if(this.signo_operador == '(round)'){
            padre.AddHijo(new Nodo('round' , ""))
            padre.AddHijo(expre1_nodo)
        }else{
            padre.AddHijo(expre1_nodo)
            padre.AddHijo(new Nodo(this.signo_operador , ""))
            padre.AddHijo(expre2_nodo)
        }
        return padre
        
        
    }
}