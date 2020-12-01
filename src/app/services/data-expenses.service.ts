import { MonthYear } from './../components/month-year-select/month-year'
import { Injectable } from '@angular/core'
import { ExpenseItem } from '../components/expense-items/expense-item'
import { v4 as uuidv4 } from 'uuid'
import { MonthExpenses } from '../home/month-expense'
import { Storage } from '@ionic/storage'
import { category } from './category'
import { repeat } from './repeat'

@Injectable({
  providedIn: 'root',
})
export class DataExpensesService {
  constructor(private storage: Storage) {}

  public async getExpensesByMonthAndYear(monthYear: MonthYear) {
    const monthsOfYear = await this.storage.get(monthYear.year.toString())

    const monthFilter = monthYear.month.toString()

    if (monthFilter in monthsOfYear) {
      return monthsOfYear[monthFilter]
    }

    return []
  }

  public getExpenseById = (id: string) => {
    if (id) return this.searchExpenseById(id)
  }

  public async addExpense(expense: ExpenseItem): Promise<boolean> {
    if (this.validExpense(expense)) {
      const monthNewExpense = this.getMonth(expense.dueDate)
      const yearNewExpense = this.getYear(expense.dueDate)

      expense.id = uuidv4()
      expense.repeat = 1

      const monthsOfYear = await this.storage.get(yearNewExpense.toString())

      if (!(monthNewExpense.toString() in monthsOfYear))
        monthsOfYear[monthNewExpense.toString()] = []

      monthsOfYear[monthNewExpense.toString()].push(expense)

      return true
    }

    console.log('Despesa inválida: ', expense)
    return false
  }

  public updateExpense(newExpense: ExpenseItem) {
    const monthExpense = this.getMonth(newExpense.dueDate)
    const yearNewExpense = this.getYear(newExpense.dueDate)

    const indexItem = this.dataMonthExpenses.months[monthExpense]?.findIndex(
      x => x.id === newExpense.id,
    )

    if (indexItem !== -1) {
      this.dataMonthExpenses.months[monthExpense][indexItem] = newExpense
      this.storage.set(this.keyMonthExpense, this.dataMonthExpenses)

      return true
    }

    return false
  }

  public deleteExpense(id: string) {
    if (id)
      this.dataMonthExpenses.months.forEach((month, index) => {
        const indexExistExpense = month.findIndex(expense => expense.id === id)

        if (indexExistExpense !== -1) {
          this.dataMonthExpenses.months[index].splice(indexExistExpense, 1)
          this.storage.set(this.keyMonthExpense, this.dataMonthExpenses)
          return
        }
      })
  }

  private searchExpenseById(id: string) {
    if (id)
      for (const monthExpense of this.dataMonthExpenses.months)
        return monthExpense.find(expense => expense.id === id)

    const monthsOfYear = await this.storage.get()

    Object.entries(obj).forEach(([key, value]) => {
      console.log(key + ' ' + value) // "a 5", "b 7", "c 9"
    })
  }

  private validExpense = (expense: ExpenseItem) =>
    expense && expense.title && expense.dueDate && expense.value

  private getMonth = (date: Date) => new Date(date).getMonth()

  private getYear = (date: Date) => new Date(date).getFullYear()
}
