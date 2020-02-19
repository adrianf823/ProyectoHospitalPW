import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import {HospitalesModel} from "../../models/hospitales"
import {UsuarioModel} from "../../models/usuario";
import { HospitalesService } from 'src/app/services/hospitales';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../../services/auth.service'
import {UsuariosService} from '../../services/usuarios.service'

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentUser {
  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"));
  @Input() public modif=false; 
  nombreIcono;
  modifPass:boolean=false
  imagename;
  ext;
  user: UsuarioModel;
  myForm: FormGroup;
  filePath;
  Imgsrc='/assets/image-placeholder.jpg';
  Imgpreview:any = null;
  file;
  img;
  cambio:boolean=false
  isSubmitted:boolean=false;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: HospitalesService,
   private http: HttpClient,
   public authService:AuthService,
   public userService:UsuariosService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.idm.setValue(this.Usuario.id, {
        onlySelf: true
      })
    this.Fotom.setValue(this.Usuario.Foto, {
      onlySelf: true
    })
    this.Imgsrc=this.Usuario.Foto
    //if(this.peliculam.portada!=null){
    //this.Imgsrc=this.peliculam.portada
    //}
    //console.log(this.port)
    this.Nombrem.setValue(this.Usuario.Nombre, {
      onlySelf: true
    })
    this.emailm.setValue(this.Usuario.email, {
      onlySelf: true
    })
    
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      id:'',
      Foto:'',
      Nombre:'',
      email: '',
      passwordOld:'',
      passwordNew:''
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
 handleFileSelect(evt){
  var files = evt.target.files;
  this.file = files[0];
  this.ext=this.file.name;
  this.ext = this.ext.slice((this.ext.lastIndexOf(".") - 1 >>> 0) + 2);
if (files && this.file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(this.file);
}
}
_handleReaderLoaded(readerEvt) {
  this.cambio=true;
  var binaryString = readerEvt.target.result;
         this.img= btoa(binaryString);
         console.log(btoa(binaryString));
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
    this.Imgpreview=null;
    this.Fotom.setValue(this.Imgsrc, {
      onlySelf: true
    })
  }
}
 get Fotom() {
  return this.myForm.get('Foto');
}
get emailm() {
  return this.myForm.get('email');
}
get idm() {
  return this.myForm.get('id');
}
get Nombrem() {
  return this.myForm.get('Nombre');
}
 submitForm(formValue)
{
  if(this.myForm.valid){
console.log(formValue)
if(this.cambio){
  this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
  this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
  this.user={
    id:this.Usuario.id,
    Foto:this.imagename,
    Nombre:formValue.Nombre,
    email: formValue.email,
    password:formValue.password,
    rol:this.Usuario.rol
  }
  this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
  });
}else{
  var ext1=this.Usuario.Foto;
  var exten = ext1.split(".")
  var ext = exten[2];
  console.log(ext)
  this.user={
    id:this.Usuario.id,
    Foto:this.Usuario.Foto,
    Nombre:formValue.Nombre,
    email: formValue.email,
    password:formValue.password,
    rol:this.Usuario.rol
  }
  this.service.uploadImages(this.img,`${formValue.Nombre.trim()}Img`+'.'+ext).subscribe(resp =>{
    console.log("imagen subida");
  });
}
console.log(this.user)
localStorage.setItem("auxUserN",this.Usuario.Nombre)
localStorage.setItem("auxUserEm",this.Usuario.email) 
if(this.modifPass){
this.userService.changePassword(formValue.passwordOld,formValue.passwordNew).subscribe(resp=>{
  Swal.fire({
    title: 'Espere',
    text: 'Modificando usuario...',
    icon: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();
  this.userService.patchUsuarios(this.Usuario.id,this.user).subscribe(resp=>{
    Swal.close()
    this.authService.setUser(this.user)
    this.activeModal.close(this.myForm.value);
    localStorage.setItem("reload","0");
    localStorage.setItem("updateusertabla","1");
    localStorage.setItem("update","1")
    localStorage.setItem("update2","1")
      location.reload()
  })
},error=>{
  alert("Contraseña antigua incorrecta")
})  
}else{
  Swal.fire({
    title: 'Espere',
    text: 'Modificando usuario...',
    icon: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();
  this.userService.patchUsuarios(this.Usuario.id,this.user).subscribe(resp=>{
    Swal.close()
    this.authService.setUser(this.user)
    this.activeModal.close(this.myForm.value);
    localStorage.setItem("reload","0");
    localStorage.setItem("updateusertabla","1");
    localStorage.setItem("update","1")
    localStorage.setItem("update2","1")
      location.reload()
  })
}
}
}
get formControls(){
  return this.myForm['controls'];
}

}