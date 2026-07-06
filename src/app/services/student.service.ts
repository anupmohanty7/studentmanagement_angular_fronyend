import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private url = 'http://localhost:8080/students';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.url}/${id}`);
  }

  saveStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.url, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.url}/${id}`, student);
  }

  deleteStudent(id: number): Observable<string> {
    return this.http.delete(`${this.url}/${id}`, {
      responseType: 'text'
    });
  }

  searchStudent(name: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.url}/search/${name}`);
  }

}