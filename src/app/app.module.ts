import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { ModalCreateExpenseComponent } from './components/modal-create-expense/modal-create-expense.component'
import { HomePageComponent } from './home/home.page'
import { ExpenseItemsComponent } from './components/expense-items/expense-items.component'
import { MonthSelectComponent } from './components/month-select/month-select.component'
import { AddExpenseComponent } from './components/add-expense/add-expense.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicStorageModule } from '@ionic/storage';
import { MenuComponent } from './components/menu/menu.component';
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component';
import { AnalysisExpensesComponent } from './components/analysis-expenses/analysis-expenses.component';
import { ConfigComponent } from './components/config/config.component';
import { AboutComponent } from './components/about/about.component'

@NgModule({
  declarations: [
    AppComponent,
    ModalCreateExpenseComponent,
    HomePageComponent,
    ExpenseItemsComponent,
    MonthSelectComponent,
    AddExpenseComponent,
    MenuComponent,
    UpdateExpenseComponent,
    AnalysisExpensesComponent,
    ConfigComponent,
    AboutComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
