import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RdvService } from '../rdv/rdv.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NgForOf } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    IonicModule,
    FooterComponent,
    NgForOf
  ],
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = [];

  constructor(private fb: FormBuilder, private rdvService: RdvService, private router: Router) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      proId: [''],
      service_id: ['']
    });

    this.loadServices();
  }

  loadServices(): void {
    this.rdvService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceId = this.serviceForm.controls['service_id'].value;
      const proId = this.serviceForm.controls['proId'].value;

      const serviceData = { proId, services: [serviceId] };

      this.rdvService.addService(serviceData).subscribe(response => {
        this.router.navigate(['/dashboard']);
        console.log('Services ajoutés avec succès');
        this.serviceForm.reset();
      }, error => {
        console.error('Erreur lors de l\'ajout des services :', error);
      });
    } else {
      console.error('Formulaire invalide');
    }
  }
}
