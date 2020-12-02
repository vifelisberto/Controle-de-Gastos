import { MonthYear } from './../components/month-year-select/month-year'
import { DataExpensesService } from '../services/data-expenses.service'
import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent implements OnInit {
  public monthYearSelect: MonthYear
  public expenses: ExpenseItem[]

  constructor(
    private router: Router,
    private dataService: DataExpensesService,
  ) {}

  ngOnInit(): void {
    const expense = this.router.getCurrentNavigation().extras.state?.data

    if (expense && expense.dueDate)
      this.monthYearSelect = {
        month: expense.dueDate.getMonth(),
        year: expense.dueDate.getFullYear(),
      }

    this.getExpensesMonth(this.monthYearSelect)
  }

  getExpensesMonth = async (monthYear: MonthYear) =>
    (this.expenses =
      (await this.dataService.getExpensesByMonthAndYear(monthYear)) || [])

  createExpensePage = () => this.router.navigate(['/create'])

  getSumAllExpenses() {
    if (this.expenses) {
      return this.expenses
        ?.filter(expense => expense.value)
        ?.reduce((sum, x) => sum + x.value, 0.0)
    }

    return 0.0
  }
}
