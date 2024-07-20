import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RdvService } from "../pages/rdv/rdv.service";
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import {HeaderComponent} from "../shared/header/header.component";
import {SelectionService} from "./selection.service";

@Component({
  selector: 'app-service-selection',
  templateUrl: './service-selection.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonicModule,
    NgForOf,
    HeaderComponent
  ],
  styleUrls: ['./service-selection.component.scss']
})
export class ServiceSelectionComponent implements OnInit {
  serviceForm!: FormGroup;
  services: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rdvService: RdvService,
    private router: Router,
    private selectionService: SelectionService
  ) {}

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      service_id: ['', Validators.required]
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
      this.selectionService.setSelectedService(serviceId);
      console.log(serviceId);
      this.router.navigate(['/pro-list', serviceId]);
    } else {
      console.error('Formulaire invalide');
    }
  }
}
