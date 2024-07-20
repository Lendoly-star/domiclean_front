import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { RdvService } from "./rdv.service";
import { IonicModule } from "@ionic/angular";
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, NgForOf, NgIf } from "@angular/common";
import { HeaderComponent } from "../../shared/header/header.component";
import { Router } from "@angular/router";
import { SelectionService } from "../../service-selection/selection.service";

@Component({
  selector: 'app-rdv',
  standalone: true,
  imports: [IonicModule, NgForOf, ReactiveFormsModule, DatePipe, HeaderComponent, NgIf],
  templateUrl: './rdv.component.html',
  styleUrls: ['./rdv.component.scss']
})
export class RdvComponent implements OnInit {
  rdvForm!: FormGroup;
  services: any[] = [];
  availablePros: any[] = [];
  availabilities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private rdvService: RdvService,
    private selectionService: SelectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rdvForm = this.fb.group({
      id_client: [''],
      id_pro: [''],
      service_id: [''],
      date: [''],
      time: ['', Validators.required],
      address: ['', Validators.required],
      description: ['']
    });

    this.loadInitialData();
  }

  loadInitialData(): void {
    const serviceId = this.selectionService.getSelectedService();
    const proId = this.selectionService.getSelectedPro();
    const clientId = this.selectionService.getClientId();
    const date = this.selectionService.getSelectedDate();

    if (serviceId && proId && clientId && date) {
      this.rdvForm.patchValue({
        service_id: serviceId,
        id_pro: proId,
        id_client: clientId,
        date: date
      });

      this.loadAvailabilities(proId); // Charger les disponibilités du pro
    }
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
      const appointment = {
        id_client: this.getLoggedInClientId(),
        id_pro: this.selectionService.getSelectedPro(),
        service_id: this.selectionService.getSelectedService(),
        date: this.selectionService.getSelectedDate(),
        time: this.rdvForm.controls['time'].value,
        address: this.rdvForm.controls['address'].value,
      };

      console.log('Données envoyées:', appointment); // Ajout du console.log() ici

      this.rdvService.bookRdv(appointment).subscribe(response => {
        console.log('Rendez-vous pris avec succès');
        this.router.navigate(['/dashboard']);
        this.rdvForm.reset();
      }, error => {
        console.error('Erreur lors de la prise de rendez-vous :', error);
      });
    } else {
      console.error('Formulaire invalide');
    }
  }

  validateTime(control: AbstractControl): { [key: string]: any } | null {
    const selectedTime = control.value;
    const selectedDate = this.rdvForm.get('date')?.value;
    if (!selectedTime || !selectedDate) {
      return null;
    }

    const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const isValid = this.availabilities.some(a => {
      const startTime = new Date(`${selectedDate}T${a.start_time}`);
      const endTime = new Date(`${selectedDate}T${a.end_time}`);
      return selectedDateTime >= startTime && selectedDateTime <= endTime;
    });
    return isValid ? null : { invalidTime: true };
  }

  getLoggedInClientId(): string {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token is missing');
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1])); // Assurez-vous que votre token est bien au format JWT
    return decodedToken.id;
  }
}
