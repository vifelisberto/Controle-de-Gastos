import { ExpenseItem } from './../expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css'],
})
export class UpdateExpenseComponent implements OnInit {
  public itemUpdate: ExpenseItem

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.itemUpdate = this.router.getCurrentNavigation().extras.state.data
    console.log(this.itemUpdate)
  }
}
