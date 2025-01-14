import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/admin/home/home.component';
import { ResetComponent } from './components/auth/reset/reset.component';
import { VarifyMailComponent } from './components/auth/varify-mail/varify-mail.component';
import { TeacherdataComponent } from './components/admin/teacherdata/teacherdata.component';
import { StudentdataComponent } from './components/admin/studentdata/studentdata.component';

export const routes: Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component :LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path :'reset-password', component : ResetComponent},
    {path:'verify-mail', component : VarifyMailComponent},
    {path:'home' , component: HomeComponent},
    {path :'teacher-data', component:TeacherdataComponent},
    {path:'student-data' , component:StudentdataComponent}
    
];
