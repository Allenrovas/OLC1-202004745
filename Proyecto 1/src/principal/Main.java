package principal;


import analizadores.*;

import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import Structures.Arbol;
import Structures.Instructions.Instruccion;

import java.util.Properties;
public class Main {

    public static ArrayList<ArrayList> errores = new ArrayList<ArrayList>();

    private static LinkedList<Instruccion> AST_arbolSintaxisAbstracta;
    private static Arbol arbol;
    public static String codigoDot;

    public static void main(String[] args) {
        Principal interfaz = new Principal();
        interfaz.setVisible(true);
    }

    public static String analizar(String text){
        File file = new File("./public/parse.txt");
        (new Files()).crearArchivo(file, text);
        analizadores.Sintactico pars;
        try {
            pars=new analizadores.Sintactico(new analizadores.Lexico(new FileInputStream(file)));
            pars.parse();
            AST_arbolSintaxisAbstracta=pars.getAST();
            arbol = pars.getArbol();
            arbol.graficar();
        } catch (Exception ex) {
            System.out.println("Error fatal en compilación de entrada.");
            System.out.println("Causa: "+ex);
        }
        return ejecutarAST(AST_arbolSintaxisAbstracta);
    }


    public static String analizarGo(String text){
        File file = new File("./public/parse.txt");
        (new Files()).crearArchivo(file, text);
        analizadores.Sintactico pars;
        try {
            pars=new analizadores.Sintactico(new analizadores.Lexico(new FileInputStream(file)));
            pars.parse();
            AST_arbolSintaxisAbstracta=pars.getAST();
            arbol = pars.getArbol();
        } catch (Exception ex) {
            System.out.println("Error fatal en compilación de entrada.");
            System.out.println("Causa: "+ex);
        }
        return ejecutarASTGo(AST_arbolSintaxisAbstracta);
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

        String traduccion = "def main():\n";


        for(Instruccion ins:ast){
            //Si existe un error léxico o sintáctico en cierta instrucción esta
            //será inválida y se cargará como null, por lo tanto no deberá ejecutarse
            //es por esto que se hace esta validación.
            if(ins!=null)
                traduccion += "\t"+ins.traducir();
        }
        traduccion += "\nif __name__ == '__main__': \n\tmain()";
        return traduccion;
    }

    public static String ejecutarASTGo(LinkedList<Instruccion> ast) {
        if(ast==null){
            return("No es posible ejecutar las instrucciones porque\r\n"
                    + "el árbol no fue cargado de forma adecuada por la existencia\r\n"
                    + "de errores léxicos o sintácticos.");
        }
        //Se ejecuta cada instruccion en el ast, es decir, cada instruccion de
        //la lista principal de instrucciones.
        String traduccionGo = "package main\n";
        traduccionGo += "import(\n" +"\"math\"\n"+"\"fmt\"\n"+")";


        traduccionGo += "func main() {\n";
        for(Instruccion ins:ast){
            if(ins!=null) {
                traduccionGo += ins.traducirGo();
            }
        }
        traduccionGo += "}";
        return traduccionGo;
    }

    public static void guardarArchivo(String texto, String nombreArchivo) {
        try {
            File archivo = new File(nombreArchivo+".py");
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
            File archivo = new File(nombreArchivo+".go");
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
        EscribirArchivo(html,"errores.html");
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
    public static void graficarM(){
        try {

            String dotPath = "C:\\Program Files\\Graphviz\\bin\\dot.exe";

            String fileInputPath = "grafo1.txt";
            String fileOutputPath = "grafo1.jpg";

            String tParam = "dot -Tjpg";
            String tOParam = "-o";

            String[] cmd = new String[5];
            cmd[0] = dotPath;
            cmd[1] = tParam;
            cmd[2] = fileInputPath;
            cmd[3] = tOParam;
            cmd[4] = fileOutputPath;

            Runtime rt = Runtime.getRuntime();

            rt.exec( cmd );

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}

