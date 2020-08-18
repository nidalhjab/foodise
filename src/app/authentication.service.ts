import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {}
  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(Cookie.get('user'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }
  login(phone: string, country_code_lookup_id: number, password: string) {
    const result = this.http.post<any>(
      `http://api-dev.gofoodsie.com/api/v1/login`,
      { phone, country_code_lookup_id, password }
    );
    return result;
  }
  logout() {
    const result = this.http.post<any>(`http://api-dev.gofoodsie.com/api/v1/logout`, null);
    Cookie.delete('user');
    this.currentUserSubject.next(null);
    return result;
  }

}
