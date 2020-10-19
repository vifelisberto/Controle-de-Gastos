import { Injectable } from '@angular/core'
import { category, dataFake, repeat } from 'src/data-fake'
import { ExpenseItem } from '../components/expense-items/expense-item'
import { v4 as uuidv4 } from 'uuid'
import { MonthExpenses } from '../home/month-expense'

@Injectable({
  providedIn: 'root',
})
export class DataFakeExpensesService {
  public getAllMonthsExpenses = () => dataFake.dataMonthExpenses.months

  public getExpensesByMonth = (month: number) =>
    dataFake.dataMonthExpenses.months[month]

  public getExpenseById = (id: string) => this.searchExpenseById(id)

  public addExpense(expense: ExpenseItem): boolean {
    if (this.validExpense(expense)) {
      const monthNewExpense = this.getNumberMonthString(expense.dueDate)

      expense.id = uuidv4()
      expense.repeat = 1
      dataFake.dataMonthExpenses.months[monthNewExpense].push(expense)

      return true
    }

    console.log('Despesa inválida: ', expense)
    return false
  }

  public updateExpense(newExpense: ExpenseItem) {
    const monthExpense = this.getNumberMonthString(newExpense.dueDate)

    const expenseExisting = dataFake.dataMonthExpenses.months[
      monthExpense
    ]?.find(x => x.id === newExpense.id)

    if (expenseExisting) {
      const indexItem = dataFake.dataMonthExpenses.months[monthExpense].indexOf(
        expenseExisting,
      )
      dataFake.dataMonthExpenses.months[monthExpense][indexItem] = newExpense

      return true
    }

    return false
  }

  public generateFakeData() {
    const firstMonth = 0
    const lastMonth = 11

    const monthExpenses: MonthExpenses = {
      months: [[], [], [], [], [], [], [], [], [], [], [], []],
    }

    const expensesRandom = ['Faculdade', 'Lanche', 'Roupa', 'PS5', 'PC', 'Skol']

    for (let i = firstMonth; i <= lastMonth; i++) {
      for (let j = 0; j < 2; j++) {
        const newExpense = {
          id: uuidv4(),
          title: expensesRandom[Math.floor(Math.random() * 6)],
          category: category.cheers,
          dueDate: new Date(2020, i, 1),
          value: Math.floor(Math.random() * 100.0 + 1.0),
          repeat: repeat.monthly,
          paid: false,
        }

        monthExpenses.months[i].push(newExpense)
      }
    }

    return monthExpenses
  }

  public deleteExpense(id: string) {
    dataFake.dataMonthExpenses.months.forEach((value, index) => {
      const existExpense = value.find(expense => expense.id === id)

      if (existExpense) {
        const indexExistExpense = value.indexOf(existExpense)
        dataFake.dataMonthExpenses.months[index].splice(indexExistExpense, 1)
        return
      }
    })
  }

  private searchExpenseById(id: string) {
    for (const monthExpense of dataFake.dataMonthExpenses.months)
      return monthExpense.find(expense => expense.id === id)
  }

  private validExpense = (expense: ExpenseItem) =>
    expense && expense.title && expense.dueDate && expense.value

  private getNumberMonthString = (date: Date) =>
    new Date(date).getMonth().toString()
}
