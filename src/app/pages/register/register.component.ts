import { Component } from '@angular/core';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formReg!: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.formReg = new FormGroup({
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

  registerUser() {
    this.userService
      .registerUser(this.formReg.value)
      .then((res) => {
        this.router.navigate(['home']);
        console.log(res);
      })
      .catch((error) => console.log(error));
  }

  get form(): { [key: string]: AbstractControl } {
    return this.formReg.controls;
  }

  campoNoValido(campo: string) {
    return this.formReg.get(campo)?.invalid && this.formReg.get(campo)?.touched;
  }
}
