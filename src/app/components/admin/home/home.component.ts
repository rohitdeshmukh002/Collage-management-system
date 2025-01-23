import { Component, inject, Inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StudentdataComponent } from '../studentdata/studentdata.component';
import { TeacherdataComponent } from '../teacherdata/teacherdata.component';
import { SharedService } from '../../../service/shared.service';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';
import { AuthService } from '../../../service/auth.service';
import { MatToolbar } from '@angular/material/toolbar';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        DashboardComponent,
        StudentdataComponent,
        TeacherdataComponent,
        CommonModule,
        MatSidenavContent,
        MatIcon,
        MatNavList,
        MatSidenav,
        MatSidenavContainer,
        MatToolbar,
        SidebarComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    public sharedService = inject(SharedService)

    isSidebarCollapsed = false;

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    constructor(
        private authService: AuthService,
    ) { }

    logOut() {
        this.authService.logout();
    }

}