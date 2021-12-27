import { Component } from '@angular/core';
import { AuthService } from '@sokar/users';

@Component({
  selector: 'ecommerce-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private authService: AuthService) { }

  logoutUser() {
    this.authService.logout();
  }

}
