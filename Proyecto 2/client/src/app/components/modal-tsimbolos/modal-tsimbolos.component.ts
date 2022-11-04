import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-tsimbolos',
  templateUrl: './modal-tsimbolos.component.html',
  styleUrls: ['./modal-tsimbolos.component.css']
})
export class ModalTsimbolosComponent implements OnInit {
  @Input() Datos: any;



  constructor(private service: UserService) { }

  ngOnInit(): void {

   
    //console.log(this.Datos)

    
  }

  ModalSimbolos(){
    this.service.$modalTSimb.emit(false)
  }

}
