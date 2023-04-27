import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {EmployeePair} from "../models/employeePair";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  constructor(private http: HttpClient, private router: Router) {
  }

  Url = 'http://localhost:9089';

  getPairs() {
    return this.http.get<EmployeePair[]>(this.Url + '/pairs');
  }

  upload(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', this.Url+'/pairs/upload', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
