import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { TablaComponent } from './tabla/tabla.component';
import { OverlayComponent } from './overlay/overlay.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TablaComponent,
    OverlayComponent,
    AddProductComponent,
  ],
  imports: [CommonModule, OverlayModule, PortalModule],
  exports: [
    HeaderComponent,
    TablaComponent,
    OverlayComponent,
    AddProductComponent,
  ],
})
export class ComponentsModule {}
