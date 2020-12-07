import { category } from 'src/app/services/category'
import { repeat } from 'src/app/services/repeat'

export interface ExpenseItem {
  id?: string
  title: string
  category: category
  dueDate: any
  value: number
  repeat: repeat
  paid: boolean
}
