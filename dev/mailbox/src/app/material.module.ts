import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatDatepickerModule,
  MatDialogModule,
  MatTooltipModule,
  MatIconModule,
  MatListModule,
} from '@angular/material';

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
  ],
})
export class MaterialModule {}
