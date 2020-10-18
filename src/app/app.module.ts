import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouteReuseStrategy } from '@angular/router'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { CreateExpenseComponent } from './components/create-expense/create-expense.component'
import { HomePageComponent } from './home/home.page'
import { ExpenseItemsComponent } from './components/expense-items/expense-items.component'
import { MonthSelectComponent } from './components/month-select/month-select.component'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MenuComponent } from './components/menu/menu.component'
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component'
import { AnalysisExpensesComponent } from './components/analysis-expenses/analysis-expenses.component'
import { ConfigComponent } from './components/config/config.component'
import { AboutComponent } from './components/about/about.component'
import { LoginComponent } from './login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    CreateExpenseComponent,
    HomePageComponent,
    ExpenseItemsComponent,
    MonthSelectComponent,
    MenuComponent,
    UpdateExpenseComponent,
    AnalysisExpensesComponent,
    ConfigComponent,
    AboutComponent,
    LoginComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
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
