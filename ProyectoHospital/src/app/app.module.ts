import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistroComponent } from './Components/registro/registro.component';
import { HospitalesComponent } from './Components/hospitales/hospitales.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { MedicosComponent } from './Components/medicos/medicos.component';
import { FormModalAPComponent } from 'src/app/Components/form-modal-Hospitales/form-modal-ap.component';
import { FormModalAPComponentMed } from 'src/app/Components/form-modal-medicos/form-modal-ap.component';
import { FormModalAPComponentUser } from 'src/app/Components/form-modal-Usuario/form-modal-ap.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HospitalesComponent,
    MedicosComponent,
    FormModalAPComponent,
    FormModalAPComponentMed,
    FormModalAPComponentUser,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    NgbModule,
    NgxPaginationModule,
    MatButtonToggleModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    FormModalAPComponent,
    FormModalAPComponentMed,
    FormModalAPComponentUser
  ]
})
export class AppModule { }
