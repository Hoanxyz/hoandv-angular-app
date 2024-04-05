import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from "../models/models";
import {users} from '../datas/datas'
import {HttpClient} from "@angular/common/http";
import {listApis} from "./global-variables.constant";

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  getUser(userCode: string): Observable<User | undefined> {
    const user = users.find(item => item.code === userCode);
    return of(user);
  }

  createUser(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/register`, formData)
  }

  login(formData: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/login`, formData)
  }

  getCurrentUser(): any {
    const userData = localStorage.getItem("currentUser");
    return userData ? JSON.parse(userData) : null;
  }

  getUserByName(params: any): Observable<any> {
    return this.http.get<any>(`${listApis.local}/user/get-user-by-name`, {params: {...params}})
  }

  updateUser(userData: any, id: any): Observable<any> {
    return this.http.post<any>(`${listApis.local}/user/update/${id}`, userData)
  }

  setNewDataUser(name: string): void {
    this.getUserByName({name}).subscribe(
      (res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
