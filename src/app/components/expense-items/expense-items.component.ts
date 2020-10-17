import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { ExpenseItem } from './expense-item'

@Component({
  selector: 'app-expense-items',
  templateUrl: './expense-items.component.html',
  styleUrls: ['./expense-items.component.css'],
})
export class ExpenseItemsComponent implements OnChanges {
  @Input() expenses: ExpenseItem[]

  ngOnChanges = (changes: SimpleChanges) =>
    (this.expenses = changes.expenses.currentValue)
}
