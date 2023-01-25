import { Component } from '@angular/core';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { OverlayService } from 'src/app/services/overlay.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private overlayService: OverlayService) {}

  open() {
    this.overlayService.open(AddProductComponent, 'addProduct');
  }
}
