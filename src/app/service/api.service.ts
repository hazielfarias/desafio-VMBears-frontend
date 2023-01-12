import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataDTO } from '../model/data-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_SERVER = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  sendDataDTOToApi(list: DataDTO[]){
    const headers = { 'content-type': 'application/json'} 
    return this.http.post(this.API_SERVER, list, {headers: headers});
  }

}
