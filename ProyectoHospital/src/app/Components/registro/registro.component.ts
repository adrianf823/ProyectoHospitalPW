
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
      Foto:'https://img.icons8.com/cotton/50/000000/name--v2.png',
      Nombre: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      rol:''
    });
  }
  onRegister(form): void {
    this.usuario={
      id:form.id,
      Foto:'https://img.icons8.com/cotton/50/000000/name--v2.png',
      Nombre:form.Nombre ,
      email: form.email,
      password: form.password,
      rol:"admin"
    }
      this.authService
        .registerUser(this.usuario)
        .subscribe(user => {
          this.authService.setUser(user);
          const token = user.id;
          console.log(user)
          this.authService.setToken(token);
          this.router.navigate(['/medicos']);
        },error=>{
          alert("No puedes dejar nada en blanco y el correo debe estar bien ")
        });
      

  }
  matcher = new MyErrorStateMatcher();
}
