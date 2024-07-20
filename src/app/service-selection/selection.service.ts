import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private selectedServiceId: number | null = null;
  private selectedProId: number | null = null;
  private selectedDate: string | null = null;
  private clientId: number | null = null;

  setSelectedService(serviceId: number) {
    this.selectedServiceId = serviceId;
  }

  getSelectedService(): number | null {
    return this.selectedServiceId;
  }

  setSelectedPro(proId: number) {
    this.selectedProId = proId;
  }

  getSelectedPro(): number | null {
    return this.selectedProId;
  }

  setSelectedDate(date: string) {
    this.selectedDate = date;
  }

  getSelectedDate(): string | null {
    return this.selectedDate;
  }

  setClientId(clientId: number) {
    this.clientId = clientId;
  }

  getClientId(): number | null {
    return this.clientId;
  }
}
