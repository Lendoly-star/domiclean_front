import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../shared/footer/footer.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HeaderComponent} from "../../shared/header/header.component";
import {IonicModule} from "@ionic/angular";
import {AuthService} from "../auth/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        FooterComponent,
        FormsModule,
        HeaderComponent,
        IonicModule,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}
