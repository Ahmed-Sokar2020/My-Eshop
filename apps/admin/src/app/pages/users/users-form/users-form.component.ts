/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@sokar/users';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

// declare const require: any;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isSubmitted = false;
  editMode = false;
  curruntUserId?: string;
  users: User[] = [];
  countries: any = [];
  endSubs: Subject<any> = new Subject;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    ) {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: [''],
    });
   }


  ngOnInit(): void {
    this.checkEditMode();
    this._getCountries();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  get userForm() {
    return this.form.controls;
  }


  // To get Countries in Dropdown List in Users-form Page
  private _getCountries() {
    this.countries = this.usersService.getCountries();
  }


  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const user: User = {
      id: this.curruntUserId,
      userName: this.userForm.userName.value,
      email: this.userForm.email.value,
      password: this.userForm.password.value,
      phone: this.userForm.phone.value,
      isAdmin: this.userForm.isAdmin.value,
      street: this.userForm.street.value,
      apartment: this.userForm.apartment.value,
      zip: this.userForm.zip.value,
      city: this.userForm.city.value,
      country: this.userForm.country.value,
    }


    if(this.editMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }


  cancel() {
    this.location.back();
  }


  // To Check if We Are in Edit Mode for Updating
 private checkEditMode() {
  this.route.params
  .pipe(takeUntil(this.endSubs))
  .subscribe(params => {
    if(params.id) {
      this.editMode = true;
      this.curruntUserId = params.id;
      this.usersService.getUser(params.id).subscribe(user => {
        this.userForm.userName.setValue(user.userName);
        this.userForm.email.setValue(user.email);
        this.userForm.password.setValue(user.password);
        this.userForm.phone.setValue(user.phone);
        this.userForm.isAdmin.setValue(user.isAdmin);
        this.userForm.street.setValue(user.street);
        this.userForm.apartment.setValue(user.apartment);
        this.userForm.zip.setValue(user.zip);
        this.userForm.city.setValue(user.city);
        this.userForm.country.setValue(user.country);

        // To Not Force User To Change his Password
        this.userForm.password.setValidators([]);
        this.userForm.password.updateValueAndValidity();

      })
    }
  })
}


  // To Create(Add) User
  private _addUser(user: User) {
    // To make subscribe on Post Method
    this.usersService.createUser(user)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      () => {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`User is Added Successfuly`});
      timer(2000).toPromise().then(() => {
        this.location.back(); // To goback to the Products List Page
      })
      },
      () => {
        this.messageService.add({
          severity:'error',
          summary:'Erorr',
          detail:'User is not Added'});
      });

  }


  // To Update(Edit) User
  private _updateUser(user: User) {
    // To make subscribe on PUT Method
    this.usersService.updateUser(user)
    .pipe(takeUntil(this.endSubs))
    .subscribe(
      () => {
      this.messageService.add({severity:'success', summary:'Success', detail:`User is Updated Successfuly`});
      timer(2000).toPromise().then(() => {
        this.location.back(); // To goback to the Users List Page
      })
      },
      () => {
        this.messageService.add({severity:'error', summary:'Erorr', detail:'User is not Updated'});
      });
  }



}
