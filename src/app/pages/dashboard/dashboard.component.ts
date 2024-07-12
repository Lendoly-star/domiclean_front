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
  RdvForm!: FormGroup;
  typesOfService: string[] = ['Bricolage', 'Jardinage', 'Ménage à domicile'];
  appointments: any[] = [];
  userRole: 'client' | 'pro' | 'admin' | null = null;
  rdv: any;

  constructor(private fb: FormBuilder, private RdvService: RdvService) {}

  ngOnInit() {
    this.RdvForm = this.fb.group({
      date: ['', Validators.required],
      serviceType: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.fetchRdv();
  }

  onSubmit() {
    if (this.RdvForm.valid) {
      this.RdvService.bookRdv(this.RdvForm.value).subscribe(() => {
        this.fetchRdv();
        this.RdvForm.reset();
      });
    }
  }

  fetchRdv() {
    this.RdvService.getAllRdv().subscribe(data => {
      this.appointments = data;
    });
  }


}
