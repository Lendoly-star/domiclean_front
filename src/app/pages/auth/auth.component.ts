import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import {FooterComponent} from "../../shared/footer/footer.component";
import {HeaderComponent} from "../../shared/header/header.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [IonicModule, FooterComponent, HeaderComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
