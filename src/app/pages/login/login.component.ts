import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { User } from '../../models/user';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    students: Student[] = [];
  user: User = {
    username: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private studentService: StudentService
  ) {}

  login(): void {
    this.loginService.login(this.user).subscribe({
      next: (response: string) => {
        if (response === 'Login successful') {
          alert('Login successful');
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid username or password');
        }
      },
      error: () => {
        alert('Login failed');
      }
    });
  }
   getAllStudents(): void {
      this.studentService.getAllStudents().subscribe({
        next: (data: Student[]) => {
          this.students = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  
}