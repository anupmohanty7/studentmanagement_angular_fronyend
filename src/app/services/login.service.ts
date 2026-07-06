import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = 'https://student-management-backend-rbdz.onrender.com/login';

  constructor(private http: HttpClient) { }

  login(user: User): Observable<string> {

    return this.http.post(this.url, user, {
      responseType: 'text'
    });

  }

}