import { Component, ViewContainerRef } from '@angular/core';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private overlayService: OverlayService,
    private viewContainerRef: ViewContainerRef
  ) {}

  open(origin: any, index: number) {
    this.overlayService
      .open(origin, AddProductComponent, this.viewContainerRef, {
        name: "I'm the button " + index,
        obj: {},
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
