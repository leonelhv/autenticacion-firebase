import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(private router: Router, private userService: UserService) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  loginUser() {
    this.userService
      .login(this.formLogin.value)
      .then((res) => {
        this.router.navigate(['home']);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }
}
