import { UsersService } from '@sokar/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ecommerce-root',
  templateUrl: './app.component.html',
  })
export class AppComponent implements OnInit {
  title = 'ecommerce';

  constructor(private usersService: UsersService) {

  }


  ngOnInit(): void {
    this.usersService.initAppSession();
  }
}
