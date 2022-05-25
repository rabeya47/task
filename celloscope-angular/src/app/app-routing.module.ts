import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetpassComponent } from './components/forgetpass/forgetpass.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ResetpassComponent } from './components/resetpass/resetpass.component';

const routes: Routes = [


  { path: "login", component: LoginComponent }, { path: "registration", component: RegistrationComponent },
  { path: "forgetPassword", component: ForgetpassComponent }, { path: "resetPass", component: ResetpassComponent },

  {
    path: "", component: HomeComponent, canActivateChild: [AuthGuard], children: [
      { path: "", component: DashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
