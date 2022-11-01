import { Component, HostBinding, OnInit } from '@angular/core';
import { Archivo } from 'src/app/models/archivo';
import { Console } from 'src/app/models/console';
import { CompiService } from '../../services/compi.service'; 
import { ActivatedRoute, Router} from '@angular/router';
import {UntypedFormControl} from '@angular/forms';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  archivo: Archivo = {
    texto: ''
  };
  

  console: Console = {
    texto: ''
  };

  cont = "";
  fileName = "";
  contador = 0;

  constructor(private compiService: CompiService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }

  open(event:any, index:number){
    const f = event.target.files[0];
    
    let fR = new FileReader();
    fR.onload = (e) =>{
      if(fR.result!=null){
        this.cont=fR.result.toString();
        this.tabs[index].content = this.cont;
        this.tabs[index].fileName = f.name;
        this.cont="";
      }
    }
    fR.readAsText(f);
  }
  
  ejecucion(index:number){
    let t = this.tabs[index].content
    this.archivo.texto = t;

    this.compiService.setInfo(this.archivo).subscribe(
      (res)=>{
         this.router.navigate(['/archivo']);
       }, (err)=>{

     })
 
     this.obtConsola();
    
  }

  obtConsola(){
    this.compiService.getInfo().subscribe(
      res => {
        this.console = res;
        console.log("Response is: ", res)
      },
      err => console.error(err)
    );
  }

  GuardarComo(index:number){
    var FName = prompt("Ingrese el nombre de su archivo: ", "")
    var archivo = new File([this.tabs[index].content], FName+".LF", {type:"text/plain;charset=utf-8"})
    FileSaver.saveAs(archivo)
  }

  Guardar(index:number){
    var FName = this.tabs[index].fileName;
    var archivo = new File([this.tabs[index].content], FName, {type:"text/plain;charset=utf-8"})
    FileSaver.saveAs(archivo)
  }

  tabs = [{title: 'Pestaña ' + this.contador, content:'', fileName:''}];  
  selected = new UntypedFormControl(0);

  addTab() {
    this.contador++;
    this.tabs.push({title: 'Pestaña ' + this.contador, content:'', fileName:''});
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
