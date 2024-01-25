import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {User} from "../models/models";
import {users} from '../datas/datas'

@Injectable()
export class ApiService {
  constructor() {}

  getUser(userCode: string): Observable<User | undefined> {
    const user = users.find(item => item.code === userCode);
    return of(user);
  }
}
