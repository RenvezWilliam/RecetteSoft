import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './content/search/search.component';
import { EditComponent } from './content/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    AgGridModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
