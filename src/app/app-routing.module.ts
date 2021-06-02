import { CadastroComponent } from './cadastro/cadastro.component'
import { CreateExpenseComponent } from './components/create-expense/create-expense.component'
import { UpdateExpenseComponent } from './components/update-expense/update-expense.component'
import { ConfigComponent } from './components/config/config.component'
import { AnalysisExpensesComponent } from './components/analysis-expenses/analysis-expenses.component'
import { HomePageComponent } from './home/home.page'
import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
    data: { title: 'Dr. Cash - Controle de Gastos' },
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
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'register',
    component: CadastroComponent,
    data: { title: 'Cadastrar Usuario' },
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
