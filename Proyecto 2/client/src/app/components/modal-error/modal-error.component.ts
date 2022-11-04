import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-error',
  templateUrl: './modal-error.component.html',
  styleUrls: ['./modal-error.component.css']
})
export class ModalErrorComponent implements OnInit {
  @Input() Datos: any;

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  ModalError(){
    this.service.$modalTSimb.emit(false)
  }
}
