import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HospitalesModel } from '../models/hospitales';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  selectedHospitalees: HospitalesModel;
  hospitalees: HospitalesModel[];
  
  readonly URL_API = 'http://localhost:3000/api/Hospitales';
  readonly URL_API2 = 'http://localhost:3000/api/Containers/fotos/upload';

  constructor(private http: HttpClient) {
    this.selectedHospitalees = new HospitalesModel();
  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  postHospitalees(hospitalees: HospitalesModel) {
    return this.http.post(this.URL_API, hospitalees);
  }

  getHospitalees() {
    return this.http.get<[]>(this.URL_API);
  }

  putHospitalees(id,hospitales: HospitalesModel) {
    const hospitalTemp = {
      ...hospitales
    };

    delete hospitalTemp.id;
    return this.http.put(this.URL_API + `/${id}`, hospitalTemp);
  }

  deleteHospitalees(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
  uploadImages(img:any,name){
    return this.http.post(`http://localhost:3000/api/containers/FileUpload`,{file:img,name:name})
  }
}