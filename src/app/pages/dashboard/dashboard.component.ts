import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../shared/header/header.component";
import {SidebarDashboardComponent} from "../../shared/sidebar-dashboard/sidebar-dashboard.component";
import {FooterComponent} from "../../shared/footer/footer.component";
import {IonicModule} from "@ionic/angular";
import {AuthService} from "../auth/auth.service";
import {RdvService} from "../rdv/rdv.service";
import {RouterOutlet} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarDashboardComponent,
    FooterComponent,
    IonicModule,
    RouterOutlet,
    DatePipe,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
  ],
  providers: [HttpClient],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  appointments: any[] = [];
  userRole!: string;

  constructor(private authService: AuthService, private rdvService: RdvService) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(user => {
      this.userRole = user.role;
      this.loadAppointments(user.id, user.role);
    });
  }

  loadAppointments(userId: number, userRole: string): void {
    if (userRole === 'pro') {
      this.rdvService.getAppointmentsByProId(userId).subscribe(data => {
        this.appointments = data;
      });
    } else {
      this.rdvService.getAppointmentsByClientId(userId).subscribe(data => {
        this.appointments = data;
      });
    }
  }

}
