
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/auth.service'
import {UsuarioModel} from '../../models/usuario'
import { Router } from '@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  rol=false;
  TipoRol;
  myForm: FormGroup;

  constructor(public authService:AuthService, public router:Router, public formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private createForm() {
    this.myForm = this.formBuilder.group({
      Foto:'s',
      Nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rol:this.TipoRol
    });
  }
  onRegister(form): void {
    this.usuario={
      id:form.id,
      Foto:'s',
      Nombre:form.Nombre ,
      email: form.email,
      password: form.password,
      rol:this.TipoRol
    }
      console.log(this.rol)
      this.authService
        .registerUser(this.usuario)
        .subscribe(user => {
          this.authService.setUser(user);
          const token = user.id;
          console.log(user)
          this.authService.setToken(token);
          this.router.navigate(['/medicos']);
        });
      

  }
tiporol(){

  if(this.rol){
    this.TipoRol="admin"
  }else{
    this.TipoRol="normal"
  }
  console.log(this.TipoRol)
  console.log(this.myForm.value)
}
  matcher = new MyErrorStateMatcher();
}
