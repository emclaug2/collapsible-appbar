import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'expandable-header',
  template: '<ng-content></ng-content>',
})
export class ExpandableHeader implements OnInit {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  @Input('mainTitle') mainTitle: ElementRef;
  @Input('hiddenTitle') hiddenTitle: ElementRef;
  @Input('backgroundImage') backgroundImage: ElementRef;

  private HEADER_MAX_HEIGHT: number = 200;
  private HEADER_MIN_HEIGHT: number = 56;

  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController) {

  }

  ngOnInit() {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    this.scrollArea.ionScroll.subscribe((ev: any) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev: any) {
    if (ev) {
      this.domCtrl.write(() => {
        this.newHeaderHeight = Math.min(this.HEADER_MAX_HEIGHT, Math.max(this.HEADER_MIN_HEIGHT, this.headerHeight - ev.detail.scrollTop));
        this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
        //mainTitle Font
        const fontSize = 20 + this.scaleFactor() * 10;
        this.renderer.setStyle(this.mainTitle, 'font-size', fontSize + 'px');

        //hiddenTitle Font
        const hiddenTitlefontSize = 0 + this.scaleFactor() * 20;
        const hiddenTitleopacity = 0 + this.scaleFactor() * 1;
        this.renderer.setStyle(this.hiddenTitle, 'font-size', hiddenTitlefontSize + 'px');
        this.renderer.setStyle(this.hiddenTitle, 'opacity', hiddenTitleopacity.toString());

        //backgroundImage Font
        const opacity = 0 + this.scaleFactor() * 0.3;
        this.renderer.setStyle(this.backgroundImage, 'opacity', opacity.toString());
      });
    }
  }

  scaleFactor() {
    return ((this.newHeaderHeight - this.HEADER_MIN_HEIGHT) / (this.HEADER_MAX_HEIGHT - this.HEADER_MIN_HEIGHT));
  }
}
