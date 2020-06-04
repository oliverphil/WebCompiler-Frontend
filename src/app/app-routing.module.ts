import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditorComponent} from './components/editor/editor.component';
import {DeclarationComponent} from './components/declaration/declaration.component';
import {AuthService, FormCompleteService} from './services/auth.service';
import {InformationFormComponent} from './components/information-form/information-form.component';


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
    path: 'user-information',
    component: InformationFormComponent,
    canActivate: [AuthService]
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [FormCompleteService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
