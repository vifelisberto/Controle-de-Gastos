import { DataFakeExpensesService } from './../services/data-fake-expenses.service'
import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component } from '@angular/core'
import { dataFake } from './../../data-fake'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  public monthSelect: number
  public expenses: ExpenseItem[]

  constructor(
    private router: Router,
    private dataFakeService: DataFakeExpensesService,
  ) {
    dataFake.dataMonthExpenses = this.dataFakeService.generateFakeData()
    this.getExpensesMonth(this.monthSelect)
  }

  getExpensesMonth(month: number) {
    this.expenses = this.dataFakeService.getExpensesByMonth(month) || []
  }

  createExpensePage = () => this.router.navigate(['/create'])

  getSumAllExpenses() {
    if (this.expenses) {
      return this.expenses
        ?.filter(expense => expense.value)
        ?.reduce((sum, x) => sum + x.value, 0.0)
    }

    return 0.0
  }
}
