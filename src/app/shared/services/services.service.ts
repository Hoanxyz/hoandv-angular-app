import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor() {}

  validateUsername(username: string): boolean {
    let existedUsers = ['dvhoan', 'tdnam', 'ltanh', 'ntanh', 'npngoc', 'vhhiep', 'ndnam', 'btha', 'bhyen',
      'nttnhung', 'vthnga', 'lhngoc'];
    return existedUsers.includes(username);
  }
}
