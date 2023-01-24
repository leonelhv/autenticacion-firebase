import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TablaComponent } from './tabla/tabla.component';

@NgModule({
  declarations: [HeaderComponent, TablaComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, TablaComponent],
})
export class ComponentsModule {}
