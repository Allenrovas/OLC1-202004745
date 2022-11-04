import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import * as ace from 'ace-builds'
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})



export class EditorComponent  {
  

  constructor(private service: UserService,private sanitizer: DomSanitizer) { }
  Tablasimbolos: any = ''
  varibles_cont:Array<any> = []
  varibles_err:Array<any> = []
  TablaErrores: any = ''
  fileContent: any = '';
  Info_ATS:any = ''

  //MODALS
  ModalSimbolo: boolean;
  ModalATS: boolean;
  ModalErrores: boolean;

  ModalAts(){
  
    this.ModalATS = true;
  }

  ModalSimbolos(){
  
    this.ModalSimbolo = true;
  }

  
  ModalError(){
  
    this.ModalErrores = true;
  }


  download() {

    var entrada = ace.edit('entrada_Ace');
    let name:any = prompt("Nombre del archivo:", "");
    var file = new Blob([entrada.getValue()],  { type: 'text/cst;charset=utf-8;' });
   
  
    var a = document.createElement("a"),url = URL.createObjectURL(file);
    
    a.href = url;
    a.download = name;
    document.body.appendChild(a);


    a.click();
    document.body.removeChild(a);

  }

  onChange(event:any): void {
    try {
    const files = event.target.files;
    var entrada = ace.edit('entrada_Ace');
    let file = files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
      entrada.setValue(self.fileContent)
    };

    fileReader.readAsText(file);
   
    
    } catch {}
 }



  setInfo(){
    var entrada = ace.edit('entrada_Ace');
    var salida = ace.edit('salida_Ace');
    var json = {
      input: entrada.getValue()
    }
    this.service.setInfo(json).subscribe(
      (res:any)=>{ alert("Info enviada con exito")
          var respuesta = res.consola;
          salida.setValue(respuesta);
          this.Tablasimbolos = res.ts;
          this.ListarTablaSim();
          this.TablaErrores = res.errores;
          this.ListarErrores();
      },  
      (err)=>{console.log(err)}
    )
  }

  getATS(){
    var entrada = ace.edit('entrada_Ace');
    var json = {
      input: entrada.getValue()
    }
    this.service.recorrer(json).subscribe(
      (res:any)=>{ 
        this.Info_ATS = res.ast
        console.log(this.Info_ATS)
        this.ModalAts()
      },
      (err)=>{console.log(err)}
    )
   
  }



  ListarErrores(){
    this.varibles_err = [];
    var varibles = this.varibles_err
  
    const anExampleVariable:String = this.TablaErrores
    
    var fila = anExampleVariable.split('~')
  
    fila.forEach(function (value) {
        var cadenasimple = value.split(',')
        varibles.push(cadenasimple);
    });

    console.log("Lista errores: ")
    console.log(this.varibles_err)
  }
  

  ListarTablaSim(){
    this.varibles_cont = [];
    var varibles = this.varibles_cont

    const anExampleVariable:String = this.Tablasimbolos
    
    var fila = anExampleVariable.split('~')

    fila.forEach(function (value) { 
        var cadenasimple = value.split(',')
        varibles.push(cadenasimple);
    });
  }

  getInfo(){
    //retornar informacion
    this.service.getInfo().subscribe(
      (res:any)=>{ console.log(res)
        alert(res.info);
      },
      (err)=>{console.log(err)}
    )
  }


  Ejecutar(){
    var entrada = ace.edit('entrada_Ace');
    //alert(entrada.getValue())

    var salida = ace.edit('salida_Ace');
    salida.setValue(entrada.getValue());
  }

  ngOnInit() {
   
    var editor = ace.edit('salida_Ace');
    editor.setValue('hola');
    editor.getSession().setUseWorker(false);
    editor.setShowPrintMargin(false);
    editor.setReadOnly(true);

    this.service.$modalTSimb.subscribe((valor)=>(this.ModalSimbolo = valor))
    this.service.$modalTSimb.subscribe((valor)=>(this.ModalATS = valor))
    this.service.$modalTSimb.subscribe((valor)=>(this.ModalErrores = valor))
  
}
}
