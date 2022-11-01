import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { CodemirrorModule } from '@ctrl/ngx-codemirror';
//import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import {HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CompiService} from './services/compi.service';
import { ErroresComponent } from './components/errores/errores.component';
import { SimbolosComponent } from './components/simbolos/simbolos.component';
import { AstComponent } from './components/ast/ast.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FormComponent,
    ErroresComponent,
    SimbolosComponent,
    AstComponent
  ],
  imports: [
    //MatTabsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //CodemirrorModule,
    BrowserAnimationsModule
  ],
  providers: [
    CompiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
