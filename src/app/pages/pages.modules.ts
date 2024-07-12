import { NgModule } from "@angular/core";
import { PaimentComponent } from "./paiment/paiment.component";
import { BrowserModule } from "@angular/platform-browser";
import {HomeComponent} from "./home/home.component";
import {AuthComponent} from "./auth/auth.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RdvComponent} from "./rdv/rdv.component";
import {ProComponent} from "./pro/pro.component";
import {UserComponent} from "./user/user.component";
import {DevisComponent} from "./devis/devis.component";

@NgModule({
    declarations: [],
    imports: [
        HomeComponent,
        BrowserModule,
        DashboardComponent,
        AuthComponent,
        PaimentComponent,
        RdvComponent,
        ProComponent,
        UserComponent,
        DevisComponent,
    ],
    providers: [],
})

export class PagesModule{

}
