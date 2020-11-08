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
  private keyMonthExpense = 'dataMonthExpenses'
  private dataMonthExpenses = {
    months: [[], [], [], [], [], [], [], [], [], [], [], []],
  } as MonthExpenses

  constructor(private storage: Storage) {
    this.getAllMonthsExpenses()
  }

  public getAllMonthsExpenses = async () => {
    const monthExpenses = await this.storage.get(this.keyMonthExpense)
    if (monthExpenses) this.dataMonthExpenses = monthExpenses
    else this.storage.set(this.keyMonthExpense, this.dataMonthExpenses)

    return this.dataMonthExpenses.months
  }

  public getExpensesByMonth = async (month: number) =>
    (await this.getAllMonthsExpenses())[month]

  public getExpenseById = (id: string) => {
    if (id) return this.searchExpenseById(id)
  }

  public addExpense(expense: ExpenseItem): boolean {
    if (this.validExpense(expense)) {
      const monthNewExpense = Number(this.getNumberMonthString(expense.dueDate))

      expense.id = uuidv4()
      expense.repeat = 1

      this.dataMonthExpenses.months[monthNewExpense].push(expense)
      this.storage.set(this.keyMonthExpense, this.dataMonthExpenses)

      return true
    }

    console.log('Despesa inválida: ', expense)
    return false
  }

  public updateExpense(newExpense: ExpenseItem) {
    const monthExpense = Number(this.getNumberMonthString(newExpense.dueDate))

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
  }

  private validExpense = (expense: ExpenseItem) =>
    expense && expense.title && expense.dueDate && expense.value

  private getNumberMonthString = (date: Date) =>
    new Date(date).getMonth().toString()
}
