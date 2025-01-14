import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-varify-mail',
  standalone: true,
  imports: [
    MatDialogModule,
    RouterModule,

  ],
  templateUrl: './varify-mail.component.html',
  styleUrl: './varify-mail.component.scss'
})
export class VarifyMailComponent {

}
