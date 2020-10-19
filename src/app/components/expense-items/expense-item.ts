import { category, repeat } from 'src/data-fake'

export interface ExpenseItem {
  id?: string
  title: string
  category: category
  dueDate: Date
  value: number
  repeat: repeat
  paid: boolean
}
