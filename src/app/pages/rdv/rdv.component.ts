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
  userRole: 'client' | 'pro' | 'admin' | null = null;
  userId: number | null = null;
  typesOfService = ['Bricolage', 'Jardinage', 'Ménage'];
  rdvForm: FormGroup; // Correction du nom de la variable pour suivre les conventions
  rdvs: any[] = []; // Correction du nom de la variable pour suivre les conventions
  RdvForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private rdvService: RdvService, // Correction du nom de la variable pour suivre les conventions
    private fb: FormBuilder // Ajout de FormBuilder pour construire le formulaire
  ) {
    // Initialiser le formulaire dans le constructeur
    this.rdvForm = this.fb.group({
      date: ['', Validators.required],
      serviceType: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userRole = user.role;
        this.userId = user.id; // Assurez-vous que userId est mis à jour avec l'ID utilisateur actuel
        this.loadRdv();
      }
    });
  }

  loadRdv() {
    if (this.userRole === 'client') {
      this.rdvService.getUserRdv(this.userId!).subscribe(rdv => {
        this.rdvs = rdv;
      });
    } else if (this.userRole === 'pro') {
      this.rdvService.getProRdv(this.userId!).subscribe(rdv => {
        this.rdvs = rdv;
      });
    } else if (this.userRole === 'admin') {
      this.rdvService.getAllRdv().subscribe(rdv => {
        this.rdvs = rdv;
      });
    }
  }

  onSubmit() {
    if (this.rdvForm.valid) {
      // Envoie les données du formulaire au service
      this.rdvService.bookRdv(this.rdvForm.value).subscribe({
        next: (data) => {
          console.log('Rendez-vous enregistré avec succès', data);
          this.rdvForm.reset();
          this.loadRdv(); // Recharger les rendez-vous après l'ajout
        },
        error: (error) => console.error('Erreur lors de la prise de rendez-vous', error)
      });
    }
  }
}
