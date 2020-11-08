import { category } from 'src/app/services/category'
import { repeat } from 'src/app/services/repeat'

export interface ExpenseItem {
  id?: string
  title: string
  category: category
  dueDate: Date
  value: number
  repeat: repeat
  paid: boolean
}
