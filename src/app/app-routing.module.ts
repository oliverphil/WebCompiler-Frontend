import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditorComponent} from './components/editor/editor.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/editor/1',
    pathMatch: 'full'
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
