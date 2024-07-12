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
  // isSidebarOpen = false;
  // isModalOpen = false;
  // userRole: 'client' | 'pro' | 'admin' | null = null;
  // userName: string | null = null;
  //
  // constructor(private router: Router, private authService: AuthService) {}
  //
  // ngOnInit() {
  //   this.authService.user$.subscribe(user => {
  //     this.userRole = user ? user.role : null;
  //     this.userName = user ? user.name : null;
  //   });
  // }
  //
  // navigateTo(route: string) {
  //   this.router.navigate([route]);
  // }
  //
  // logout() {
  //   this.authService.logout();
  // }
  //
  // handleLogout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/login']);
  // }
  //
  // openModal(): void {
  //   this.isModalOpen = true;
  // }
  //
  // toggleModal(): void {
  //   this.isModalOpen = !this.isModalOpen;
  // }

  isSidebarOpen = true;  // Assuming you want the sidebar to be open by default
  userData: any = {}; // Replace with your user model
  userRole: 'client' | 'pro' | 'admin' | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userRole = user.role;
        this.userData = user;
      }
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
