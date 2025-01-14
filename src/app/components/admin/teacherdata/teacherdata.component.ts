  import { Component, ViewChild } from '@angular/core';
  import { Teacher } from '../../../models/teacher';
  import { MatTableDataSource, MatTableModule } from '@angular/material/table';
  import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
  import { MatSort, MatSortModule } from '@angular/material/sort';
  import { MatDialog } from '@angular/material/dialog';
  import { Router, RouterModule } from '@angular/router';
  import { MatSidenavModule } from '@angular/material/sidenav';
  import { MatListModule } from '@angular/material/list';
  import { MatError, MatInputModule } from '@angular/material/input';
  import { CommonModule } from '@angular/common';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatCardModule } from '@angular/material/card';
  import { TeacherService } from '../../../service/teacher.service';
  import { AuthService } from '../../../service/auth.service';
  import { MatOption } from '@angular/material/core';
import DialogComponent from '../dialog/dialog.component';
import { DeleteTeacherComponent } from '../delete-teacher/delete-teacher.component';


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
          RouterModule,
          MatOption,
          MatError,

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
      private router: Router,
      private teacherService : TeacherService,
      private authService : AuthService
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
      this.teacherService.getall().subscribe({
        next: (teachers) =>{
          this.dataSource  = new MatTableDataSource(teachers);
          this.dataSource.paginator=this.paginator;
          this.dataSource.sort = this.sort;
        },
        error : (error) =>{
          console.error('error loading teachers:',error);
        }
      });
    }

    updateEmployee(teacher: Teacher) {

      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px',
        data: teacher,
      });
    
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.teacherService.update(result).then(() => {
            this.loadEmployees(); // Reload the updated data
          }).catch((error) => {
            console.error('Error updating teacher:', error);
          });
        }
      });
      
    }

        addteacher(): void {
            const dialogRef = this.dialog.open(DialogComponent, {
                width: '500px',
                data: { teacher : null },
                disableClose: true // Prevents closing by clicking outside
            });
    
            dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.loadEmployees();
                }
            });
        }
    
        updateteacher(teacher: Teacher): void {
            const dialogRef = this.dialog.open(DialogComponent, {
                width: '500px',
                data: { teacher },
                disableClose: true
            });
    
            dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.loadEmployees();
                }
            });
        }

    deleteEmployee(teacher: Teacher) {
       const dialogRef = this.dialog.open(DeleteTeacherComponent, {
            data: { teacher },
            width: '400px',
          });
        
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.loadEmployees();
            }
          });
    }

   
    

    logOut() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }