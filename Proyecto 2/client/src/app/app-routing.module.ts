import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';


const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  {
    path: 'index',
    component:EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
