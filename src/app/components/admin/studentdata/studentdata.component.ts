import { Component, inject, ViewChild } from '@angular/core';
import { Student } from '../../../models/student';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { StudentService } from '../../../service/student.service';
import { AuthService } from '../../../service/auth.service';
import { AddUpdateComponent } from '../add-update/add-update.component';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';
import { SharedService } from '../../../service/shared.service';

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
        RouterModule,
        AddUpdateComponent,
        MatDialogModule
    ],
    templateUrl: './studentdata.component.html',
    styleUrl: './studentdata.component.scss'
})
export class StudentdataComponent {

    public sharedService = inject(SharedService)

    displayedColumns: string[] = ['Firstname', 'lastname', 'email', 'gender', 'actions'];
    dataSource: MatTableDataSource<Student>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private studentService: StudentService,
        private router: Router,
        private dialog: MatDialog,
        private authservice: AuthService
    ) {
        this.dataSource = new MatTableDataSource<Student>();
    }

    ngOnInit(): void {
        this.loadStudents();
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

    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    // Add these methods:
    addStudent(): void {
        const dialogRef = this.dialog.open(AddUpdateComponent, {
            width: '500px',
            data: { student: null },
            disableClose: true // Prevents closing by clicking outside
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loadStudents();
            }
        });
    }

    updateStudent(student: Student): void {
        const dialogRef = this.dialog.open(AddUpdateComponent, {
            width: '500px',
            data: { student },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loadStudents();
            }
        });
    }

    deleteStudent(student: Student): void {
        const dialogRef = this.dialog.open(DeleteStudentComponent, {
            data: { student },
            width: '400px',
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.loadStudents();
            }
        });
    }

    openDialog(student: Student | null = null): void {
        const dialogRef = this.dialog.open(AddUpdateComponent, {
            width: '400px',
            data: { student }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadStudents();
            }
        });
    }

}