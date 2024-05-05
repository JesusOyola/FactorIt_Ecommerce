import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userData$: BehaviorSubject<string>;
  constructor() { 
    this.userData$ = new BehaviorSubject<string>("");
  }

  getUser() {
    return this.userData$.asObservable();
  }

  setUser(user: string) {
    this.userData$.next(user);
  }
}
