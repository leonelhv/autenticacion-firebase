import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { userInfo } from 'src/app/interfaces/interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user!: userInfo;
  infoUser$!: Observable<userInfo>;
  default_image = 'https://img.freepik.com/free-icon/user_318-790139.jpg?w=100';

  constructor(private userService: UserService) {
    this.user = this.userService.datosUsuario();
  }

  logout() {
    this.userService.logout();
  }
}
