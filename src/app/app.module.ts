/* tslint:disable:no-trailing-whitespace */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule, MatListModule, MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HistoryComponent} from './pages/history/history.component';
import {MainComponent} from './pages/main/main.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AutofocusDirective} from './auto-focus.directive';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {AddProductComponent} from './pages/add-product/add-product.component';
import {ProductManagementComponent} from './pages/product-management/product-management.component';
import {ProductHistoryComponent} from './pages/product-history/product-history.component';
import {HistoryTableComponent} from './components/history-table/history-table.component';
import { AddProdTypeComponent } from './components/add-prod-type/add-prod-type.component';
import {ExportAsModule} from 'ngx-export-as';
import { AddProdComponent } from './components/add-prod/add-prod.component';
import { ProfitSummaryComponent } from './pages/profit-summary/profit-summary.component';
import { DialogProdManagementComponent } from './components/dialog-prod-management/dialog-prod-management.component';
import { DialogSpinnerComponent } from './components/dialog-spinner/dialog-spinner.component';
import { DialogEditProdTypeComponent } from './components/dialog-edit-prod-type/dialog-edit-prod-type.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    HistoryComponent,
    FooterComponent,
    AutofocusDirective,
    CalculatorComponent,
    AddProductComponent,
    ProductManagementComponent,
    ProductHistoryComponent,
    HistoryTableComponent,
    AddProdTypeComponent,
    AddProdComponent,
    ProfitSummaryComponent,
    DialogProdManagementComponent,
    DialogSpinnerComponent,
    DialogEditProdTypeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ExportAsModule,
    FlexLayoutModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    MatListModule
  ],
  entryComponents: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    HistoryComponent,
    FooterComponent,
    CalculatorComponent,
    AddProductComponent,
    ProductManagementComponent,
    ProductHistoryComponent,
    HistoryTableComponent,
    AddProdTypeComponent,
    AddProdComponent,
    ProfitSummaryComponent,
    DialogProdManagementComponent,
    DialogSpinnerComponent,
    DialogEditProdTypeComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
