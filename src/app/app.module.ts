import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './components/editor/editor.component';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeclarationComponent } from './components/declaration/declaration.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InformationFormComponent} from './components/information-form/information-form.component';
import {ACE_CONFIG, AceConfigInterface, AceModule} from 'ngx-ace-wrapper';
import { ChallengeDetailsComponent } from './components/challenge-details/challenge-details.component';
import { ChallengeEditorComponent } from './components/challenge-editor/challenge-editor.component';
import {SplitterModule} from '@syncfusion/ej2-angular-layouts';
import {MarkdownModule, MarkdownService, MarkedOptions, MarkedRenderer} from 'ngx-markdown';
import { EditorHeaderComponent } from './components/editor-header/editor-header.component';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MenuModalComponent } from './components/menu-modal/menu-modal.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {

};

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    DeclarationComponent,
    InformationFormComponent,
    ChallengeDetailsComponent,
    ChallengeEditorComponent,
    EditorHeaderComponent,
    MenuModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AceModule,
    SplitterModule,
    MarkdownModule.forRoot(),
    MatIconModule,
    MatProgressSpinnerModule,
    NgbTooltipModule
  ],
  providers: [{
    provide: ACE_CONFIG,
    useValue: DEFAULT_ACE_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
