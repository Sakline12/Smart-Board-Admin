import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './authguard.guard';
import { InteractiveComponent } from './interactive/interactive.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[], data: { title: 'Dashboard'}},
  { path: 'interactive', component: InteractiveComponent, data: { title: 'Interactive Panel'}},
  { path: 'about', component: AboutComponent, data: { title: 'About Us'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
