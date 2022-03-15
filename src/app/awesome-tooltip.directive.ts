import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, HostListener, Input, OnInit } from '@angular/core';
import { AwesomeTooltipComponent } from './awesome-tooltip.directive.spec';


@Directive({ selector: '[awesomeTooltip]' })
export class AwesomeTooltipDirective implements OnInit {

  private overlayRef: OverlayRef | undefined;
  text: any;

  constructor(private overlay: Overlay) { }

  ngOnInit(): void {
    this.overlayRef = this.overlay.create({});
  }

  @HostListener('mouseenter')
  show() {
    // Create tooltip portal
    const tooltipPortal = new ComponentPortal(AwesomeTooltipComponent);

    // Attach tooltip portal to overlay
    const tooltipRef: ComponentRef<AwesomeTooltipComponent> = this.overlayRef!.attach(tooltipPortal);

    // Pass content to tooltip component instance
    tooltipRef.instance.text = this.text;
  }

  @HostListener('mouseout')
  hide() {
    this.overlayRef!.detach();
  }
}
