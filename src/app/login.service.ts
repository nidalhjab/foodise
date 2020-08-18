import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from './countryCodes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  responseData: any;
  codes: any;
  mainUrl = 'http://api-dev.gofoodsie.com/api/v1/';
  constructor(private http: HttpClient) {}

  getCounteryCodes(): Observable<ApiResult> {
    console.log('in the servicee');
    const data = 'country_codes_lookups';
    const result = this.http.get<ApiResult>(this.mainUrl + data);
    return result;
  }
}
