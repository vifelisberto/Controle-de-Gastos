import { DataFakeExpensesServiceService as DataFakeExpensesService } from './../services/data-fake-expenses.service'
import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component } from '@angular/core'
import { dataFake } from './../../data-fake'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  public monthSelect: number
  public expenses: ExpenseItem[]

  constructor(private dataFakeService: DataFakeExpensesService) {
    dataFake.dataMonthExpenses = this.dataFakeService.generateFakeData()
    this.getExpensesMonth(this.monthSelect)
  }

  getExpensesMonth = (month: number) =>
    (this.expenses = this.dataFakeService.getExpensesByMonth(month))
}
