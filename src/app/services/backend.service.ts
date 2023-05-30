import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICharacter, IHabilidades, IInventario } from '../interfaces/game.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly backendApiUrl = `${environment.backendUrl}/api/`;
  readonly endPoints = {
    characters: 'personajes',
    characterImage: 'media/upload'
  }

  constructor(
    private readonly http: HttpClient,
  ) { }


  private setParams(params: any) {
    const response = {};
    if (params) {
      Object.keys(params).forEach((key) => {
        if (typeof params[key] !== 'string') {
          response[key] = encodeURIComponent(JSON.stringify(params[key]));
        }
        else {
          response[key] = encodeURIComponent(params[key]);
        }
      });
    }
    return response;
  }

  // characters
  getCharacters(id?: any, params?: any): Observable<any> {
    let url = `${this.backendApiUrl}${this.endPoints.characters}`;
    if (id) {
      url = `${this.backendApiUrl}${this.endPoints.characters}/${id}`;
    }
    return this.http.get(url, { params: this.setParams(params) });
  }

  postCharacters(body: ICharacter, params?: any): Observable<any> {
    const url = `${this.backendApiUrl}${this.endPoints.characters}`;
    return this.http.post(url, body, { params: this.setParams(params) });
  }

  putCharacter(id: any, body: ICharacter, params?: any): Observable<any> {
    const url = `${this.backendApiUrl}${this.endPoints.characters}/${id}`;
    return this.http.put(url, body, { params: this.setParams(params) });
  }

  deleteCharacter(id: any, params?: any) {
    
    const url = `${this.backendApiUrl}${this.endPoints.characters}/${id}`;
    console.log(url);
    return this.http.delete(url, { params: this.setParams(params) });
  }

  updateCharacterImage(formData: FormData, params?: any): Observable<any> {
    const url = `${environment.backendUrl}/${this.endPoints.characterImage}`
    return this.http.post(url, formData, { params: this.setParams(params) });
  }

  //inventario
  getinventory(idPersonaje: any, params?: any): Observable<any> {
    const url = `${this.backendApiUrl}${this.endPoints.characters}/${idPersonaje}/objetos`;
    return this.http.get(url, { params: this.setParams(params) });
  }
  

  getObjectInventory(id: any, params?: any) {
    const url = `${this.backendApiUrl}objeto/${id}`;
    return this.http.get(url, { params: this.setParams(params) });
  }

  postItem(idPersonaje: any, body: IInventario, params?: any): Observable<any> {
    const url = `${this.backendApiUrl}objeto/${idPersonaje}`;
    return this.http.post(url, body, { params: this.setParams(params) });
  }

  deleteItem(idObjeto: any, params?: any) {
    const url = `${this.backendApiUrl}objeto/${idObjeto}`;
    return this.http.delete(url, { params: this.setParams(params) });
  }


  //habilidades
  gethabilidades(idPersonaje: any, params?: any): Observable<any> {
    const url = `${this.backendApiUrl}habilidades/personaje/${idPersonaje}`;
    return this.http.get(url, { params: this.setParams(params) });
  }

  postSkill(idPersonaje: any, body: IHabilidades, params?: any): Observable<any> {
    const url = `${this.backendApiUrl}habilidad/${idPersonaje}`;
    return this.http.post(url, body, { params: this.setParams(params) });
  }

  deleteSkill(idObjeto: any, params?: any) {
    const url = `${this.backendApiUrl}habilidad/${idObjeto}`;
    return this.http.delete(url, { params: this.setParams(params) });
  }
}
