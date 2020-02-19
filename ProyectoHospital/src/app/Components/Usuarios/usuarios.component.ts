import { Component, OnInit } from '@angular/core';
import {HospitalesModel} from "../../models/hospitales"
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentUser } from 'src/app/Components/form-modal-Usuario/form-modal-ap.component';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
 Usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"));
usuariosArray: UsuarioModel[]=[]
usuario:UsuarioModel;
  constructor(public usuariosServ:UsuariosService, public modalService:NgbModal, public authservice: AuthService,public router:Router) { }

  ngOnInit() {
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
      })
    }
  logOut(){
    this.authservice.logoutUser();
    this.router.navigate(['/registro']);
  }
  buscarHospital() {
    console.log("joe")
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  EliminarUsuario(id){
    this.usuariosServ.deleteUsuario(id).subscribe(res =>{
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
      })
    })
  }

  formUsuario(){
    const modalRef = this.modalService.open(FormModalAPComponentUser);
    modalRef.result.then((result) => {
      this.usuariosServ.getUsuarios().subscribe(resp => {
        this.usuariosArray=resp;
      })
  })

  }

  rolUpdate(user:UsuarioModel){
if(user.rol=="admin"){
user.rol="";
this.usuariosServ.patchUsuarios(user.id,user).subscribe(resp=>{
  this.usuariosServ.getUsuarios().subscribe();
  console.log(user)
  if(user.email==this.Usuario.email){
    this.authservice.setUser(user);
    location.reload()
    }
})
}else{
user.rol="admin";
this.usuariosServ.patchUsuarios(user.id,user).subscribe(resp=>{
  this.usuariosServ.getUsuarios().subscribe();
  console.log(user)
  if(user.email==this.Usuario.email){
  this.authservice.setUser(user);
  location.reload()
  }
})
}

  }
}

