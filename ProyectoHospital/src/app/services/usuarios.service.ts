import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UsuarioModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(public http:HttpClient) { }

  readonly URL_API = 'http://localhost:3000/api/Usuarios';

putUsuarios(id,usuarios: UsuarioModel) {
  const usuarioTemp = {
    ...usuarios
  };

  delete usuarioTemp.id;
  return this.http.put(this.URL_API + `/${id}`, usuarioTemp);
}
patchUsuarios(id,usuarios: UsuarioModel) {
  const usuarioTemp = {
    ...usuarios
  };

  delete usuarioTemp.id;
  return this.http.patch(this.URL_API + `/${id}`, usuarioTemp);
}
deleteUsuario(id: string) {
  return this.http.delete(this.URL_API + `/${id}`);
}
getUsuarios() {
  return this.http.get<[]>(this.URL_API);
}
changePassword(oldPassword,newPassword){
  let accessToken = localStorage.getItem("accessToken");
  const url_api = `http://localhost:3000/api/Usuarios/change-password?access_token=${accessToken}`;
  return this.http.post<UsuarioModel>(url_api, {oldPassword,newPassword})
}
}
