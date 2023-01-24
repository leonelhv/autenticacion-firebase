import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subject, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor(private overlay: Overlay) {}

  overlayRef: any;
  sub!: Subscription;
  private afterClosed = new Subject<any>();
  onClosed = this.afterClosed.asObservable();

  open(component: any) {
    this.close(null);
    this.overlayRef = this.overlay.create(this.getOverlayConfig());

    this.overlayRef.attach(new ComponentPortal(component));

    // this.overlayRef.backdropClick().subscribe(() => this.overlayRef.detach());
    return this.onClosed.pipe(take(1));
  }

  close = (data: any) => {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.afterClosed.next(data);
    }
  };
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
