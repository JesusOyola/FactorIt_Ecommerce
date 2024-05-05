import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from 'src/app/enum/router-path-names';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    const userData: any = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
      cartType: 'common',
      vipNextPurchase: false,
    };
    const userTransformData = JSON.stringify(userData);
    const userAlreadyCreate = localStorage.getItem(
      this.loginForm.get('email')?.value
    );

    if (!this.loginForm.invalid && userAlreadyCreate === null) {
      localStorage.setItem(
        `${this.loginForm.get('email')?.value}`,
        userTransformData
      );
      this.loginService.setUser(this.loginForm.get('email')?.value);
      this.toastr.success(
        `User ${this.loginForm.controls['email'].value} created`,
        'User created'
      );
      this.router.navigate([`/${RouterPathNames.productsList}`]);
    } else if (!this.loginForm.invalid && userAlreadyCreate !== null) {
      this.loginService.setUser(this.loginForm.get('email')?.value);
      this.toastr.success(
        `User ${this.loginForm.controls['email'].value} Logged`,
        'User Logged'
      );
      this.router.navigate([`/${RouterPathNames.productsList}`]);
    } else {
      this.toastr.warning(
        `Verify that your email and password are correct.`,
        'Invalid Credentials'
      );
    }
  }
}
