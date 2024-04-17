import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private toggleSearchSource = new Subject<void>();
  toggleSearch$ = this.toggleSearchSource.asObservable();


  constructor() { }

  emmitToggleSearch() {
    this.toggleSearchSource.next();
  }
}
