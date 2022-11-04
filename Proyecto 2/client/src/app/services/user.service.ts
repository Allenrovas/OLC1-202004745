import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  $modalTSimb= new EventEmitter<any>();
  $modalAts= new EventEmitter<any>();
 
 

  URL= "http://localhost:3000/api"
  constructor(private http:HttpClient) { }

  getInfo(){
    return this.http.get(`${this.URL}/getInfo`);
    //runTS('./src/index.ts');
  }

  setInfo(json:any){
    return this.http.post(`${this.URL}/ejecutar`,json);
  }

  recorrer(json:any){
    return this.http.post(`${this.URL}/recorrer`,json);
  }


  getdata(){
    return this.http.get(`${this.URL}/getIncremental`);
  }
  
  setdata(json:any){
    return this.http.post(`${this.URL}/setIcremental`,json);
  }

}