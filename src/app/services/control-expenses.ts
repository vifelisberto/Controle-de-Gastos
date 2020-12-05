import { ExpenseItem } from './../components/expense-items/expense-item'

export interface ControlExpenses {
  [year: string]: { [month: string]: ExpenseItem[] }
}
