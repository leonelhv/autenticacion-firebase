import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TablaComponent } from './tabla/tabla.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FallbackImageDirective } from './directives/fallback-image.directive';
@NgModule({
  declarations: [HeaderComponent, TablaComponent, AddProductComponent, FallbackImageDirective],
  imports: [CommonModule, OverlayModule, PortalModule, ReactiveFormsModule],
  exports: [HeaderComponent, TablaComponent, AddProductComponent],
})
export class ComponentsModule {}
