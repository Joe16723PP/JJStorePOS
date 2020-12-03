import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import {HistoryComponent} from './pages/history/history.component';
import {AddProductComponent} from './pages/add-product/add-product.component';
import {ProductManagementComponent} from './pages/product-management/product-management.component';
import {ProductHistoryComponent} from './pages/product-history/product-history.component';
import {ProfitSummaryComponent} from './pages/profit-summary/profit-summary.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'prod_history',
    component: ProductHistoryComponent
  },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: 'management',
    component: ProductManagementComponent
  },
  {
    path: 'profit',
    component: ProfitSummaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
