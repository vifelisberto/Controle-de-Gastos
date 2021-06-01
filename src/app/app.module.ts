import { NgModule, LOCALE_ID } from '@angular/core'
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
import { MonthYearSelectComponent } from './components/month-year-select/month-year-select.component'
import { CommonModule, registerLocaleData } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MenuComponent } from './components/menu/menu.component'
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component'
import { AnalysisExpensesComponent } from './components/analysis-expenses/analysis-expenses.component'
import { ConfigComponent } from './components/config/config.component'
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment'
import localePt from '@angular/common/locales/pt'
import { CadastroComponent } from './cadastro/cadastro.component'
registerLocaleData(localePt)

@NgModule({
  declarations: [
    AppComponent,
    CreateExpenseComponent,
    HomePageComponent,
    ExpenseItemsComponent,
    MonthYearSelectComponent,
    MenuComponent,
    UpdateExpenseComponent,
    AnalysisExpensesComponent,
    ConfigComponent,
    CadastroComponent,
  ],
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFirestoreModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
