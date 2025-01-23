import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SharedService } from '../../../service/shared.service';
import { CommonModule } from '@angular/common';
import { MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [
        MatIcon,
        CommonModule,
        MatNavList,
        MatSidenav,
        MatSidenavContainer,
        MatToolbar
    ],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    public sharedService = inject(SharedService)
}
