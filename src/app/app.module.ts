import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';


@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, MatToolbarModule,
    MatButtonModule, MatIconModule, FlexLayoutModule,
    MatListModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
