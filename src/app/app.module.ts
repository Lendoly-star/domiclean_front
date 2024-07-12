import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.modules";
import {NgxStripeModule, provideNgxStripe} from "ngx-stripe";
import { StripeService } from "@nomadreservations/ngx-stripe";
import { FormsModule } from "@angular/forms";
//import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [],

    imports: [
        BrowserModule,
        AppRoutingModule,
        PagesModule,
        IonicModule.forRoot(),
        FormsModule,
        //CommonModule,
        NgxStripeModule.forRoot(),


    ],
    providers: [    //provideNgxStripe()

    ],
    bootstrap: [AppComponent]

})

export class AppModule{

}
