import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../../service/student.service';
import { Student } from '../../../models/student';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-add-update',
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
        MatOptionModule,
        MatSelect,
        MatDialogActions,
        MatDialogContent,
        ReactiveFormsModule,
        RouterModule,
        MatIcon
    ],
    templateUrl: './add-update.component.html',
    styleUrl: './add-update.component.scss'
})
export class AddUpdateComponent {
    studentForm: FormGroup;
    isEditMode: boolean;

    constructor(
        private fb: FormBuilder,
        private studentService: StudentService,
        @Optional() private dialogRef: MatDialogRef<AddUpdateComponent>, // Mark MatDialogRef as optional
        @Optional() @Inject(MAT_DIALOG_DATA) public data: { student: Student | null } // Mark MAT_DIALOG_DATA as optional
    ) {
        this.isEditMode = !!data?.student; // Check if data exists and contains a student object
        this.studentForm = this.fb.group({
            Firstname: [data?.student?.Firstname || '', Validators.required],
            lastname: [data?.student?.lastname || '', Validators.required],
            email: [data?.student?.email || '', [Validators.required, Validators.email]],
            gender: [data?.student?.gender || '', Validators.required],
            password: [data?.student?.password || '', [Validators.required, Validators.minLength(6)]]
        });

        if (this.isEditMode) {
            this.studentForm.get('password')?.disable(); // Disable password field in edit mode
        }
    }

    onSubmit() {
        const studentData = this.studentForm.getRawValue();
        if (this.isEditMode) {
            this.studentService.update({ ...studentData, id: this.data?.student?.id }).then(() => {
                this.dialogRef?.close(true); // Close the dialog and send a success signal
            });
        } else {
            this.studentService.create(studentData).then(() => {
                
                this.dialogRef?.close(true); // Close the dialog and send a success signal
             
            });
        }
    }

    onCancel() {
        this.dialogRef?.close(true); // Close the dialog and send a success signal
    }
}