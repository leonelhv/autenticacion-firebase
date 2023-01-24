import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { regexEmail } from '../utils/regex';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  formLogin!: FormGroup;
  failLogin = false;
  timeoutId: any;

  constructor(private router: Router, private userService: UserService) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(regexEmail),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  campoNoValido(campo: string) {
    return (
      this.formLogin.get(campo)?.invalid && this.formLogin.get(campo)?.touched
    );
  }

  loginUser() {
    this.userService
      .login(this.formLogin.value)
      .then((res) => {
        this.router.navigate(['home']);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        this.failLogin = true;
        this.timeoutId = setTimeout(() => {
          this.failLogin = false;
        }, 3000);
      });
  }
  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
