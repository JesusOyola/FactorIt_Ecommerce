import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterPathNames } from 'src/app/enum/router-path-names';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,private toastr: ToastrService,  private router: Router,) {}

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
    };
    const userTransformData = JSON.stringify(userData);
    if (!this.loginForm.invalid) {
      localStorage.setItem(`${this.loginForm.get('email')?.value}`, userTransformData);
      this.toastr.success(
        `User ${this.loginForm.controls['email'].value} created`,
        'User created'
      );
      this.router.navigate([`/${RouterPathNames.productsList}`]);
    }else{
      this.toastr.warning(
        `Verify that your email and password are correct.`,
        'Invalid Credentials'
      );
    }
  }
}
