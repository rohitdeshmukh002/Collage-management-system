import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../../service/teacher.service';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Teacher } from '../../../models/teacher';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dialog',
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
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export default class DialogComponent  {
  teacherForm: FormGroup;
  isEditing : boolean;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    @Optional() private dialogRef: MatDialogRef<DialogComponent>, // Mark MatDialogRef as optional
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { teacher: Teacher | null } // Mark MAT_DIALOG_DATA as optional
  ) {

    this.isEditing = !! data?.teacher;
    this.teacherForm = this.fb.group({
      fname: [data?.teacher?.fname ||'', Validators.required],
      lname: [data?.teacher?.lname ||'', Validators.required],
      email: [data?.teacher?.email ||'', [Validators.required, Validators.email]],
      salary: [data?.teacher?.salary ||'', Validators.required],
      gender: [data?.teacher?.gender ||'', Validators.required],
      password: [data?.teacher?.password ||''],
    });

    if(this.isEditing){
      this.teacherForm.get('password')?.disable();
    }
  }


  onSubmit(){
    const teacherdata = this.teacherForm.getRawValue();
    if(this.isEditing){
      this.teacherService.update({...teacherdata,id: this.data?.teacher?.id}).then(() => {
        this.dialogRef?.close(true);
      });
    }else {
      this.teacherService.create(teacherdata).then(() =>{
        this.dialogRef?.close(true);
      })
    }
  }

  goBack() {
    this.dialogRef?.close(true);
  }
}
