import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { VarifyMailComponent } from './components/auth/varify-mail/varify-mail.component';
import { TeacherdataComponent } from './components/admin/teacherdata/teacherdata.component';
import { StudentdataComponent } from './components/admin/studentdata/studentdata.component';
import { AddUpdateComponent } from './components/admin/add-update/add-update.component';
import DialogComponent from './components/admin/dialog/dialog.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component :LoginComponent },
    {path: 'register', component: RegisterComponent},
    {path :'reset-password', component : ResetComponent,  canActivate : [AuthGuard]},
    {path:'verify-mail', component : VarifyMailComponent,  canActivate : [AuthGuard]},
    {path:'home' , component: HomeComponent, canActivate : [AuthGuard]},
    {path :'teacher-data', component:TeacherdataComponent, canActivate : [AuthGuard] },
    {path:'student-data' , component:StudentdataComponent, canActivate : [AuthGuard]},
    // {path:'add-teacher', component:DialogComponent}
    
];
