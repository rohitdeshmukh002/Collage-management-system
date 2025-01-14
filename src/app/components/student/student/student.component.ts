import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Student } from '../../../models/student';

interface Feature {
  title: string;
  description: string;
  icon: string;
  route: string;
}

interface QuickAction {
  title: string;
  icon: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
            CommonModule,
            MatInputModule,
            MatToolbarModule,
            MatSidenavModule,
            MatListModule,
            MatSortModule,
            MatButtonModule,
            MatIconModule,
            MatPaginatorModule,
            MatTableModule,
            MatCardModule
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent {

  quickActions: QuickAction[] = [
     { title: 'Add Student', icon: 'person_add', route: '/students/add', color: '#4CAF50' },
     { title: 'Take Attendance', icon: 'fact_check', route: '/attendance', color: '#2196F3' },
     { title: 'View Reports', icon: 'assessment', route: '/reports', color: '#FF9800' },
     { title: 'Manage Courses', icon: 'school', route: '/courses', color: '#9C27B0' }
   ];
 
   features: Feature[] = [
     {
       title: 'Student Management',
       description: 'Efficiently manage student profiles, academic records, and personal information in one place.',
       icon: 'people',
       route: '/students'
     },
     {
       title: 'Attendance Tracking',
       description: 'Track and monitor student attendance with our easy-to-use digital attendance system.',
       icon: 'event_available',
       route: '/attendance'
     },
     {
       title: 'Performance Analytics',
       description: 'Get detailed insights into student performance with comprehensive analytics and reports.',
       icon: 'insights',
       route: '/analytics'
     },
     {
       title: 'Course Management',
       description: 'Manage courses, assignments, and educational resources effectively.',
       icon: 'library_books',
       route: '/courses'
     }
   ];
 
   constructor(private router: Router) {}
 
   navigate(route: string) {
     this.router.navigate([route]);
   }
 
   logOut(){
     
   }
 }