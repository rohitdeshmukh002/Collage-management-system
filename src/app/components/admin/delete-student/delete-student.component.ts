import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../models/student';
import { StudentService } from '../../../service/student.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-delete-student',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatIcon
  ],
  templateUrl: './delete-student.component.html',
  styleUrl: './delete-student.component.scss'
})
export class DeleteStudentComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { student: Student },
    private studentService: StudentService,
  ) {}

  onConfirm(): void {
    this.studentService.delete(this.data.student).then(
      () => {
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error deleting student:', error);
        this.dialogRef.close(false); 
      }
    );
  }  

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
