import { Router } from '@angular/router';
import {UsersService} from '@sokar/users';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@sokar/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  endSubs: Subject<any> = new Subject;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }


  ngOnInit(): void {
    this._getUsers();
  }


  ngOnDestroy() {
    this.endSubs.next();
    this.endSubs.complete();
  }


  // To subscribe on the list of Users
  private _getUsers() {
    this.usersService.getUsers()
    .pipe(takeUntil(this.endSubs))
    .subscribe(users => {
      this.users = users;
    });
  }


  // To get Country in the Table in Users-list Page
  getCountryName(countryKey: string) {
    return this.usersService.getCountry(countryKey);
  }


  // To subscribe on the deleted Users
  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId)
        .pipe(takeUntil(this.endSubs))
        .subscribe(
          () => {
            // vvv-- To delete User after success case immediatly not later
            this._getUsers();
            this.messageService.add({severity:'success',summary:'Success',
            detail:`User is deleted`}) },
          () => {
            this.messageService.add({severity:'error', summary:'Erorr', detail:'User is not deleted'});
          }
        )

      }
    });

  }


  editUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }


}
