import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatToolbarModule,
  MatTabsModule,
  MatButtonModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatIconModule,
  MatRadioModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatCardModule,
  MatListModule,
  MatGridListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { GroupByPipe } from './shared/groupby.pipe';
import { KeyValuePipe } from './shared/key-value.pipe';
import { UnCamelCasePipe } from './shared/un-camel-case.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, MatToolbarModule,
  MatExpansionModule,
    MatButtonModule, MatIconModule,
    MatTabsModule, FlexLayoutModule,ScrollDispatchModule,
  MatFormFieldModule, MatCardModule,MatListModule, MatGridListModule],
  declarations: [AppComponent, GroupByPipe, KeyValuePipe, UnCamelCasePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
