import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RdvService } from '../rdv/rdv.service';
import { IonicModule } from '@ionic/angular';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-add-availability',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, NgForOf],
  templateUrl: './add-availability.component.html',
  styleUrls: ['./add-availability.component.scss']
})
export class AddAvailabilityComponent implements OnInit {
  availabilityForm!: FormGroup;
  services: any[] = [];

  constructor(private fb: FormBuilder, private rdvService: RdvService) {}

  ngOnInit(): void {
    this.availabilityForm = this.fb.group({
      serviceId: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.loadServices();
  }

  loadServices(): void {
    this.rdvService.getProServices().subscribe(data => {
      this.services = data;
    });
  }

  onAddAvailability(): void {
    if (this.availabilityForm.valid) {
      const availability = {
        serviceId: this.availabilityForm.controls['serviceId'].value,
        date: this.availabilityForm.controls['date'].value,
        startTime: this.availabilityForm.controls['startTime'].value,
        endTime: this.availabilityForm.controls['endTime'].value
      };

      this.rdvService.addAvailability({ availabilities: [availability] }).subscribe(response => {
        console.log('Disponibilité ajoutée avec succès');
        this.availabilityForm.reset();
      }, error => {
        console.error('Erreur lors de l\'ajout des disponibilités :', error);
      });
    } else {
      console.error('Formulaire invalide');
    }
  }
}
