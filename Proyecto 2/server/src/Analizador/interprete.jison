
/* Ejemplo para la gramatica del interprete */

/* Definicion lexica */
%lex
%options case-insensitive 

//Expresiones regulares
num [0-9]+
id      [a-zñA-ZÑ][a-zñA-ZÑ0-9_]*

//--> Cadena
escapechar      [\'\"\\ntr]
escape          \\{escapechar}
aceptacion      [^\"\\] 
cadena          (\"({escape} | {aceptacion})*\")

//--> Caracter 
escapechar2      [\'\"\\ntr]
escape2          \\{escapechar2}
aceptacion2      [^\'\\] 
caracter         (\'({escape2} | {aceptacion2})\')

%%

/* Comentarios */
"//".*              {/*Ignoramos los comentarios simples*/}   id++
"/*"((\*+[^/*])|([^*]))*\**"*/"     {/*Ignorar comentarios con multiples lneas*/}
"tocharArray" { console.log("Reconocio : "+ yytext); return 'CHARARRAY'}
"new"  { console.log("Reconocio : "+ yytext); return 'NEW'}
"(int)"  { console.log("Reconocio : "+ yytext); return 'CASTEOINT'}
"(double)"  { console.log("Reconocio : "+ yytext); return 'CASTEODOUBLE'}
"(boolean)" { console.log("Reconocio : "+ yytext); return 'CASTEOBOOLEAN'}
"toString"  { console.log("Reconocio : "+ yytext); return 'CASTEOSTRING'}
"(string)"  { console.log("Reconocio : "+ yytext); return 'CASTEOSTRINGAUX'}
"(char)"  { console.log("Reconocio : "+ yytext); return 'CASTEOCHAR'}
"typeOf"  { console.log("Reconocio : "+ yytext); return 'CASTEOTIPO'}
"toLower"  { console.log("Reconocio : "+ yytext); return 'CASTEOTOLOWER'}
"toUpper"  { console.log("Reconocio : "+ yytext); return 'CASTEOTOUPPER'}
"length"  { console.log("Reconocio : "+ yytext); return 'LENGTH'}
"round"  { console.log("Reconocio : "+ yytext); return 'ROUND'}

/* Simbolos del programa */

"--"                  { console.log("Reconocio : " + yytext);  return 'DECRE' } 
"++"                  { console.log("Reconocio : " + yytext);  return 'INCRE' } 
"=="                  { console.log("Reconocio : " + yytext);  return 'IGUALIGUAL' } 
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 

"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' } 
"("                  { console.log("Reconocio : " + yytext);  return 'PARA' } 
")"                  { console.log("Reconocio : " + yytext);  return 'PARC' } 
"["                  { console.log("Reconocio : " + yytext);  return 'CORA' } 
"]"                  { console.log("Reconocio : " + yytext);  return 'CORC' } 
";"                  { console.log("Reconocio : " + yytext);  return 'PYC' } 
"="                  { console.log("Reconocio : " + yytext);  return 'IGUAL' } 
","                  { console.log("Reconocio : " + yytext);  return 'COMA' } 
"{"                  { console.log("Reconocio : "+ yytext); return 'LLAVA'}
"}"                  { console.log("Reconocio : "+ yytext); return 'LLAVC'}
"?"                  { console.log("Reconocio : "+ yytext); return 'INTERROGACION'}
":"                  { console.log("Reconocio : "+ yytext); return 'DSPNTS'}

/* OPERADORES ARITMETICOS */
"+"                  { console.log("Reconocio : " + yytext);  return 'MAS' } 
"*"                  { console.log("Reconocio : " + yytext);  return 'MULTI' } 
"/"                  { console.log("Reconocio : " + yytext);  return 'DIV' } 
"-"                  { console.log("Reconocio : " + yytext);  return 'MENOS' } 
"%"                  { console.log("Reconocio : " + yytext);  return 'MOD' }
"^"                  { console.log("Reconocio : " + yytext);  return 'POT' } 

/* OPERADORES RELACIONALES */
">="                  { console.log("Reconocio : " + yytext);  return 'MAYORIGUAL' } 
">"                  { console.log("Reconocio : " + yytext);  return 'MAYORQUE' }
"<="                  { console.log("Reconocio : " + yytext);  return 'MENORIGUAL' } 
"<"                  { console.log("Reconocio : " + yytext);  return 'MENORQUE' } 
"!="                  { console.log("Reconocio : " + yytext);  return 'DIFERENTE' }

/* OPERADORES LOGICOS */
"&&"                  { console.log("Reconocio : " + yytext);  return 'AND' } 
"||"                  { console.log("Reconocio : " + yytext);  return 'OR' } 
"!"                  { console.log("Reconocio : " + yytext);  return 'NOT' }


/*Palabras reservadas*/
"evaluar"                  { console.log("Reconocio : " + yytext);  return 'EVALUAR' } 
"true"                  { console.log("Reconocio : " + yytext);  return 'TRUE' } 
"false"                  { console.log("Reconocio : " + yytext);  return 'FALSE' } 

"int"                  { console.log("Reconocio : " + yytext);  return 'INT' } 
"double"                  { console.log("Reconocio : " + yytext);  return 'DOUBLE' } 
"string"                  { console.log("Reconocio : " + yytext);  return 'STRING' } 
"char"                  { console.log("Reconocio : " + yytext);  return 'CHAR' } 
"boolean"                  { console.log("Reconocio : " + yytext);  return 'BOOLEAN' }

"writeline"                  { console.log("Reconocio : " + yytext);  return 'WRITELINE' }
"print"                 { console.log("Reconocio : " + yytext);  return 'PRINT' }
"println"                 { console.log("Reconocio : " + yytext);  return 'PRINTLN' }

"if"               { console.log("Reconocio : "+ yytext); return 'IF'}
"while"            { console.log("Reconocio : "+ yytext); return 'WHILE'}
"do"            { console.log("Reconocio : "+ yytext); return 'DO'}
"else"             { console.log("Reconocio : "+ yytext); return 'ELSE'}
"elif"   { console.log("Reconocio : "+ yytext); return 'ELIF'}
"break"            { console.log("Reconocio : "+ yytext); return 'BREAK'}

"for"            { console.log("Reconocio : "+ yytext); return 'FOR'}
"switch"            { console.log("Reconocio : "+ yytext); return 'SWITCH'}
"case"            { console.log("Reconocio : "+ yytext); return 'CASE'}
"tostring"            { console.log("Reconocio : "+ yytext); return 'TOSTRING'}
"toupper"            { console.log("Reconocio : "+ yytext); return 'TOUPPER'}
"default"            { console.log("Reconocio : "+ yytext); return 'DEFAULT'}

"continue"            { console.log("Reconocio : "+ yytext); return 'CONTINUE'}

"run"            { console.log("Reconocio : "+ yytext); return 'RUN'}
"void"            { console.log("Reconocio : "+ yytext); return 'VOID'}

"return"            { console.log("Reconocio : "+ yytext); return 'RETURN'}



//SIMBOLOS ER

[0-9]+("."[0-9]+)\b  { console.log("Reconocio : " + yytext);  return 'DECIMAL' } 
{num}                 { console.log("Reconocio : " + yytext);  return 'ENTERO' } 
{id}                 { console.log("Reconocio : " + yytext);  return 'ID' } 
{cadena}                 { console.log("Reconocio : " + yytext);  return 'CADENA' } 
{caracter}                 { console.log("Reconocio : " + yytext);  return 'CARACTER' } 


/*Espacios*/
[\s\r\n\t]             {}
\s+                   {}
"//".*                {}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}

<<EOF>>               return 'EOF'
.                     { console.log("Error Lexico "+yytext
                        +" linea "+yylineno
                        +" columna "+(yylloc.last_column+1));

                        new errores.default('Lexico', 'El caracter ' + yytext 
                                + ' no forma parte del lenguaje', 
                                yylineno+1, 
                                yylloc.last_column+1); 
                                      
                        }

/lex

// area de imports
%{
        const evaluar = require('../Interprete/Evaluar');
        const aritmetica = require('../Interprete/Expresiones/Operaciones/Aritmetica');
        const primitivo = require('../Interprete/Expresiones/Primitivo');

        const writeline = require('../Interprete/Instrucciones/WriteLine')
        const declaracion = require('../Interprete/Instrucciones/Declaracion')
        const ast = require('../Interprete/Ast/Ast')
        const tipo = require('../Interprete/TablaSimbolos/Tipo')
        const identificador = require('../Interprete/Expresiones/Identificador')

        const relacional = require('../Interprete/Expresiones/Operaciones/Relacional');
        const logica = require('../Interprete/Expresiones/Operaciones/Logica');

        const asignacion = require('../Interprete/Instrucciones/Asignacion');
        const Ifs = require('../Interprete/Instrucciones/SentenciasControl/Ifs');
        const While = require('../Interprete/Instrucciones/SentenciasCiclica/While');
        const DoWhile = require('../Interprete/Instrucciones/SentenciasCiclica/DoWhile');
        const ternario = require('../Interprete/Expresiones/Ternario');
        const detener = require('../Interprete/Instrucciones/SentenciasTransferencia/Break');

        const Switch = require('../Interprete/Instrucciones/SentenciasControl/Switch');
        const caso = require('../Interprete/Instrucciones/SentenciasControl/Caso'); 
        const For = require('../Interprete/Instrucciones/SentenciasCiclica/For');

        const continuar = require('../Interprete/Instrucciones/SentenciasTransferencia/Continue');

        const funcion = require('../Interprete/Instrucciones/Funcion');
        const llamada = require('../Interprete/Instrucciones/Llamada');
        const startwith = require('../Interprete/Instrucciones/StartWith');
        const simbolo = require('../Interprete/TablaSimbolos/Simbolo')
        const retorno = require('../Interprete/Instrucciones/SentenciasTransferencia/Return');

        const errores = require('../Interprete/Ast/Errores')
%}

/* PRECEDENCIA */
%right 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT' 'CASTEODOUBLE' 'CASTEOINT' 'CASTEOBOOLEAN' 'CASTEOSTRINGAUX' 'CASTEOSTRING' 'CASTEOCHAR' 'CASTEOTIPO' 'CASTEOTOLOWER' 'CASTEOTOUPPER' 'LENGTH' 'ROUND'
%left 'IGUALIGUAL' 'DIFERENTE' 'MENORQUE' 'MENORIGUAL' 'MAYORQUE' 'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'DIV'  'MULTI' 
%left 'POT' 
%right 'MOD'
%right UMINUS


%start inicio

%% /* language grammar */

inicio : instrucciones EOF  { $$ = new ast.default($1); return $$ };

instrucciones : instrucciones instruccion   { $$ = $1; $$.push($2); }
            | instruccion                   { $$ = new Array(); $$.push($1); }
            ;

instruccion : declaracion   { $$ =  $1; }
            | startwith      { $$ = $1; }
            | writeline     { $$ = $1; }
            | asignacion    { $$ = $1; }
            | sent_if       { $$ = $1; }
            | sent_while    { $$ = $1; } 
            | sent_Dowhile  { $$ = $1; } 
            | BREAK PYC     { $$ = new detener.default(); }
            | sent_switch   { $$ = $1; } 
            | sent_for       { $$ = $1; } 
            |  ID DECRE PYC  { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
            | ID INCRE  PYC { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
            | CONTINUE PYC  { $$ = new continuar.default(); }
            | funciones     { $$ = $1; } 
            | llamada PYC   { $$ = $1; } 
            | RETURN PYC        { $$ = new retorno.default(null); } 
            | RETURN e PYC      { $$ = new retorno.default($2); } 
            | error         { console.log("Error Sintactico: " + yytext 
                                    + " linea: " + this._$.first_line 
                                    + " columna: " + this._$.first_column); 
                        
                                new errores.default("Sintactico", "No se esperaba el caracter "+ yytext , 
                                                this._$.first_line ,this._$.first_column);            
                            }
            ;

declaracion : tipo lista_ids IGUAL e PYC  { $$ = new declaracion.default($1, $2, $4,@1.first_line, @1.last_column);}  
            | tipo lista_ids PYC         { $$ = new declaracion.default($1, $2, null,  @1.first_line, @1.last_column);}
            | tipo  CORA CORC lista_ids IGUAL NEW  tipo CORA e CORC  PYC      { $$ = new declaracion.default($1, $4, null,  @1.first_line, @1.last_column,$7,null,null,$9);}
            | tipo CORA CORC lista_ids IGUAL LLAVA listasimple LLAVC  PYC  { $$ = new declaracion.default($1, $4, null,  @1.first_line, @1.last_column,$1,$7.length,null,null,null,$7);}
            | tipo CORA CORC CORA CORC lista_ids IGUAL NEW  tipo CORA e CORC  CORA  e CORC PYC { $$ = new declaracion.default($1, $6, null,  @1.first_line, @1.last_column,$1,null,null,$11,$14);}
            | tipo CORA CORC  lista_ids IGUAL e PYC { $$ = new declaracion.default($1, $4, $6,  @1.first_line, @1.last_column);}
            | tipo CORA CORC CORA CORC lista_ids  IGUAL LLAVA doublearray  LLAVC  PYC      { $$ = new declaracion.default($1, $6, null,  @1.first_line, @1.last_column,$1,$9.length,$9[0].length,null,null,$9);}
            ;

            




doublearray: doublearray COMA LLAVA listasimple LLAVC { $$ = $1; $$.push($4);}
            | LLAVA listasimple   LLAVC   {$$= new Array(); $$.push($2);}
	    ;

listasimple:listasimple COMA e { $$ = $1; $$.push($3);}
	    | e  {$$= new Array(); $$.push($1);}
	    ;

tipo : INT     {$$ = new tipo.default("ENTERO"); }
    | DOUBLE    {$$ = new tipo.default("DOBLE"); }
    | STRING    {$$ = new tipo.default("CADENA"); }
    | CHAR      {$$ = new tipo.default("CARACTER"); }
    | BOOLEAN   {$$ = new tipo.default("BOOLEANO"); }  
    ;

lista_ids : lista_ids COMA ID   { $$ = $1; $$.push($3); }
        | ID                    { $$ = new Array(); $$.push($1); }
        ;

writeline : PRINTLN PARA e PARC PYC { $$ = new writeline.default($3,true,@1.first_line, @1.last_column); }
        |  PRINT PARA e PARC PYC { $$ = new writeline.default($3,false,@1.first_line, @1.last_column); }
        ;

asignacion : ID IGUAL e PYC   { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
        |  ID CORA e CORC IGUAL e PYC   { $$ = new asignacion.default($1, $6, @1.first_line, @1.last_column,$3); }
        |  ID CORA e CORC CORA e CORC IGUAL e PYC   { $$ = new asignacion.default($1, $9, @1.first_line, @1.last_column,$3,$6); }

            ;

sent_if : IF PARA e PARC LLAVA instrucciones LLAVC { $$ = new Ifs.default($3, $6, [], @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC { $$ = new Ifs.default($3, $6, $10, @1.first_line, @1.last_column); }
        | IF PARA e PARC LLAVA instrucciones LLAVC ELIF sent_if { $$ = new Ifs.default($3, $6, [$9], @1.first_line, @1.last_column); }
        | PARA e PARC LLAVA instrucciones LLAVC sent_if { $$ = new Ifs.default($2, $5, [$7], @1.first_line, @1.last_column); }
        | PARA e PARC LLAVA instrucciones LLAVC { $$ = new Ifs.default($2, $5, [], @1.first_line, @1.last_column); }
        | PARA e PARC LLAVA instrucciones LLAVC ELSE LLAVA instrucciones LLAVC { $$ = new Ifs.default($2, $5, $9, @1.first_line, @1.last_column); }
        ;

sent_while : WHILE PARA e PARC LLAVA instrucciones LLAVC { $$ = new While.default($3, $6, @1.first_line, @1.last_column);  }
            ;


sent_Dowhile : DO  LLAVA instrucciones LLAVC WHILE PARA e PARC PYC  { $$ = new DoWhile.default($7, $3, @1.first_line, @1.last_column);  }
            ;

sent_for : FOR PARA dec_asig_for PYC e PYC actualizacion_for PARC LLAVA instrucciones LLAVC { $$ = new For.default($3, $5, $7, $10, @1.first_line, @1.last_column); }
        ;
// for(i = 0 ; ...)
dec_asig_for : tipo ID IGUAL e  { $$ = new declaracion.default($1, $2, $4,  @1.first_line, @1.last_column);} 
            | ID IGUAL e        { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
            ;
//x = 0
// i --
// i++ 
// x++ 
// print(x) -> 1
// i = i + 1 
actualizacion_for : ID DECRE { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                | ID INCRE   { $$ = new asignacion.default($1, new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false),@1.first_line, @1.last_column ); }
                | ID IGUAL e { $$ = new asignacion.default($1, $3, @1.first_line, @1.last_column); }
                ;

sent_switch : SWITCH PARA e PARC LLAVA caselist LLAVC           { $$ = new Switch.default($3, $6, null, @1.first_line, @1.last_column); }
            | SWITCH PARA e PARC LLAVA caselist default LLAVC   { $$ = new Switch.default($3, $6, $7, @1.first_line, @1.last_column); }
            | SWITCH PARA e PARC LLAVA default LLAVC            { $$ = new Switch.default($3, [], $6, @1.first_line, @1.last_column); }
            ;

caselist : caselist caso         { $$ = $1; $$.push($2); }
        | caso                   { $$ = new Array(); $$.push($1); }
        ;

caso : CASE e DSPNTS instrucciones  { $$ = new caso.default($2, $4, @1.first_line, @1.last_column); }
    ;

default : DEFAULT DSPNTS instrucciones { $$ = new caso.default(null, $3, @1.first_line, @1.last_column);}
        ;

funciones 
        : ID PARA lista_params PARC DSPNTS tipo LLAVA instrucciones LLAVC { $$ = new funcion.default(2, $6, $1, $3, false, $8,  @1.first_line, @1.last_column); }
        | ID PARA  PARC DSPNTS tipo LLAVA instrucciones LLAVC               { $$ = new funcion.default(2, $5, $1, [], false, $7,  @1.first_line, @1.last_column); }
        | ID PARA lista_params PARC DSPNTS VOID LLAVA instrucciones LLAVC   { $$ = new funcion.default(3, $6, $1, $3, true, $8,  @1.first_line, @1.last_column); }
        | ID PARA  PARC DSPNTS VOID LLAVA instrucciones LLAVC               { $$ = new funcion.default(3, $5, $1, [], true, $7,  @1.first_line, @1.last_column); }
        ;

lista_params : lista_params COMA tipo ID          { $$ = $1; $$.push(new simbolo.default(6, $3, $4, null)); }
             | tipo ID                           { $$ = new Array(); $$.push(new simbolo.default(6, $1, $2, null)); }
             | tipo CORA CORC ID                           { $$ = new Array(); $$.push(new simbolo.default(6, $1, $4, null)); }
             | tipo CORA CORC  CORA CORC ID                { $$ = new Array(); $$.push(new simbolo.default(6, $1, $6, null)); }
             ;

llamada : ID PARA lista_vals PARC {$$ = new llamada.default($1, $3,@1.first_line, @1.last_column ); }
        | ID PARA  PARC           {$$ = new llamada.default($1, [] ,@1.first_line, @1.last_column ); }
        ; 

lista_vals : lista_vals COMA e          { $$ = $1; $$.push($3); }
        | e                             { $$ = new Array(); $$.push($1); }
        ; 

startwith :  RUN  llamadaeee PYC    { $$ = new startwith.default($2,@1.first_line, @1.last_column );}
        ;

llamadaeee : ID PARA lista_vals PARC {$$ = new llamada.default($1, $3,@1.first_line, @1.last_column ); }
        | ID PARA  PARC           {$$ = new llamada.default($1, [] ,@1.first_line, @1.last_column ); }
        ;   

e : e MAS e         { $$ = new aritmetica.default($1, '+', $3, @1.first_line, @1.last_column,false); }
    | e MENOS e      { $$ = new aritmetica.default($1, '-', $3, @1.first_line, @1.last_column,false); }
    | e MULTI e      { $$ = new aritmetica.default($1, '*', $3, @1.first_line, @1.last_column,false); }
    | e DIV e        { $$ = new aritmetica.default($1, '/', $3, @1.first_line, @1.last_column,false); }
    | e POT e        { $$ = new aritmetica.default($1, '^', $3, @1.first_line, @1.last_column,false); }
    | e MOD e        { $$ = new aritmetica.default($1, '%', $3, @1.first_line, @1.last_column,false); }
    | e MAYORIGUAL e  { $$ = new relacional.default($1, '>=', $3, @1.first_line, @1.last_column,false); }
    | e MAYORQUE e   { $$ = new relacional.default($1, '>', $3, @1.first_line, @1.last_column,false); }
    | e MENORIGUAL e { $$ = new relacional.default($1, '<=', $3, @1.first_line, @1.last_column,false); }
    | e MENORQUE e  { $$ = new relacional.default($1, '<', $3, @1.first_line, @1.last_column,false); }
    | e IGUALIGUAL e { $$ = new relacional.default($1, '==', $3, @1.first_line, @1.last_column,false); }
    | e DIFERENTE e  { $$ = new relacional.default($1, '!=', $3, @1.first_line, @1.last_column,false); }
    | e AND e       { $$ = new logica.default($1, '&&', $3, @1.first_line, @1.last_column,false); }
    | e OR e       { $$ = new logica.default($1, '||', $3, @1.first_line, @1.last_column,false); }
    | NOT e          { $$ = new logica.default($2, '!', null, @1.first_line, @1.last_column,true); }
    | CASTEODOUBLE e     { $$ = new logica.default($2, '(double)', null, @1.first_line, @1.last_column,true); }
    | CASTEOINT e  { $$ = new logica.default($2, '(int)', null, @1.first_line, @1.last_column,true); }
    | CASTEOBOOLEAN e { $$ = new logica.default($2, '(boolean)', null, @1.first_line, @1.last_column,true); }
    | CASTEOSTRING PARA e PARC { $$ = new logica.default($3, '(tostring)', null, @1.first_line, @1.last_column,true); }
    | CASTEOSTRINGAUX e { $$ = new logica.default($2, '(string)', null, @1.first_line, @1.last_column,true); }
    | CASTEOCHAR e  { $$ = new logica.default($2, '(char)', null, @1.first_line, @1.last_column,true); } 
    | CASTEOTIPO PARA e PARC { $$ = new logica.default($3, '(tipo)', null, @1.first_line, @1.last_column,true); } 
    | CASTEOTOLOWER PARA e PARC { $$ = new logica.default($3, '(lower)', null, @1.first_line, @1.last_column,true); } 
    | CASTEOTOUPPER PARA e PARC { $$ = new logica.default($3, '(upper)', null, @1.first_line, @1.last_column,true); } 
    | LENGTH PARA e PARC { $$ = new logica.default($3, '(length)', null, @1.first_line, @1.last_column,true); } 
    | CHARARRAY PARA e PARC { $$ = new logica.default($3, '(chararray)', null, @1.first_line, @1.last_column,true); } 
    | ROUND PARA e PARC { $$ = new logica.default($3, '(round)', null, @1.first_line, @1.last_column,true); } 
    | MENOS e %prec UMINUS    { $$ = new aritmetica.default($2, 'UNARIO', null, @1.first_line, @1.last_column,true); }
    | PARA e PARC       { $$ = $2; }
    | DECIMAL           { $$ = new primitivo.default(Number($1), 'DOBLE', @1.first_line, @1.last_column); }
    | ENTERO            { $$ = new primitivo.default(Number($1), 'ENTERO', @1.first_line, @1.last_column); }
    | ID                { $$ = new identificador.default($1, @1.first_line, @1.last_column); }
    | ID CORA e CORC               { $$ = new identificador.default($1, @1.first_line, @1.last_column,$3); }
    | ID CORA e CORC CORA e CORC   { $$ = new identificador.default($1, @1.first_line, @1,$3,$6); }
    | CADENA            { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CADENA', @1.first_line, @1.last_column); }
    | CARACTER          { $1 = $1.slice(1, $1.length-1); $$ = new primitivo.default($1, 'CARACTER', @1.first_line, @1.last_column); }
    | TRUE              { $$ = new primitivo.default(true, 'BOOLEANO', @1.first_line, @1.last_column); }
    | FALSE             { $$ = new primitivo.default(false, 'BOOLEANO', @1.first_line, @1.last_column); }
    | e INTERROGACION e DSPNTS e { $$ = new ternario.default($1, $3, $5, @1.first_line, @1.last_column); }
    | ID INCRE          { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '+', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
    | ID DECRE          { $$ = new aritmetica.default(new identificador.default($1, @1.first_line, @1.last_column), '-', new primitivo.default(1, 'ENTERO', @1.first_line, @1.last_column), @1.first_line, @1.last_column, false); }
    | llamada           { $$ = $1; } 
    ;

