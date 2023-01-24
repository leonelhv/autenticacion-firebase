import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.css'],
})
export class OverlayComponent {
  @ViewChild('overlayTemplate') overlayTemplate: any;
  constructor(private overlay: Overlay) {}

  openFromTemplate() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      panelClass: 'overlay-panel',
      positionStrategy,
    });

    overlayConfig.hasBackdrop = true;

    const overlayRef = this.overlay.create(overlayConfig);

    overlayRef.attach(this.overlayTemplate);
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
  }
}
