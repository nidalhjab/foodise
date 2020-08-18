import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { ApiResult } from './countryCodes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  responseData: any;
  mainUrl = 'http://api-dev.gofoodsie.com/api/v1/';
  constructor(private http: HttpClient) { }
  editInfo(data: any, id: number) {
    console.log(data);
    const suffixUrl = '/users/' + id ;
    const result = this.http.put<ApiResult>(this.mainUrl + suffixUrl, data);
    return result;
  }
  uploadImg(image_type, id, image_files): Observable<ApiResult> {
    let image_file = new File ( [""], image_files.name);
    console.log(image_file);
    const result = this.http.post<ApiResult>(this.mainUrl + 'users/' + id + '/media', { image_file, image_type});
    return result;
  }
  // getUser() {
  //   const result = this.http.get<ApiResult>(this.mainUrl + '/users/' + 321);
  //   return result;
  // }
}
