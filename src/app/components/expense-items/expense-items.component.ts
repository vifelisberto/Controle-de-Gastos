import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { ExpenseItem } from './expense-item'

@Component({
  selector: 'app-expense-items',
  templateUrl: './expense-items.component.html',
  styleUrls: ['./expense-items.component.css'],
})
export class ExpenseItemsComponent implements OnChanges {
  @Input() expenses: ExpenseItem[]

  constructor(
    private alertController: AlertController,
    private dataService: DataExpensesService,
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.expenses = changes.expenses.currentValue
  }

  updateExpense = (expense: ExpenseItem) =>
    this.router.navigate(['/update'], { state: { data: expense } })

  async confirmDeleteExpense(id: string) {
    const alert = await this.alertController.create({
      header: 'Excluir Gasto',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            // console.log(event)
          },
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataService.deleteExpense(id)
          },
        },
      ],
    })

    await alert.present()
  }

  checkExpenseOverdue(expense: ExpenseItem) {
    const dateNow = new Date()
    const dateExpense = new Date(expense.dueDate)

    return (
      !expense.paid &&
      (dateExpense.getMonth() < dateNow.getMonth() ||
        (dateExpense.getMonth() === dateNow.getMonth() &&
          dateExpense.getDate() < dateNow.getDate()))
    )
  }

  private verifyNumberOneLessTwo = (numberOne: number, numberTwo: number) =>
    numberOne < numberTwo
}
