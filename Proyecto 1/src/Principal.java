

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.*;
import javax.swing.JScrollPane;


public class Principal extends JFrame implements ActionListener {
    JTextArea entrada;
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

    public Principal() {
        this.setTitle("Proyecto 1 OLC1");
        this.setBounds(50, 50, 1500, 1000);
        this.setLocationRelativeTo(null);
        this.getContentPane().setBackground(new Color(174, 214, 241));
        this.setLayout(null);

        JLabel titulo = new JLabel();
        titulo.setText("Pseudo-Parser");
        titulo.setBounds(700, 20, 1000, 35);
        titulo.setFont(new Font("Century Gothic", 1, 35));
        this.add(titulo);

        JLabel tituloEntrada = new JLabel();
        tituloEntrada.setText("Archivo de entrada");
        tituloEntrada.setBounds(10, 150, 200, 35);
        tituloEntrada.setFont(new Font("Century Gothic", 1, 15));
        this.add(tituloEntrada);


        panelEntrada = new JPanel();
        panelEntrada.setLayout(null);
        panelEntrada.setBounds(10, 190, 750,700);

        entrada=new JTextArea();
        entrada.setBounds(0,0,750,700);
        entrada.setFont(new Font("Century Gothic", 1, 12));
        panelEntrada.add(entrada);

        JScrollPane scrollEntrada = new JScrollPane(entrada, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        scrollEntrada.setBounds(0, 0, 750,700);
        panelEntrada.add(scrollEntrada);
        this.add(panelEntrada);

        btnLimpiar = new JButton();
        btnLimpiar.setText("Limpiar");
        btnLimpiar.setBounds(800, 100, 100, 35);
        btnLimpiar.setFont(new Font("Century Gothic", 1, 15));
        btnLimpiar.addActionListener(this);
        this.add(btnLimpiar);

        btnCompilar = new JButton();
        btnCompilar.setText("Compilar");
        btnCompilar.setBounds(950, 100, 100, 35);
        btnCompilar.setFont(new Font("Century Gothic", 1, 15));
        btnCompilar.addActionListener(this);
        this.add(btnCompilar);


        panelGolang = new JPanel();
        panelGolang.setLayout(null);
        panelGolang.setBounds(800,200,650,300);

        salidaGolang=new JTextArea();
        salidaGolang.setBounds(0,0,650,300);
        salidaGolang.setFont(new Font("Century Gothic", 1, 12));
        panelGolang.add(salidaGolang);

        JScrollPane scrollGolang = new JScrollPane(salidaGolang, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        scrollGolang.setBounds(0, 0, 650, 300);
        panelGolang.add(scrollGolang);
        this.add(panelGolang);

        JLabel tituloSalidaGolang = new JLabel();
        tituloSalidaGolang.setText("Salida Golang");
        tituloSalidaGolang.setBounds(800, 150, 200, 35);
        tituloSalidaGolang.setFont(new Font("Century Gothic", 1, 15));
        this.add(tituloSalidaGolang);

        panelPython = new JPanel();
        panelPython.setLayout(null);
        panelPython.setBounds(800,600,650,300);

        salidaPython=new JTextArea();
        salidaPython.setBounds(0,0,650,300);
        salidaPython.setFont(new Font("Century Gothic", 1, 12));
        panelPython.add(salidaPython);

        JScrollPane scrollPython = new JScrollPane(salidaPython, JScrollPane.VERTICAL_SCROLLBAR_ALWAYS, JScrollPane.HORIZONTAL_SCROLLBAR_ALWAYS);
        scrollPython.setBounds(0, 0, 650, 300);
        panelPython.add(scrollPython);
        this.add(panelPython);

        JLabel tituloSalidaPython = new JLabel();
        tituloSalidaPython.setText("Salida Python");
        tituloSalidaPython.setBounds(800, 550, 200, 35);
        tituloSalidaPython.setFont(new Font("Century Gothic", 1, 15));
        this.add(tituloSalidaPython);

        JLabel NombreEstudiante = new JLabel();
        NombreEstudiante.setText("OLC1_2S_2022<202004745>");
        NombreEstudiante.setBounds(1250, 20, 200, 35);
        NombreEstudiante.setFont(new Font("Century Gothic", 1, 15));
        this.add(NombreEstudiante);



        iniciarComponentes();
        this.setVisible(true);
    }

    private void iniciarComponentes() {
        comboFile = new JComboBox();
        comboFile.setBounds(10, 100, 200, 35);
        comboFile.setFont(new Font("Century Gothic", 1, 15));
        comboFile.addItem("Abrir Archivo");
        comboFile.addItem("Guardar Como");
        comboFile.addActionListener(this);
        this.add(comboFile);

        comboReporte = new JComboBox();
        comboReporte.setBounds(260, 100, 200, 35);
        comboReporte.setFont(new Font("Century Gothic", 1, 15));
        comboReporte.addItem("Reporte de Errores");
        comboReporte.addItem("Diagrama de flujo");
        comboReporte.addActionListener(this);
        this.add(comboReporte);

        comboVer = new JComboBox();
        comboVer.setBounds(510, 100, 200, 35);
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
                entrada.setText(fileChooser.getSelectedFile().getAbsolutePath());
            } else if (comboFile.getSelectedItem().equals("Guardar Como")) {
                JFileChooser fileChooser = new JFileChooser();
                fileChooser.showSaveDialog(this);
                entrada.setText(fileChooser.getSelectedFile().getAbsolutePath());
            }
        } else if (e.getSource()==comboReporte) {
            if (comboReporte.getSelectedItem().equals("Reporte de Errores")) {
                JOptionPane.showMessageDialog(this, "Reporte de Errores");
            } else if (comboReporte.getSelectedItem().equals("Diagrama de flujo")) {
                JOptionPane.showMessageDialog(this, "Diagrama de flujo");
            }
        } else if (e.getSource()==comboVer) {
            if (comboVer.getSelectedItem().equals("Manual de Usuario")) {
                JOptionPane.showMessageDialog(this, "Manual de Usuario");
            } else if (comboVer.getSelectedItem().equals("Manual Tecnico")) {
                JOptionPane.showMessageDialog(this, "Manual Tecnico");
            }
        }


    }
}
