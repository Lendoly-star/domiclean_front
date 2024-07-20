import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../pages/auth/auth.service";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-sidebar-dashboard',
  standalone: true,
  imports: [IonicModule, NgIf, RouterLink],
  templateUrl: './sidebar-dashboard.component.html',
  styleUrl: './sidebar-dashboard.component.scss'
})
export class SidebarDashboardComponent implements OnInit {
  userData: any;
  userRole!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe(user => {
      this.userData = user;
      this.userRole = user.role;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
