// @ts-ignore

import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { RdvService } from "./rdv.service";
import { IonicModule } from "@ionic/angular";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {HeaderComponent} from "../../shared/header/header.component";

@Component({
  selector: 'app-rdv',
  standalone: true,
  imports: [IonicModule, NgForOf, ReactiveFormsModule, DatePipe, HeaderComponent, NgIf],
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss']
})
export class RdvComponent implements OnInit {
  rdvForm!: FormGroup;
  typesOfService = ['Bricolage', 'Jardinage', 'Ménage'];
  services: any[] = [];
  availablePros: any[] = [];
  availabilities: any[] = [];

  constructor(private fb: FormBuilder, private rdvService: RdvService) {
  }

  ngOnInit(): void {
    this.rdvForm = this.fb.group({
      id_client: ['', Validators.required],
      id_pro: ['', Validators.required],
      service_id: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      address: ['', Validators.required],
      description: ['']
    });
  }

  loadServices(): void {
    this.rdvService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  loadAvailabilities(pro_id: number): void {
    this.rdvService.getAvailabilities(pro_id).subscribe(data => {
      this.availabilities = data;
    });
  }

  fetchAvailablePros(service_id: number, date: string, time: string) {
    this.rdvService.getAvailablePros(service_id, date, time).subscribe(pros => {
      this.availablePros = pros;
    });
  }

  onBookAppointment(): void {
    if (this.rdvForm.valid) {
      this.rdvService.bookRdv(this.rdvForm.value).subscribe(response => {
        console.log('Rendez-vous pris avec succès');
        this.rdvForm.reset();
      });
    }
  }

  setupServiceIdValueChanges(): void {
    this.rdvForm.get('service_id')?.valueChanges.subscribe(service_id => {
      const date = this.rdvForm.get('date')?.value;
      const time = this.rdvForm.get('time')?.value;
      if (service_id && date && time) {
        this.fetchAvailablePros(service_id, date, time);
      }
    });
  }

  setupDateValueChanges(): void {
    this.rdvForm.get('date')?.valueChanges.subscribe(date => {
      const service_id = this.rdvForm.get('service_id')?.value;
      const time = this.rdvForm.get('time')?.value;
      if (service_id && date && time) {
        this.fetchAvailablePros(service_id, date, time);
      }
    });
  }

  setupTimeValueChanges(): void {
    this.rdvForm.get('time')?.valueChanges.subscribe(time => {
      const service_id = this.rdvForm.get('service_id')?.value;
      const date = this.rdvForm.get('date')?.value;
      if (service_id && date && time) {
        this.fetchAvailablePros(service_id, date, time);
      }
    });
  }

}
