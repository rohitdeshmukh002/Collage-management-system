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
    // private snackBar: MatSnackBar
  ) {}

  onConfirm(): void {
    this.studentService.delete(this.data.student).then(
      () => {
        // alert('Student deleted successfully');
        this.dialogRef.close(true); // Pass true to indicate success
      },
      (error) => {
        console.error('Error deleting student:', error);
        // alert('Could not delete student');
        this.dialogRef.close(false); // Pass false to indicate failure
      }
    );
  }  

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
