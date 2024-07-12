import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {PaimentComponent} from "./pages/paiment/paiment.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {RdvComponent} from "./pages/rdv/rdv.component";
import {UserComponent} from "./pages/user/user.component";
import {ProComponent} from "./pages/pro/pro.component";
import {DevisComponent} from "./pages/devis/devis.component";
import {RoleGuard} from "./pages/auth/role.guard";
import {AuthGuard} from "./pages/auth/auth.guard";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "paiement",
    component: PaimentComponent
  },
  {
    path: "auth",
    component: AuthComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "rdv",
    component: RdvComponent,
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { role: 'admin' }
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { role: 'client' }
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [RoleGuard],
    data: { role: 'pro' }
  },
  {
    path: "pro",
    component: ProComponent,
  },
  {
    path: "devis",
    component: DevisComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'logout',
    redirectTo: '/',
    pathMatch: 'full'
  },



  // { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  // { path: 'subscriptions', component: SubscriptionsComponent, canActivate: [RoleGuard], data: { role: 'client' } },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: 'logout', redirectTo: '/', pathMatch: 'full' }

];
