import { CreateExpenseComponent } from './components/create-expense/create-expense.component'
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component'
import { LoginComponent } from './login/login.component'
import { ConfigComponent } from './components/config/config.component'
import { AnalysisExpensesComponent } from './components/analysis-expenses/analysis-expenses.component'
import { AboutComponent } from './components/about/about.component'
import { HomePageComponent } from './home/home.page'
import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: { title: 'Controle de Gastos' },
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'Sobre' },
  },
  {
    path: 'analysis',
    component: AnalysisExpensesComponent,
    data: { title: 'Análises' },
  },
  {
    path: 'config',
    component: ConfigComponent,
    data: { title: 'Configurações' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: 'create',
    component: CreateExpenseComponent,
    data: { title: 'Nova Despesa' },
  },
  {
    path: 'update',
    component: UpdateExpenseComponent,
    data: { title: 'Editar Despesas' },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
