import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MedicosModel } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  selectedMedicoo: MedicosModel;
  medicoos: MedicosModel[];
  
  readonly URL_API = 'http://localhost:3000/api/Medicos';

  constructor(private http: HttpClient) {
    this.selectedMedicoo = new MedicosModel();
  }

  postMedicoos(medicoos: MedicosModel) {
    return this.http.post(this.URL_API, medicoos);
  }

  getMedicoos() {
    return this.http.get<[]>(this.URL_API);
  }

  putMedicoos(id,medicos: MedicosModel) {
    const medTemp = {
      ...medicos
    };

    delete medTemp.id;
    return this.http.put(this.URL_API + `/${id}`, medTemp);
  }
  uploadImages(img:any,name){
    return this.http.post(`http://localhost:3000/api/containers/FileUpload`,{file:img,name:name})
  }

  deleteMedicoos(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
}