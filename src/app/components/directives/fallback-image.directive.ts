import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFallbackImage]',
})
export class FallbackImageDirective {
  @Input() appFallbackImage!: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.addEventListener('error', () => {
      this.el.nativeElement.src = this.appFallbackImage;
    });
  }
}
