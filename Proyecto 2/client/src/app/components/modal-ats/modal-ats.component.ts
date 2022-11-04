import { Component, OnInit, Input } from '@angular/core';
//import { graphviz } from 'd3-graphviz';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-ats',
  templateUrl: './modal-ats.component.html',
  styleUrls: ['./modal-ats.component.css']
})
export class ModalAtsComponent implements OnInit {
  @Input() Datos: any;

  constructor(private service: UserService) { }



  ModalATS(){
    this.service.$modalTSimb.emit(false)
  }

  ngOnInit(): void {
    //graphviz("#graph").renderDot(this.Datos);
  }

}
