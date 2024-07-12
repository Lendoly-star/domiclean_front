import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaimentComponent } from './pages/paiment/paiment.component';
import {HomeComponent} from "./pages/home/home.component";
import {AuthComponent} from "./pages/auth/auth.component";

export const routes: Routes = [
   {
     path: "",
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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
