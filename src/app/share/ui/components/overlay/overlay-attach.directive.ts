import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appOverlayAttachView]',
  standalone: true,
})
export class OverlayAttachDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
