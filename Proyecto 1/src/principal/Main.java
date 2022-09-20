package principal;


import analizadores.*;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;


import Structures.Arbol;
import Structures.Instructions.Instruccion;
public class Main {

    public static ArrayList<ArrayList> errores = new ArrayList<ArrayList>();

    private static LinkedList<Instruccion> AST_arbolSintaxisAbstracta;
    private static Arbol arbol;

    public static void main(String[] args) {
        Principal interfaz = new Principal();
        interfaz.setVisible(true);
    }

    public static String analizar(){
        try{
            Lexico lexico = new Lexico(new BufferedReader(new StringReader(Principal.entrada.getText())));
            Sintactico sintactico = new Sintactico(lexico);
            sintactico.parse();
            AST_arbolSintaxisAbstracta=sintactico.getAST();
            arbol = sintactico.getArbol();
        }catch (Exception e){

        }

        return ejecutarAST(AST_arbolSintaxisAbstracta);
    }



    public Arbol getArbol() {
        return this.arbol;
    }

    public static String ejecutarAST(LinkedList<Instruccion> ast) {
        if(ast==null){
            return("No es posible ejecutar las instrucciones porque\r\n"
                    + "el árbol no fue cargado de forma adecuada por la existencia\r\n"
                    + "de errores léxicos o sintácticos.");
        }
        //Se ejecuta cada instruccion en el ast, es decir, cada instruccion de
        //la lista principal de instrucciones.

        String traduccionPy = "";
        String traduccionGo = "";

        for(Instruccion ins:ast){

            if(ins!=null)
                traduccionPy += ins.traducir();
            traduccionGo += ins.traducirGo();
        }

        return traduccionPy;
    }

    public static void guardarArchivo(String texto, String nombreArchivo) {
        try {
            File archivo = new File(nombreArchivo);
            BufferedWriter bw;
            if (archivo.exists()) {
                bw = new BufferedWriter(new FileWriter(archivo));
                bw.write(texto);
            } else {
                bw = new BufferedWriter(new FileWriter(archivo));
                bw.write(texto);
            }
            bw.close();
        } catch (IOException e) {
        }
    }

    public static void guardarArchivoGo(String texto, String nombreArchivo) {
        try {
            File archivo = new File(nombreArchivo);
            BufferedWriter bw;
            if (archivo.exists()) {
                bw = new BufferedWriter(new FileWriter(archivo));
                bw.write(texto);
            } else {
                bw = new BufferedWriter(new FileWriter(archivo));
                bw.write(texto);
            }
            bw.close();
        } catch (IOException e) {
        }
    }

    public static void Errores(){
        String html = "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "<meta charset = «utf-8»>\n" +
                "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" crossorigin=\"anonymous\">\n"+
                "<title>Errores</title>\n" +
                "</head>\n" +
                "<body>\n" +
                "<table class=\"table table-dark table-hover\">\n" +
                " <thead>\n" +
                "    <tr>\n" +
                "      <th scope=\"col\">Error</th>\n" +
                "      <th scope=\"col\">Fila</th>\n" +
                "      <th scope=\"col\">Columna</th>\n" +
                "    </tr>\n" +
                "  </thead>";

        for (int i = 0; i < errores.size(); i++) {
            html+="<tr>\n" +
                    "      <td>"+errores.get(i).get(0)+"</td>\n" +
                    "      <td>"+errores.get(i).get(1)+"</td>\n" +
                    "      <td>"+errores.get(i).get(2)+"</td>\n" +
                    "    </tr>";
        }
        html+="</table></body></html>";
        EscribirArchivo(html,"./reportes/errores.html");
    }

    public static void EscribirArchivo(String contenido, String ruta){
        try {

            File file = new File(ruta);
            // Si el archivo no existe es creado
            if (!file.exists()) {
                file.createNewFile();
            }
            FileWriter fw = new FileWriter(file);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(contenido);
            bw.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}