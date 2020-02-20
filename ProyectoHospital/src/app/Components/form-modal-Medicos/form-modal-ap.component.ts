import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import {HospitalesModel} from "../../models/hospitales"
import {MedicosModel} from "../../models/medico"
import {UsuarioModel} from "../../models/usuario";
import { HospitalesService } from 'src/app/services/hospitales';
import { MedicosService } from 'src/app/services/medicos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentMed {
  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"));
  @Input() public modif=false; 
  @Input() public medicom: MedicosModel;
  hospitalesArray: HospitalesModel[] = [];
  file;ext;img;nombreIcono;imagename='/assets/image-placeholder.jpg';
  medicos: MedicosModel;
  cambio:boolean=false;
  HospValid=false;
  myForm: FormGroup;
  filePath;
  Imgsrc='/assets/image-placeholder.jpg';
  Imgpreview:any = null;
  isSubmitted:boolean=false;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private serviceHosp: HospitalesService,
   private serviceMed: MedicosService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   console.log(this.modif)
   if(this.modif==true){
    this.idm.setValue(this.medicom.id, {
      onlySelf: true
    })
    this.Imgsrc=this.medicom.Foto
  this.Fotom.setValue(this.medicom.Foto, {
    onlySelf: true
  })
  //if(this.peliculam.portada!=null){
  //this.Imgsrc=this.peliculam.portada
  //}
  //console.log(this.port)
  this.Nombrem.setValue(this.medicom.Nombre, {
    onlySelf: true
  })
  this.Usuariom.setValue(this.medicom.Usuario, {
    onlySelf: true
  })
  this.HospitalN.setValue(this.medicom.Hospital, {
    onlySelf: true
  })
  }else{
    this.Usuariom.setValue(this.Usuario.Nombre, {
      onlySelf: true
    })
  }
  
 this.serviceHosp.getHospitalees().subscribe(resp =>{
   this.hospitalesArray=resp;
 })
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      id:'',
      Foto:'s',
      Nombre: ['', [Validators.required]],
      Hospital: ['', [Validators.required]],
      Usuario: ['', [Validators.required]],
      email:this.Usuario.email
    });
  }/*
  private submitForm(formValue) {
    
    this.isSubmitted=true
if(this.myForm.valid){
  console.log(this.Imgpreview)
  if(this.Imgpreview==null && this.modif == false){
    Swal.fire({
      text:'Tienes que añadir una portada',
      icon: 'warning'
    })
  }else{
    if(this.modif==false){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo película...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    this.filePath = `${formValue.genero}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['portada'] = url;
          this.pelicula=formValue;
  this.service.crearPelicula(this.pelicula).subscribe( resp => {
            this.resetForm();
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
  }else{
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando película...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    if(this.Imgpreview==null){
      console.log(this.peliculam)
      this.service.actualizarPelicula(this.myForm.value).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.activeModal.close(this.myForm.value);
      })
    }else{
    this.filePath = `${formValue.genero}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['portada'] = url;
          this.peliculam=formValue;
          console.log(this.peliculam)
          this.service.actualizarPelicula(this.myForm.value).subscribe( resp => {
            this.resetForm();
            this.modif=false;
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
    }
  }
}
}else{
    
}
  }
  get generon() {
    return this.myForm.get('genero');
  }
  get port() {
    return this.myForm.get('portada');
  }
  get descrip() {
    return this.myForm.get('descripcion');
  }
  get titul() {
    return this.myForm.get('titulo');
  }
  get idm() {
    return this.myForm.get('id');
  }
  cambiarGenero(e) {
    this.generon.setValue(e.target.value, {
      onlySelf: true
    })
  }
  cambiaPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader;
      reader.onload = (e:any) => {
        this.Imgsrc=e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
      this.Imgpreview=event.target.files[0]
    }else{
      this.Imgsrc='/assets/img/image-placeholder.jpg'
      this.Imgpreview=null;
      this.port.setValue(this.Imgsrc, {
        onlySelf: true
      })
    }
  }
  cambiarPortada(e){
    console.log(e.target.value)
    this.port.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get formControls(){
    return this.myForm['controls'];
  }
  resetForm() {
    this.myForm.reset();
    this.Imgsrc = '/assets/img/image_placeholder.jpg';
    this.Imgpreview = null;
    this.isSubmitted = false;
  }
  */
 cambiarHospital(e) {
  this.HospValid=true;
  this.HospitalN.setValue(e.target.value, {
    onlySelf: true
  })
}
cambiaPreview(event:any){
  if(event.target.files && event.target.files[0]){
    const reader = new FileReader;
    reader.onload = (e:any) => {
      this.Imgsrc=e.target.result
    }
    reader.readAsDataURL(event.target.files[0])
    this.Imgpreview=event.target.files[0]
  }else{
    this.Imgsrc='/assets/image-placeholder.jpg'
    this.img='/assets/image-placeholder.jpg'
    this.Imgpreview=null;
    this.Fotom.setValue(this.Imgsrc, {
      onlySelf: true
    })
  }
}
get Usuariom() {
  return this.myForm.get('Usuario');
}
get Fotom() {
  return this.myForm.get('Foto');
}
get Nombrem() {
  return this.myForm.get('Nombre');
}
get idm() {
  return this.myForm.get('id');
}
 get HospitalN() {
  return this.myForm.get('Hospital');
}
 submitForm(formValue)
{
  if(formValue.Hospital=="Elije un hospital"){
    formValue.Hospital="";
    console.log("1")
    this.HospValid=false;
  }else if(formValue.Hospital==""){
    this.HospValid=false;
    console.log("2")
    console.log(this.isSubmitted)
  }else if(formValue.Hospital=="undefined"){
    this.HospValid=false;
    console.log("3")
  }else{
    this.HospValid=true;
    console.log("4")
  }
  this.isSubmitted=true
  if(this.myForm.valid && this.HospValid){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo médico...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();

if(!this.modif && this.HospValid){
  this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
  if(this.file!=null){
    this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
    }else{
      this.imagename='/assets/image-placeholder.jpg';
    }
  this.serviceMed.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
  });
  this.HospValid=true;
  this.medicos={
    Nombre:formValue.Nombre,
    Foto:this.imagename,
    Hospital:formValue.Hospital,
    Usuario:this.Usuario.Nombre,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
this.serviceMed.postMedicoos(this.medicos).subscribe(resp =>{
  this.isSubmitted=false
  Swal.close();
  this.activeModal.close(this.myForm.value);
});
}else if(this.HospValid){
  this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
  if(this.file!=null){
  this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
  }else{
    this.imagename='/assets/image-placeholder.jpg';
  }
  if(this.cambio){
  this.serviceMed.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
  });

  this.medicos={
    Nombre:formValue.Nombre,
    Foto:this.imagename,
    Hospital:formValue.Hospital,
    Usuario:this.Usuario.Nombre,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
}else{
  var ext1=this.medicom.Foto;
  var exten = ext1.split(".")
  var ext = exten[2];
  console.log(ext)
  this.medicos={
    Foto:this.medicom.Foto,
    Nombre:formValue.Nombre,
    Usuario:this.Usuario.Nombre,
    Hospital:formValue.Hospital,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
  this.serviceMed.uploadImages(this.img,`${formValue.Nombre.trim()}Img`+'.'+ext).subscribe(resp =>{
    console.log("imagen subida");
  });
}
  this.serviceMed.putMedicoos(formValue.id,this.medicos).subscribe(resp =>{
    this.modif=false;
  this.isSubmitted=false
  this.HospValid=true;
  Swal.close();
  this.activeModal.close(this.myForm.value);
  })
}
  }
}
get formControls(){
  return this.myForm['controls'];
}
handleFileSelect(evt){
  var files = evt.target.files;
  this.file = files[0];
  console.log(this.file)
  if(this.file!=null){
  this.ext=this.file.name;
  this.ext = this.ext.slice((this.ext.lastIndexOf(".") - 1 >>> 0) + 2);
if (files && this.file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(this.file);
}
  }
}
_handleReaderLoaded(readerEvt) {
  this.cambio=true;
  var binaryString = readerEvt.target.result;
         this.img= btoa(binaryString);
         console.log(btoa(binaryString));
 }
}