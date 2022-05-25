import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signUp(data: any): Observable<any>{
    return this.http.post("http://localhost:8787/api/v1/user/save", data);
  }

  matchUser(data: any): Observable<any>{
    return this.http.post("http://localhost:8787/api/v1/user/forgetPass", data);
  }
  resetPass(data: any): Observable<any>{
    const headers = { 'content-type': 'application/json' };
    return this.http.post("http://localhost:8787/api/v1/user/reset", data, {headers: headers});
  }
}
