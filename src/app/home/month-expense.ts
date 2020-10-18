import { ExpenseItem } from '../components/expense-items/expense-item'

export interface MonthExpenses {
  months: [
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
    ExpenseItem[],
  ]
}
