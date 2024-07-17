import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RdvService } from '../rdv/rdv.service';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-add-availability',
  templateUrl: './add-availability.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonicModule
  ],
  styleUrls: ['./add-availability.component.scss']
})
export class AddAvailabilityComponent implements OnInit {
  availabilityForm!: FormGroup;

  constructor(private fb: FormBuilder, private rdvService: RdvService) {}

  ngOnInit(): void {
    this.availabilityForm = this.fb.group({
      proId: ['', Validators.required],
      serviceId: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  onAddAvailability(): void {
    if (this.availabilityForm.valid) {
      this.rdvService.addAvailability(this.availabilityForm.value).subscribe(response => {
        console.log('Disponibilité ajoutée avec succès');
        this.availabilityForm.reset();
      });
    }
  }
}
