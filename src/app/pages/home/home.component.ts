import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import {HeaderComponent} from "../../shared/header/header.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {IonicModule} from "@ionic/angular";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    IonicModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  logo: string = 'assets/img/domiclean_logo.png';
  img1: string = 'assets/img/domiclean_img7.jpg';
  img2: string = 'assets/img/domiclean_img9.jpg';
  img3: string = 'assets/img/domiclean_img10.jpg';
  img4: string = 'assets/img/domiclean_img4.jpg';
  img5: string = 'assets/img/domiclean_img5.jpg';
  img6: string = 'assets/img/domiclean_img6.jpg';
  img7: string = 'assets/img/domiclean_img1.jpg';
  img8: string = 'assets/img/domiclean_img2.jpg';
  img9: string = 'assets/img/domiclean_img3.jpg';
}
