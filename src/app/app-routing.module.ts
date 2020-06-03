import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditorComponent} from './components/editor/editor.component';
import {DeclarationComponent} from './components/declaration/declaration.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/declaration',
    pathMatch: 'full'
  },
  {
    path: 'declaration',
    pathMatch: 'full',
    component: DeclarationComponent
  },
  {
    path: 'editor/:challenge',
    component: EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
