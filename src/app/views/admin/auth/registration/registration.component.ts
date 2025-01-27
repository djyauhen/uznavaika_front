import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {
  }
}
