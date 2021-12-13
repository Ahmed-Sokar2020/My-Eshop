/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators'

@Component({
  selector: 'users-login-list',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  loginFormGroup: FormGroup;
  isSubmitted = false;
  isAuthError = false;
  authMessage = "Email or Password are Wrong"
  endSubs: Subject<any> = new Subject;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    ) {
    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  get loginForm() {
    return this.loginFormGroup.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if(this.loginFormGroup.invalid) return;

    this.authService.Login(
      this.loginForm.email.value, this.loginForm.password.value).pipe(takeUntil(this.endSubs)).subscribe(
      (user) => {
        this.isAuthError = false;
        this.localstorageService.setToken(user.token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
      this.isAuthError = true;
      if(error.error !== 400)
      this.authMessage = "Server is not Connected, Pleaze try again later "
      })
  }

}
