import { Component, ViewChild } from '@angular/core';
import { Teacher } from '../../../models/teacher';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-teacherdata',
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
        RouterModule
  ],
  templateUrl: './teacherdata.component.html',
  styleUrl: './teacherdata.component.scss'
})
export class TeacherdataComponent {

  displayedColumns: string[] = ['fname', 'lname', 'email', 'salary', 'gender', 'actions'];
  dataSource: MatTableDataSource<Teacher>;
  @ViewChild(MatPaginator) paginator !: MatPaginator | null;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource();
    
  }

  ngOnInit() {
    // Initialize your data source here
    this.loadEmployees();
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

  loadEmployees() {
    // Implement your data loading logic here
  }

  updateEmployee(teacher: Teacher) {
    // Implement your update logic here
  }

  deleteEmployee(teacher: Teacher) {
    // Implement your delete logic here
  }

  

  logOut() {
    // Implement your logout logic here
  }
}