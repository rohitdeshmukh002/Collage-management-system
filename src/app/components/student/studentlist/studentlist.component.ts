import { Component, ViewChild } from '@angular/core';
import { Student } from '../../../models/student';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StudentService } from '../../../service/student.service';

@Component({
  selector: 'app-studentlist',
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
    MatCardModule,
    RouterLink
  ],
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.scss'
})
export class StudentlistComponent {

   displayedColumns: string[] = ['Firstname', 'lastname', 'email', 'userType', 'gender', 'actions'];
    dataSource: MatTableDataSource<Student>;
    
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    constructor(
      private dialog: MatDialog,
      private router: Router,
      private studentService: StudentService
    ) {
      this.dataSource = new MatTableDataSource<Student>();
    }
  
    ngOnInit() {
      this.loadStudents();
    }
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  
    loadStudents(): void {
      this.studentService.getall().subscribe({
          next: (students) => {

              // console.log("students:");
              // console.log(students);

              this.dataSource = new MatTableDataSource(students);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
          },
          error: (error) => {
              console.error('Error loading students:', error);
              // You might want to add error handling/notification here
          }
      });
  }
  }

