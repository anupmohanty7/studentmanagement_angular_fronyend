import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardResponse } from '../../models/dashboard-response';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  dashboard: DashboardResponse = {
    totalStudents: 0,
    totalCourses: 0,
    totalMaleStudents: 0,
    totalFemaleStudents: 0
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {

    this.dashboardService.getDashboardData().subscribe({

      next: (data: DashboardResponse) => {

        this.dashboard = data;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}