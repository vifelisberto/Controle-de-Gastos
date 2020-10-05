import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component } from '@angular/core'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public monthSelect: number
  public expenses: ExpenseItem[]

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
