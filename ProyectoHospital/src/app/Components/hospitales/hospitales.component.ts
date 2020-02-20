import { Component, OnInit } from '@angular/core';
import {HospitalesModel} from "../../models/hospitales"
import { HospitalesService } from 'src/app/services/hospitales';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponent } from 'src/app/Components/form-modal-Hospitales/form-modal-ap.component';
import { FormModalAPComponentUser } from 'src/app/Components/form-modal-Usuario/form-modal-ap.component';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
import { ViewChild,ElementRef } from '@angular/core'
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.scss']
})
export class HospitalesComponent implements OnInit {
 Usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"));
hospitalesArray: HospitalesModel[]=[]
hospital:HospitalesModel;
  constructor(public hospitalesServ:HospitalesService, public modalService:NgbModal, public authservice: AuthService,public router:Router) { }

  ngOnInit() {
    if(localStorage.getItem("update")=="1"){
      localStorage.setItem("update","0")
      setTimeout(() => {
        location.reload()
      }, 1000);
    }
    console.log(this.Usuario.email)
      this.hospitalesServ.getHospitalees().subscribe(resp => {
        this.hospitalesArray=resp;
        if(localStorage.getItem("updateusertabla")=="1"){
        if(localStorage.getItem("reload")=="0"){
          localStorage.setItem("reload","1");
         location.reload()
        }
      }
        
          this.hospitalesArray.forEach(element => {
            console.log(this.hospitalesArray)
            console.log(element)
            if(localStorage.getItem("auxUserN")==element.Usuario || localStorage.getItem("auxUserEm")==element.email){
              console.log(element)
              this.hospital={
                Foto:element.Foto,
                Nombre:element.Nombre,
                  Usuario:this.Usuario.Nombre,
                  email:this.Usuario.email,
                  userId:this.Usuario.id
                
              }
              console.log(this.hospital)
              this.hospitalesServ.putHospitalees(element.id,this.hospital).subscribe(resp=>{
                this.hospitalesServ.getHospitalees().subscribe()
              })
            }
          });
          
        
      })
      
      

  }
  logOut(){
    this.authservice.logoutUser();
    this.router.navigate(['/registro']);
  }
  CrearHospital(){
    const modalRef = this.modalService.open(FormModalAPComponent);
    modalRef.result.then((result) => {
      this.hospitalesServ.getHospitalees().subscribe(resp => {
        this.hospitalesArray=resp;
      })
    });
    
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
  EliminarHospital(id){
    this.hospitalesServ.deleteHospitalees(id).subscribe(res =>{
      this.hospitalesServ.getHospitalees().subscribe(resp => {
        this.hospitalesArray=resp;
        localStorage.setItem("update2","1")
      })
    })
  }
  EditarHospital(hosp:HospitalesModel ,id){
    const modalRef = this.modalService.open(FormModalAPComponent);
  modalRef.componentInstance.modif = true;
  modalRef.componentInstance.hospitalm=hosp;
  modalRef.result.then((result) => {
    this.hospitalesServ.getHospitalees().subscribe(resp => {
      this.hospitalesArray=resp;
    })
  });
  }

  formUsuario(){
    const modalRef = this.modalService.open(FormModalAPComponentUser);
  }

}

