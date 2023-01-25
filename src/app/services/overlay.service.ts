import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay) {}
  private modals: { [id: string]: any } = {};

  open(component: any, id: string) {
    this.modals[id] = {
      overlayRef: this.overlay.create(this.getOverlayConfig()),
    };
    this.modals[id].overlayRef.attach(new ComponentPortal(component));
  }

  close(id: string) {
    if (this.modals[id]) {
      this.modals[id].overlayRef.dispose();
      this.modals[id].overlayRef.detach();
      delete this.modals[id];
    }
  }
  private getOverlayPosition(): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return positionStrategy;
  }
  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
  }
}
