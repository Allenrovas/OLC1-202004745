package principal;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import javax.swing.*;
import javax.swing.JScrollPane;


public class Principal extends JFrame implements ActionListener {

    JComboBox comboFile;
    JComboBox comboReporte;
    JComboBox comboVer;

    JTextArea salidaGolang;
    JTextArea salidaPython;

    JPanel panelEntrada;
    JPanel panelGolang;
    JPanel panelPython;

    JButton btnLimpiar;
    JButton btnCompilar;

    public static JTextArea entrada;

    public Principal() {
        this.setTitle("Proyecto 1 OLC1");
        this.setBounds(50, 50, 1300, 750);
        this.setLocationRelativeTo(null);
        this.getContentPane().setBackground(new Color(174, 214, 241));
        this.setLayout(null);

        JLabel titulo = new JLabel();
        titulo.setText("Pseudo-Parser");
        titulo.setBounds(500, 10, 500, 35);
        titulo.setFont(new Font("Century Gothic", 1, 35));
        this.add(titulo);

        JLabel tituloEntrada = new JLabel();
        tituloEntrada.setText("Archivo de entrada");
        tituloEntrada.setBounds(10, 100, 200, 35);
        tituloEntrada.setFont(new Font("Century Gothic", 1, 15));
        this.add(tituloEntrada);


        panelEntrada = new JPanel();
        panelEntrada.setLayout(null);
        panelEntrada.setBounds(10, 140, 700,550);

        entrada=new JTextArea();
        entrada.setBounds(0,0,700,550);
        entrada.setFont(new Font("Century Gothic", 1, 12));
        panelEntrada.add(entrada);

        JScrollPane scrollEntrada = new JScrollPane(entrada, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        scrollEntrada.setBounds(0, 0, 700,550);
        panelEntrada.add(scrollEntrada);
        this.add(panelEntrada);

        btnLimpiar = new JButton();
        btnLimpiar.setText("Limpiar");
        btnLimpiar.setBounds(800, 60, 150, 35);
        btnLimpiar.setFont(new Font("Century Gothic", 1, 15));
        btnLimpiar.addActionListener(this);
        this.add(btnLimpiar);

        btnCompilar = new JButton();
        btnCompilar.setText("Compilar");
        btnCompilar.setBounds(1000, 60, 150, 35);
        btnCompilar.setFont(new Font("Century Gothic", 1, 15));
        btnCompilar.addActionListener(this);
        this.add(btnCompilar);


        panelGolang = new JPanel();
        panelGolang.setLayout(null);
        panelGolang.setBounds(750,140,500,250);

        salidaGolang=new JTextArea();
        salidaGolang.setBounds(0,0,500,250);
        salidaGolang.setFont(new Font("Century Gothic", 1, 12));
        salidaGolang.setEditable(false);
        panelGolang.add(salidaGolang);

        JScrollPane scrollGolang = new JScrollPane(salidaGolang, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        scrollGolang.setBounds(0, 0, 500, 250);
        panelGolang.add(scrollGolang);
        this.add(panelGolang);

        JLabel tituloSalidaGolang = new JLabel();
        tituloSalidaGolang.setText("Salida Golang");
        tituloSalidaGolang.setBounds(800, 100, 200, 35);
        tituloSalidaGolang.setFont(new Font("Century Gothic", 1, 15));
        this.add(tituloSalidaGolang);

        panelPython = new JPanel();
        panelPython.setLayout(null);
        panelPython.setBounds(750,440,500,250);

        salidaPython=new JTextArea();
        salidaPython.setBounds(0,0,500,250);
        salidaPython.setFont(new Font("Century Gothic", 1, 12));
        salidaPython.setEditable(false);
        panelPython.add(salidaPython);

        JScrollPane scrollPython = new JScrollPane(salidaPython, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        scrollPython.setBounds(0, 0, 500, 250);
        panelPython.add(scrollPython);
        this.add(panelPython);

        JLabel tituloSalidaPython = new JLabel();
        tituloSalidaPython.setText("Salida Python");
        tituloSalidaPython.setBounds(800, 390, 200, 35);
        tituloSalidaPython.setFont(new Font("Century Gothic", 1, 15));
        this.add(tituloSalidaPython);

        JLabel NombreEstudiante = new JLabel();
        NombreEstudiante.setText("OLC1_2S_2022<202004745>");
        NombreEstudiante.setBounds(1050, 20, 200, 35);
        NombreEstudiante.setFont(new Font("Century Gothic", 1, 15));
        this.add(NombreEstudiante);



        iniciarComponentes();
        this.setVisible(true);
    }

    private void iniciarComponentes() {
        comboFile = new JComboBox();
        comboFile.setBounds(10, 60, 200, 35);
        comboFile.setFont(new Font("Century Gothic", 1, 15));
        comboFile.addItem("Abrir Archivo");
        comboFile.addItem("Guardar Python");
        comboFile.addItem("Guardar Golang");
        comboFile.addActionListener(this);
        this.add(comboFile);

        comboReporte = new JComboBox();
        comboReporte.setBounds(260, 60, 200, 35);
        comboReporte.setFont(new Font("Century Gothic", 1, 15));
        comboReporte.addItem("Reporte de Errores");
        comboReporte.addItem("Arbol Sintactico");
        comboReporte.addActionListener(this);
        this.add(comboReporte);

        comboVer = new JComboBox();
        comboVer.setBounds(510, 60, 200, 35);
        comboVer.setFont(new Font("Century Gothic", 1, 15));
        comboVer.addItem("Manual de Usuario");
        comboVer.addItem("Manual Tecnico");
        comboVer.addActionListener(this);
        this.add(comboVer);

    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource()==comboFile) {
            if (comboFile.getSelectedItem().equals("Abrir Archivo")) {
                JFileChooser fileChooser = new JFileChooser();
                fileChooser.showOpenDialog(this);
                try {
                    FileReader fr = new FileReader(fileChooser.getSelectedFile());
                    BufferedReader br = new BufferedReader(fr);
                    String linea = "";
                    while ((linea = br.readLine()) != null) {
                        entrada.append(linea + "\n");
                    }
                    fr.close();
                } catch (Exception ex) {
                    System.out.println(ex.getMessage());
                }
            } else if (comboFile.getSelectedItem().equals("Guardar Python")) {
                Main.guardarArchivo(salidaPython.getText(), "Python");
            } else if (comboFile.getSelectedItem().equals("Guardar Golang")) {
                Main.guardarArchivoGo(salidaGolang.getText(), "Golang");
            }
        } else if (e.getSource()==comboReporte) {
            if (comboReporte.getSelectedItem().equals("Reporte de Errores")) {
                Main.Errores();
            } else if (comboReporte.getSelectedItem().equals("Arbol Sintactico")) {
                Main.graficarM();
            }
        } else if (e.getSource()==comboVer) {
            if (comboVer.getSelectedItem().equals("Manual de Usuario")) {
                try {
                    File path = new File ("Documentacion/ManualUsuario.pdf");
                    Desktop.getDesktop().open(path);
                }catch (IOException ex) {
                    ex.printStackTrace();
                }
            } else if (comboVer.getSelectedItem().equals("Manual Tecnico")) {
                try {
                    File path = new File ("Documentacion/ManualTecnico.pdf");
                    Desktop.getDesktop().open(path);
                }catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        } else if (e.getSource()==btnLimpiar){
            entrada.setText("");
            salidaGolang.setText("");
            salidaPython.setText("");
        } else if (e.getSource()==btnCompilar){
            Main.errores = new ArrayList<>();
            salidaPython.setText(Main.analizar(entrada.getText()));
            salidaGolang.setText(Main.analizarGo(entrada.getText()));
        }

    }
}
