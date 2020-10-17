import { Component, Input, OnChanges, SimpleChanges } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { DataFakeExpensesService } from 'src/app/services/data-fake-expenses.service'
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
    private dataFakeService: DataFakeExpensesService,
    private router: Router,
  ) {}

  ngOnChanges = (changes: SimpleChanges) =>
    (this.expenses = changes.expenses.currentValue)

  updateExpense = (expense: ExpenseItem) =>
    this.router.navigate(['/update'], { state: { data: expense } })

  async confirmDeleteExpense(id: string) {
    const alert = await this.alertController.create({
      header: 'Excluir Gasto',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.dataFakeService.deleteExpense(id)
          },
        },
      ],
    })

    await alert.present()
  }
}
