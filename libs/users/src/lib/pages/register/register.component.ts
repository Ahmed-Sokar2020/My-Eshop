import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { AuthService, LocalstorageService, User } from '../';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerFormGroup: FormGroup;
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
    this.registerFormGroup = this.fb.group({
      userName: ['', [Validators.required]] ,
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  get registerForm() {
    return this.registerFormGroup.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if(this.registerFormGroup.invalid) return;

    this.authService.register(
      this.registerForm.email.value, this.registerForm.password.value).pipe(takeUntil(this.endSubs)).subscribe(
      () => {
        this.isAuthError = false;
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
      this.isAuthError = true;
      if(error.error !== 400)
      this.authMessage = "Server is not Connected, Pleaze try again later "
      })
  }

}
