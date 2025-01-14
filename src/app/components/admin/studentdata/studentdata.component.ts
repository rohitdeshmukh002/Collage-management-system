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

@Component({
  selector: 'app-studentdata',
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
  templateUrl: './studentdata.component.html',
  styleUrl: './studentdata.component.scss'
})
export class StudentdataComponent {
  displayedColumns: string[] = ['Firstname', 'lastname', 'email', 'gender', 'actions'];
  dataSource: MatTableDataSource<Student>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router
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

  loadStudents() {
    // Implement your student data loading logic here
  }

  updateStudent(student: Student) {
    // Implement your student update logic here
  }

  deleteStudent(student: Student) {
    // Implement your student delete logic here
  }

  logOut() {
    // Implement your logout logic here
  }
}