import { MonthYear } from './../components/month-year-select/month-year'
import { Injectable } from '@angular/core'
import { ExpenseItem } from '../components/expense-items/expense-item'
import { v4 as uuidv4 } from 'uuid'
import { Storage } from '@ionic/storage'
import { category } from './category'
import { repeat } from './repeat'

@Injectable({
  providedIn: 'root',
})
export class DataExpensesService {
  private readonly keyData = 'ControlExpenses'

  constructor(private storage: Storage) {}

  public async getExpensesByMonthAndYear(monthYear: MonthYear) {
    const yearsAndMonths = await this.getAllYearsAndMonths()

    const monthsOfYear = this.getMonthsOfYear(yearsAndMonths, monthYear.year)

    if (monthsOfYear) return this.getMonthOfYear(monthsOfYear, monthYear.month)

    return []
  }

  public getExpenseById = async (id: string) => {
    if (id) return await this.searchExpenseById(id)
  }

  public async addExpense(expense: ExpenseItem) {
    if (this.validExpense(expense)) {
      const monthNewExpense = this.getMonth(expense.dueDate)
      const yearNewExpense = this.getYear(expense.dueDate)

      expense.id = uuidv4()
      expense.repeat = 1

      let yearsAndMonths = await this.getAllYearsAndMonths()

      if (!yearsAndMonths) {
        yearsAndMonths = {}
        this.storage.set(this.keyData, yearsAndMonths)
      }

      if (!(yearNewExpense in yearsAndMonths)) {
        yearsAndMonths[yearNewExpense] = {}
      }

      if (!(monthNewExpense in yearsAndMonths[yearNewExpense]))
        yearsAndMonths[yearNewExpense][monthNewExpense] = []

      yearsAndMonths[yearNewExpense][monthNewExpense].push(expense)

      this.storage.set(this.keyData, yearsAndMonths)

      return true
    }

    console.log('Despesa inválida: ', expense)
    return false
  }

  public async updateExpense(newExpense: ExpenseItem) {
    const yearsAndMonths = await this.getAllYearsAndMonths()

    Object.entries(yearsAndMonths).forEach(async ([key, year]) => {
      if (year)
        return await Object.entries(year).forEach(
          async ([key2, monthOfYear]) => {
            if (monthOfYear) {
              const idx = monthOfYear.findIndex(
                expense => expense.id === newExpense.id,
              )

              if (idx > -1) {
                yearsAndMonths[year as string][monthOfYear].slice(idx, 1)

                this.storage.set(this.keyData, yearsAndMonths)

                await this.addExpense(newExpense)
                return true
              }
            }
          },
        )
    })

    return false
  }

  public async deleteExpense(id: string) {
    if (id) {
      const yearsAndMonths = await this.getAllYearsAndMonths()

      return Object.entries(yearsAndMonths).forEach(([key, year]) => {
        if (year)
          return Object.entries(year).forEach(([key2, monthOfYear]) => {
            if (monthOfYear) {
              const idx = monthOfYear.findIndex(expense => expense.id === id)

              if (idx > -1) {
                yearsAndMonths[year as string][monthOfYear].slice(idx, 1)

                this.storage.set(this.keyData, yearsAndMonths)
                return
              }
            }
          })
      })
    }
  }

  private async searchExpenseById(id: string) {
    const yearsAndMonths = await this.getAllYearsAndMonths()

    Object.entries(yearsAndMonths).forEach(([key, year]) => {
      if (year)
        Object.entries(year).forEach(([key2, monthsOfYear]) => {
          if (monthsOfYear)
            return monthsOfYear.find(expense => expense.id === id)
        })
    })
  }

  private validExpense = (expense: ExpenseItem) =>
    expense && expense.title && expense.dueDate && expense.value

  private getMonth = (date: Date) => new Date(date).getMonth()

  private getYear = (date: Date) => new Date(date).getFullYear()

  private getAllYearsAndMonths = async () =>
    await this.storage.get(this.keyData)

  private getMonthsOfYear(yearsAndMonths, yearFilter: number) {
    if (yearFilter in yearsAndMonths) return yearsAndMonths[yearFilter]
  }

  private getMonthOfYear(monthsOfYear, monthFilter) {
    if (monthFilter in monthsOfYear) return monthsOfYear[monthFilter]
  }
}
