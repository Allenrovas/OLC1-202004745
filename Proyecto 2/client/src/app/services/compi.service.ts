import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Archivo } from '../models/archivo';

@Injectable({
  providedIn: 'root'
})
export class CompiService {
  URL= "http://localhost:3000/api";
  $modalTSimb= new EventEmitter<any>();
  $modalAts= new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  getInfo(){
    return this.http.get(`${this.URL}/getInfo`);
  }

  setInfo(json: any){
    return this.http.post(`${this.URL}/ejecutar`, json);
  }

  recorrer(json: any){
    return this.http.post(`${this.URL}/recorrer`, json);
  }

  getdata(){
    return this.http.get(`${this.URL}/getIncremental`);
  }

  setdata(json: any){
    return this.http.post(`${this.URL}/setIncremental`, json);
  }
}
