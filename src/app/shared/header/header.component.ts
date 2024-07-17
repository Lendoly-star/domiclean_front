import { Component } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import {AuthService} from "../../pages/auth/auth.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  logo : string = 'assets/img/domiclean_logo.png';
  isAuthenticated: boolean = false;
  userName: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.authService.user$.subscribe(user => {
    //   this.isAuthenticated = !!user;
    //   this.userName = user ? user.name : null;
    // });
  }

  logout() {
    // this.authService.logout();
  }
}
