import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TraductorService {

  private url = environment.API_URL

  constructor(private http: HttpClient) { }

  createTraduccion(entrada: any){
    return this.http.post<any>(this.url + '/traducir', entrada)
  }
}
