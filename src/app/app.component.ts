import { Component, NgZone } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { map } from 'rxjs/operators';
import { presidents } from './shared/presidents';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  list = presidents;
  private readonly SHRINK_TOP_SCROLL_POSITION = 64;
  shrinkToolbar = false;
  scrollingSubscription: any;
  scrollTop: any;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone
  ) {
    this.matIconRegistry.addSvgIcon(
      "breaker",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../node_modules/@pxblue/icons-svg/Breaker.svg")
    );
  }


  ngOnInit() {
    this.scrollDispatcher.scrolled()
      .pipe(map((event: CdkScrollable) => this.getScrollPosition(event)))
      .subscribe(scrollTop => this.ngZone.run(() => this.setScroll(scrollTop)));
  }

  getScrollPosition(event) {
    if (event) {
      return event.getElementRef().nativeElement.scrollTop;
    } else {
      return window.scrollY;
    }
  }
  setScroll(scrollTop){
    this.shrinkToolbar = scrollTop > this.SHRINK_TOP_SCROLL_POSITION ? true : false;
    this.scrollTop = scrollTop;
  }
}
