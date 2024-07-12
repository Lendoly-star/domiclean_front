import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgxStripeModule } from 'ngx-stripe';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { PaimentService } from './paiment.service';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "../../shared/header/header.component";
import {FooterComponent} from "../../shared/footer/footer.component";

@Component({
  selector: 'app-paiment',
  templateUrl: './paiment.component.html',
  standalone: true,
  styleUrls: ['./paiment.component.scss'],
  imports: [IonicModule, NgxStripeModule, FormsModule,  RouterOutlet, HeaderComponent, FooterComponent]
})
export class PaimentComponent {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: 'Helvetica Neue',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;
  paimentResult: string | null = null;

  constructor(private fb: FormBuilder, private stripeService: StripeService, private http: HttpClient) {
    this.stripeTest = this.fb.group({
      name: ['']
    });
  }

  pay(): void {
    this.createToken();
  }

  createToken(): void {
    const name = this.stripeTest.get('name')?.value;
    this.stripeService
      .createToken(this.card.element, {name})
      .subscribe((result) => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // You can also attach the token to a customer
          this.http.post('/api/ticket/paiement', {
            token: result.token.id,
            amount: 2000,
            currency: 'usd'
          }).subscribe((response: any) => {
            this.paimentResult = 'Paiement successful!';
            console.log(response);
          });
        } else if (result.error) {
          // Error creating the token
          this.paimentResult = `Error: ${result.error.message}`;
          console.log(result.error.message);
        }
      });
  }
}
