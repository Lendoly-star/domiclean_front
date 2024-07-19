import { Component, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../pages/auth/auth.service';
import { IonicModule } from "@ionic/angular";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IonicModule, NgIf, RouterLink, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logo: string = 'assets/img/domiclean_logo.png';
  isAuthenticated: boolean = false;
  userName: string | null = null;
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        this.userName = user.name;
        this.userRole = user.role;
      } else {
        this.userName = null;
        this.userRole = null;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToAddService() {
    this.router.navigate(['/add-service']);
  }

  navigateToServiceSelection() {
    this.router.navigate(['/service-selection']);
  }
}
