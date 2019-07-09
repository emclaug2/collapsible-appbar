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

import { AppComponent } from './app.component';


@NgModule({
  imports: [BrowserModule, FormsModule, BrowserAnimationsModule, MatToolbarModule,
  MatExpansionModule,
    MatButtonModule, MatIconModule,
    MatTabsModule, FlexLayoutModule,
  MatFormFieldModule, MatCardModule,MatListModule, MatGridListModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
