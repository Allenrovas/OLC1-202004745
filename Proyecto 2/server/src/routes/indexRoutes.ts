import express = require('express');
import Ast from '../Interprete/Ast/Ast';
import Nodo from '../Interprete/Ast/Nodo';
import Controlador from '../Interprete/Controlador';
import TablaSimbolos from '../Interprete/TablaSimbolos/TablaSimbolos';

var interprete = require('../Analizador/interprete').parser;


const router = express.Router();

router.get('/', function(req, res){
    res.send('HOLA DESDE EL SERVIDOR DEL INTERPRETE');
})
router.post('/recorrer', function(req, res) {
    try {
        const { input } = req.body;
        console.log(input);
        let ast : Ast = interprete.parse(input);
        let nodo_ast : Nodo = ast.recorrer();
        let grafo = nodo_ast.GraficarSintactico();  //Aqui tenemos la cadena de graphviz para graficar
        
        res.status(200).json({ast : grafo});
    } catch (error) {
        console.log(error);
        res.status(500).json({ast : "Se ha producido un error"});
    }
})

router.post('/ejecutar', function(req, res) {
    try {
        const { input } = req.body;
        
        let ast : Ast = interprete.parse(input);
        
        let respuesta = "";

        let controlador = new Controlador();
        let ts_global = new TablaSimbolos(null);

        ast.ejecutar(controlador, ts_global);
        
        let ts_html = controlador.graficar_ts(controlador,ts_global);

        let ts_html_error = controlador.obtenererrores();
      
       /* for(let evaluar of arreglo){
            let valor = evaluar.expresion.getValor(controlador,ts_global);

            if(valor != null){
                console.log(`El valor de la expresion es : ${valor}`);
                respuesta += `El valor de la expresion es : ${valor} \n`;
            }else{
                console.log(`El valor de la expresion es : ERROR`);
                respuesta += `El valor de la expresion es : ERROR \n`;
            }
            
        }*/
        res.status(200).json({consola : controlador.consola, ts : ts_html, errores: ts_html_error});
        //res.status(200).json({consola : '', ts : ''});
    } catch (error) {
        console.log(error);
        res.status(500).json({resultado : "Se ha producido un error"});
    }
})

module.exports = router;