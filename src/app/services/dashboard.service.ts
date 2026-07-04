import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../models/dashboard-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'https://studentmanagement-pruz.onrender.com'+'/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(this.url);
  }
}