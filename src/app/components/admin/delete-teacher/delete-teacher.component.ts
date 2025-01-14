import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Teacher } from '../../../models/teacher';
import { TeacherService } from '../../../service/teacher.service';

@Component({
  selector: 'app-delete-teacher',
  standalone: true,
  imports: [
        MatDialogActions,
        MatDialogContent,
        MatIcon
  ],
  templateUrl: './delete-teacher.component.html',
  styleUrl: './delete-teacher.component.scss'
})
export class DeleteTeacherComponent {

   constructor(
      public dialogRef: MatDialogRef<DeleteTeacherComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { teacher: Teacher },
      private teacherService: TeacherService,
    ) {}
  
    onConfirm(): void {
      this.teacherService.delete(this.data.teacher).then(
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
