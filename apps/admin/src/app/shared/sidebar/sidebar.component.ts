import { AuthService } from '@sokar/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  display = false;
  constructor(private authService: AuthService) { }

  logoutUser() {
    this.authService.logout();
  }


  ngOnInit() {}

}
