import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  fileContent: any = '';


  onChange(event:any): void {
    try {
    const files = event.target.files;

    let file = files[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function (x) {
      self.fileContent = fileReader.result;
      
    };

    fileReader.readAsText(file);
   
    } catch {}
 }


}
