import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditorComponent} from './components/editor/editor.component';
import {DeclarationComponent} from './components/declaration/declaration.component';
import {AuthService, FormCompleteService} from './services/auth.service';
import {InformationFormComponent} from './components/information-form/information-form.component';
import {ChallengeEditorComponent} from './components/challenge-editor/challenge-editor.component';


const routes: Routes = [
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
    component: ChallengeEditorComponent,
    canActivate: [FormCompleteService]
  },
  {
    path: '',
    redirectTo: '/declaration',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/editor',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
