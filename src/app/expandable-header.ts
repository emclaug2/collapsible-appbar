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
  @Input('subTitle') subTitle: ElementRef;
  @Input('backgroundImage') backgroundImage: ElementRef;

  private headerMaxHeight: number = 200;
  private headerMinHeight: number = 56;

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
        this.newHeaderHeight = Math.min(this.headerMaxHeight, Math.max(this.headerMinHeight, this.headerHeight - ev.detail.scrollTop));
        this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
        //mainTitle Font
        const fontSize = 20 + ((this.newHeaderHeight - this.headerMinHeight) / (this.headerMaxHeight - this.headerMinHeight)) * 10;
        this.renderer.setStyle(this.mainTitle, 'font-size', fontSize + 'px');
        //SubTitle Font
        const subTitlefontSize = 0 + ((this.newHeaderHeight - this.headerMinHeight) / (this.headerMaxHeight - this.headerMinHeight)) * 20;
        const subTitleopacity = 0 + ((this.newHeaderHeight - this.headerMinHeight) / (this.headerMaxHeight - this.headerMinHeight)) * 1;
        this.renderer.setStyle(this.subTitle, 'font-size', subTitlefontSize + 'px');
        this.renderer.setStyle(this.subTitle, 'line-height', subTitlefontSize + 'px');
        this.renderer.setStyle(this.subTitle, 'opacity', subTitleopacity.toString());
        //backgroundImage Font
        const opacity = 0 + ((this.newHeaderHeight - this.headerMinHeight) / (this.headerMaxHeight - this.headerMinHeight)) * 0.3;
        this.renderer.setStyle(this.backgroundImage, 'opacity', opacity.toString());
      });
    }
  }
}
