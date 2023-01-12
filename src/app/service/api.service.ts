import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_SERVER = "http://localhost:8080";

  constructor(http: HttpClient) { }

  
}
