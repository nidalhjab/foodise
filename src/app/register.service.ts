import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResult } from './countryCodes.model';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  responseData: any;
  mainUrl = 'http://api-dev.gofoodsie.com/api/v1/';
  constructor(private http: HttpClient) {}
  registUser(data: User): Observable<ApiResult> {
    const suffixUrl = 'registration';
    const result = this.http.post<ApiResult>(this.mainUrl + suffixUrl, data);
    return result;
  }
  postImg(data: any): Observable <ApiResult> {
    const suffixUrl = '/users/' + data.id + '/' + data.data;
    const result = this.http.post<ApiResult>(this.mainUrl + suffixUrl, data);
    return result;
  }
}
