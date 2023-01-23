import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  formReg!: FormGroup;

  constructor(private userService: UserService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  registerUser() {
    this.userService
      .registerUser(this.formReg.value)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  }
}
