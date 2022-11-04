import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { AceEditorModule } from 'ng2-ace-editor';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { EditorComponent } from './components/editor/editor.component';
import { ModalAtsComponent } from './components/modal-ats/modal-ats.component';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { ModalTsimbolosComponent } from './components/modal-tsimbolos/modal-tsimbolos.component';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EditorComponent,
    ModalAtsComponent,
    ModalErrorComponent,
    ModalTsimbolosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodemirrorModule,
    AceEditorModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
