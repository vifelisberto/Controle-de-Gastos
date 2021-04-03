import { NotificationService } from './notification.service'
import { MonthYear } from './../components/month-year-select/month-year'
import { Injectable } from '@angular/core'
import { ExpenseItem } from '../components/expense-items/expense-item'
import { v4 as uuidv4 } from 'uuid'
import { Storage } from '@ionic/storage'
import { ControlExpenses } from './control-expenses'

@Injectable({
  providedIn: 'root',
})
export class DataExpensesService {
  private readonly keyData = 'ControlExpenses'
  private yearsAndMonths: ControlExpenses
  private promiseData: Promise<void>

  constructor(
    private storage: Storage,
    private notificationService: NotificationService,
  ) {
    this.promiseData = this.fillYearsAndMonthsControlExpenses()
  }

  public async getExpensesByMonthAndYear(monthYear: MonthYear) {
    await this.promiseData

    if (monthYear) {
      const monthsOfYear = this.getMonthsOfYear(monthYear.year)

      if (monthsOfYear) return this.getMonthOfYear(monthsOfYear, monthYear)
    }
  }

  public getExpenseById = async (id: string) => {
    await this.promiseData
    if (id) return await this.searchExpenseById(id)
  }

  public async addExpense(expense: ExpenseItem) {
    await this.promiseData

    if (this.validExpense(expense)) {
      const monthNewExpense = this.getMonth(expense.dueDate)
      const yearNewExpense = this.getYear(expense.dueDate)

      expense.id = uuidv4()
      expense.repeat = 1

      if (!this.yearsAndMonths) {
        this.yearsAndMonths = {}
      }

      if (!(yearNewExpense in this.yearsAndMonths)) {
        this.yearsAndMonths[yearNewExpense] = {}
      }

      if (!(monthNewExpense in this.yearsAndMonths[yearNewExpense]))
        this.yearsAndMonths[yearNewExpense][monthNewExpense] = []

      this.yearsAndMonths[yearNewExpense][monthNewExpense].push(expense)

      this.setControlExpenses(this.yearsAndMonths)

      this.notificationService.RequestPermission()
      this.notificationService.scheduleBasic()

      return true
    }

    console.log('Despesa inválida: ', expense)
    return false
  }

  public async updateExpense(newExpense: ExpenseItem) {
    await this.promiseData

    if (this.yearsAndMonths)
      for (const year in this.yearsAndMonths) {
        if (this.yearsAndMonths[year])
          for (const month in this.yearsAndMonths[year]) {
            if (this.yearsAndMonths[year][month]) {
              const idx = this.yearsAndMonths[year][month].findIndex(
                expense => expense.id === newExpense.id,
              )

              if (idx > -1) {
                const expenseExist = this.yearsAndMonths[year][month][idx]

                const dateExist = new Date(expenseExist.dueDate)
                const dateNew = new Date(newExpense.dueDate)

                if (
                  dateExist.getMonth() !== dateNew.getMonth() ||
                  dateExist.getFullYear() !== dateNew.getFullYear()
                ) {
                  this.yearsAndMonths[year][month].splice(idx, 1)

                  this.addExpense(newExpense)
                } else {
                  this.yearsAndMonths[year][month][idx] = newExpense
                  this.setControlExpenses(this.yearsAndMonths)
                }

                return true
              }
            }
          }
      }

    return false
  }

  public async deleteExpense(id: string) {
    if (id) {
      await this.promiseData

      if (this.yearsAndMonths)
        for (const year in this.yearsAndMonths) {
          if (this.yearsAndMonths[year])
            for (const month in this.yearsAndMonths[year]) {
              if (this.yearsAndMonths[year][month]) {
                const idx = this.yearsAndMonths[year][month].findIndex(
                  expense => expense.id === id,
                )

                if (idx > -1) {
                  const expenseDelete = this.yearsAndMonths[year][month][idx]

                  this.yearsAndMonths[year][month].splice(idx, 1)

                  this.setControlExpenses(this.yearsAndMonths)
                  return expenseDelete
                }
              }
            }
        }
    }
  }

  private async searchExpenseById(id: string) {
    if (this.yearsAndMonths)
      for (const year in this.yearsAndMonths) {
        if (this.yearsAndMonths[year])
          for (const month in this.yearsAndMonths[year]) {
            if (this.yearsAndMonths[year][month]) {
              const existsExpense = this.yearsAndMonths[year][month].find(
                expense => expense.id === id,
              )

              if (existsExpense) return existsExpense
            }
          }
      }
  }

  private validExpense = (expense: ExpenseItem) =>
    expense && expense.title && expense.dueDate && expense.value

  private getMonth = (date: Date) => new Date(date).getMonth()

  private getYear = (date: Date) => new Date(date).getFullYear()

  private getMonthsOfYear(yearFilter: number) {
    if (!this.yearsAndMonths) {
      this.yearsAndMonths = {}

      if (!(yearFilter in this.yearsAndMonths)) {
        this.yearsAndMonths[yearFilter] = {}
      }
    }

    return this.yearsAndMonths[yearFilter]
  }

  private getMonthOfYear(monthsOfYear, monthYearFilter: MonthYear) {
    if (!(monthYearFilter.month in this.yearsAndMonths[monthYearFilter.year]))
      this.yearsAndMonths[monthYearFilter.year][monthYearFilter.month] = []

    return monthsOfYear[monthYearFilter.month]
  }

  private setControlExpenses(controlExpenses: ControlExpenses): void {
    this.yearsAndMonths = controlExpenses
    this.storage.set(this.keyData, controlExpenses)
  }

  private async fillYearsAndMonthsControlExpenses() {
    const controlExpenses = await this.storage.get(this.keyData)
    this.yearsAndMonths = controlExpenses
  }
}
