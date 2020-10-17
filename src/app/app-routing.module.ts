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
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'analysis',
    component: AnalysisExpensesComponent,
  },
  {
    path: 'config',
    component: ConfigComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
