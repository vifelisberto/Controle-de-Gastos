import { AddExpenseComponent } from './../components/add-expense/add-expense.component'
import { MonthSelectComponent } from './../components/month-select/month-select.component'
import { ExpenseItemsComponent } from './../components/expense-items/expense-items.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HomePage } from './home.page'

import { HomePageRoutingModule } from './home-routing.module'
import { IonicStorageModule } from '@ionic/storage'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    ExpenseItemsComponent,
    MonthSelectComponent,
    AddExpenseComponent,
  ],
})
export class HomePageModule {}
