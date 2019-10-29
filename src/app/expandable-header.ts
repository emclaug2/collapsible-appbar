import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Component({
  selector: 'expandable-header',
  template: '<ng-content></ng-content>',
})
export class ExpandableHeader {

  @Input('scrollArea') scrollArea: any;
  @Input('headerHeight') headerHeight: number;
  @Input('shrinkToolbar') shrinkToolbar: boolean;


  newHeaderHeight: any;

  constructor(public element: ElementRef, public renderer: Renderer2, public domCtrl: DomController) {

  }

  ngOnInit() {
    this.renderer.setStyle(this.element.nativeElement, 'height', this.headerHeight + 'px');
    this.scrollArea.ionScroll.subscribe((ev) => {
      this.resizeHeader(ev);
    });

  }

  resizeHeader(ev: any) {
    if (ev) {
      this.domCtrl.write(() => {
        this.newHeaderHeight = this.headerHeight - ev.detail.scrollTop;
        if (this.newHeaderHeight < 56) {
          this.newHeaderHeight = 56;
        }
        if (this.newHeaderHeight > 200) {
          this.newHeaderHeight = 200;
        }
        this.renderer.setStyle(this.element.nativeElement, 'height', this.newHeaderHeight + 'px');
        if (document.getElementById('mainTitle')) {
          if ((this.newHeaderHeight / 3) < 30) {
            document.getElementById('mainTitle').style.fontSize = (this.newHeaderHeight / 3) + 'px';
          }
        }
        if (document.getElementById('subTitle')) {
          document.getElementById('subTitle').style.fontSize = (this.newHeaderHeight / 12.5) + 'px';
        }
      });
    }
  }
}
