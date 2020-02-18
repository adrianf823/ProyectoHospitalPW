import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../services/medicos.service';
import { MedicosModel } from '../../models/medico';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentMed } from 'src/app/Components/form-modal-medicos/form-modal-ap.component';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss']
})
export class MedicosComponent implements OnInit {

  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"));
medicosArray: MedicosModel[]=[]
medico:MedicosModel;
  constructor(public medicoserv:MedicosService,public modalService:NgbModal,public authservice: AuthService,public router:Router) { }

  ngOnInit() {
      this.medicoserv.getMedicoos().subscribe(resp => {
        this.medicosArray=resp;
      })

    
  }
  logOut(){
    this.authservice.logoutUser();
    this.router.navigate(['/registro']);
  }

  
  CrearMedico(){

      
    const modalRef = this.modalService.open(FormModalAPComponentMed);
    modalRef.result.then((result) => {
      this.medicoserv.getMedicoos().subscribe(resp => {
        this.medicosArray=resp;
      })
    });
    
  }

  EliminarMedico(id){
    this.medicoserv.deleteMedicoos(id).subscribe(res =>{
      this.medicoserv.getMedicoos().subscribe(resp => {
        this.medicosArray=resp;
      })
    })
  }
  EditarMedico(med:MedicosModel ,id){
    const modalRef = this.modalService.open(FormModalAPComponentMed);
  modalRef.componentInstance.modif = true;
  modalRef.componentInstance.medicom=med;
  modalRef.result.then((result) => {
    this.medicoserv.getMedicoos().subscribe(resp => {
      this.medicosArray=resp;
    })
  });
  }

  buscarMedico() {
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
}
