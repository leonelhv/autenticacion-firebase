import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, HomeComponent],
  imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
  exports: [LoginComponent, RegisterComponent, HomeComponent],
})
export class PagesModule {}
