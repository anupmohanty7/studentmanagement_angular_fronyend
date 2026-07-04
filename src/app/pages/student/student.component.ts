import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  students: Student[] = [];
  searchName: string = '';
  isEdit: boolean = false;

  student: Student = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    course: '',
    address: '',
    gender: '',
    dob: ''
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.getAllStudents();
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

  saveStudent(): void {
    this.studentService.saveStudent(this.student).subscribe({
      next: () => {
        alert('Student saved successfully');
        this.resetForm();
        this.getAllStudents();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  editStudent(student: Student): void {
    this.student = { ...student };
    this.isEdit = true;
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: () => {
        alert('Student updated successfully');
        this.resetForm();
        this.isEdit = false;
        this.getAllStudents();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          alert('Student deleted successfully');
          this.getAllStudents();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  searchStudent(): void {
    if (this.searchName.trim() === '') {
      this.getAllStudents();
      return;
    }

    this.studentService.searchStudent(this.searchName).subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
    this.isEdit = false;
  }

  resetForm(): void {
    this.student = {
      id: 0,
      name: '',
      email: '',
      mobile: '',
      course: '',
      address: '',
      gender: '',
      dob: ''
    };
  }
}