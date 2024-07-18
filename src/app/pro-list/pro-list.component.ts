import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RdvService } from "../pages/rdv/rdv.service";
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import {HeaderComponent} from "../shared/header/header.component";

@Component({
  selector: 'app-pro-list',
  templateUrl: './pro-list.component.html',
  standalone: true,
  imports: [
    IonicModule,
    NgForOf,
    HeaderComponent
  ],
  styleUrls: ['./pro-list.component.scss']
})
export class ProListComponent implements OnInit {
  serviceId!: number;
  pros: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rdvService: RdvService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceId = +params['serviceId'];
      this.loadPros();
    });
  }

  loadPros(): void {
    this.rdvService.getProsByService(this.serviceId).subscribe(data => {
      this.pros = data;
    });
  }

  onSelectPro(proId: number): void {
    this.router.navigate(['/book-rdv'], { queryParams: { proId } });
  }
}
