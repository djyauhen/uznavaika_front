import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../../core/auth.service";
import {LoginResponseType} from "../../../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../../../types/default-response.type";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private readonly authService: AuthService,
              private readonly router: Router) {
  }

  submitForm() {
    if (this.form.valid && this.form.value.login && this.form.value.password) {
      this.authService.login(this.form.value.login, this.form.value.password)
        .subscribe({
          next: data => {
            if ((data as DefaultResponseType).message !== undefined) {
              this.form.setValue({login: '', password: ''});
              return;
            }

            this.authService.setTokens((data as LoginResponseType).accessToken);
            this.router.navigate(['/admin']);
          },
          error: err => {
            this.form.setValue({login: '', password: ''});
            alert('Ошибка авторизации');
          }
        })
    }
  }
}
