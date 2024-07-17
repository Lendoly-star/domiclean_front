import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaimentComponent } from './pages/paiment/paiment.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },

  {
    path: "paiment",
    component: PaimentComponent
  },

  // {
  //   path: "auth",
  //   component:
  // },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}