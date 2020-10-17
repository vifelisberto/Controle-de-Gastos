import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component } from '@angular/core'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent {
  public monthSelect: number
  public expenses: ExpenseItem[] = [
    {
      title: 'Faculdade',
      dueDate: new Date(10, 3, 10),
      value: 100.30
    },
    {
      title: 'Toddynho',
      dueDate: new Date(10, 3, 10),
      value: 30
    },
    {
      title: 'Gutao',
      dueDate: new Date(10, 3, 10),
      value: 10
    },
    {
      title: 'Test',
      dueDate: new Date(10, 3, 10),
      value: 1
    },
  ]

  constructor(private storage: Storage) {
    this.updateExpensesMonth(this.monthSelect)
  }

  updateExpensesMonth(month: number) {
    if (month) {
      this.storage.get(month.toString()).then(value => {
        console.log(value)
        this.expenses = value
      })
    }
  }
}
