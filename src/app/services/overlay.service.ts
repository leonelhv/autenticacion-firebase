import {
  ConnectionPositionPair,
  Overlay,
  OverlayConfig,
  PositionStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, ViewContainerRef } from '@angular/core';
import { filter, fromEvent, Subject, Subscription, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  // @ViewChild('overlayTemplate') overlayTemplate: any;
  constructor(private overlay: Overlay) {}

  /* openFromTemplate() {
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
  } */

  overlayRef: any;
  sub!: Subscription;
  private afterClosed = new Subject<any>();
  onClosed = this.afterClosed.asObservable();

  open(
    origin: any,
    component: any,
    viewContainerRef: ViewContainerRef,
    data: any
  ) {
    this.close(null);
    this.overlayRef = this.overlay.create(
      this.getOverlayConfig({ origin: origin })
    );

    const ref = this.overlayRef.attach(
      new ComponentPortal(component, viewContainerRef)
    );
    for (let key in data) ref.instance[key] = data[key];

    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter((event) => {
          const clickTarget = event.target as HTMLElement;
          return (
            clickTarget != origin &&
            !!this.overlayRef &&
            !this.overlayRef.overlayElement.contains(clickTarget)
          );
        }),
        take(1)
      )
      .subscribe(() => {
        this.close(null);
      });
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
  private getOverlayPosition(origin: any): PositionStrategy {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withPush(false);

    return positionStrategy;
  }
  private getOverlayConfig({ origin }: any): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: false,
      backdropClass: 'popover-backdrop',
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.close(),
    });
  }
  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
      },
    ];
  }
}
