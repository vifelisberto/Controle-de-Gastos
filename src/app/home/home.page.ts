import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component } from '@angular/core'
import { MonthExpenses } from './month-expense'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  public expensesMonth: MonthExpenses = { months: [] }
  public monthSelect: number
  public expenses: ExpenseItem[]

  constructor() {
    this.expensesMonth = this.generateFakeData()
    this.getExpensesMonth(this.monthSelect)
  }

  getExpensesMonth = (month: number) =>
    (this.expenses = this.expensesMonth.months[month])

  generateFakeData() {
    const firstMonth = 0
    const lastMonth = 11

    const monthExpenses: MonthExpenses = { months: [] }

    for (let i = firstMonth; i <= lastMonth; i++) {
      const newExpense = {
        title: `Conta do mês: ${i + 1}`,
        dueDate: new Date(2020, i, 1),
        value: Math.floor(Math.random() * 100 + 1),
      }

      monthExpenses.months.push([newExpense])
    }

    return monthExpenses
  }
}
