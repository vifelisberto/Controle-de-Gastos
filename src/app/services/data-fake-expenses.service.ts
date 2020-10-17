import { Injectable } from '@angular/core'
import { dataFake } from 'src/data-fake'
import { ExpenseItem } from '../components/expense-items/expense-item'
import { v4 as uuidv4 } from 'uuid'
import { MonthExpenses } from '../home/month-expense'

@Injectable({
  providedIn: 'root',
})
export class DataFakeExpensesServiceService {
  public getAllMonthsExpenses = () => dataFake.dataMonthExpenses.months

  public getExpensesByMonth = (month: number) =>
    dataFake.dataMonthExpenses.months[month]

  public getExpenseById = (id: string) => this.searchExpenseById(id)

  public addExpense(expense: ExpenseItem): boolean {
    if (this.validExpense(expense)) {
      const monthNewExpense = expense.dueDate.getMonth().toString()

      expense.id = uuidv4()
      dataFake.dataMonthExpenses.months[monthNewExpense].push(expense)

      return true
    }

    console.log('Despesa inválida: ', expense)
    return false
  }

  public updateExpense(expense: ExpenseItem): ExpenseItem {
    const monthExpense = expense.dueDate.getMonth().toString()

    let expenseExisting = dataFake.dataMonthExpenses.months[monthExpense]?.find(
      x => x.id === expense.id,
    )

    if (expenseExisting) {
      expenseExisting = expense
    }

    // TODO: Verificar se ele altera por referencia ou se será necessario excluir e inserir novamente

    return expenseExisting
  }

  public generateFakeData() {
    const firstMonth = 0
    const lastMonth = 11

    const monthExpenses: MonthExpenses = { months: [] }

    for (let i = firstMonth; i <= lastMonth; i++) {
      const newExpense = {
        id: i.toString(),
        title: `Conta do mês: ${i + 1}`,
        category: 'Estudo',
        dueDate: new Date(2020, i, 1),
        value: Math.floor(Math.random() * 100 + 1),
      }

      monthExpenses.months.push([newExpense])
    }

    return monthExpenses
  }

  public deleteExpense(id: string) {
    for (let monthExpense of dataFake.dataMonthExpenses.months)
      monthExpense = monthExpense.filter(expense => expense.id !== id)
  }

  private searchExpenseById(id: string) {
    for (const monthExpense of dataFake.dataMonthExpenses.months)
      return monthExpense.find(expense => expense.id === id)
  }

  private validExpense = (expense: ExpenseItem) =>
    expense && expense.title && expense.dueDate && expense.value
}