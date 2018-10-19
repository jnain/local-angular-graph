import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressBarModule, MatTableModule, MatInputModule, MatSelectModule, 
  MatOptionModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule } from '@angular/material';
import { ChartModule } from 'angular-highcharts';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { BatchComponent } from './batch/batch.component';
import { DataTableComponent } from './data-table/data-table.component';
import { DataTableGraphComponent } from './data-table-graph/data-table-graph.component';

import { HttpClientModule } from'@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    BatchComponent,
    DataTableComponent,
    DataTableGraphComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ChartModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
