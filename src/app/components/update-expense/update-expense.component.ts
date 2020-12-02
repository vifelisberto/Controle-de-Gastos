import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { ExpenseItem } from './../expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import { AlertController, ToastController } from '@ionic/angular'
import { repeat } from 'src/app/services/repeat'

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css'],
})
export class UpdateExpenseComponent implements OnInit {
  public itemUpdate: ExpenseItem
  public currentPortion: string

  public expense = this.formBuilder.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    value: ['', Validators.required],
    dueDate: ['', Validators.required],
    category: [''],
    repeat: ['', Validators.required],
  })

  constructor(
    public alertController: AlertController,
    private dataExpensesService: DataExpensesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.itemUpdate = this.router.getCurrentNavigation().extras.state?.data

    if (this.itemUpdate) {
      let dueDate

      try {
        dueDate = this.itemUpdate.dueDate.toDateString()
      } catch {
        dueDate = new Date(this.itemUpdate.dueDate).toDateString()
      }

      this.expense.setValue({
        id: this.itemUpdate?.id,
        title: this.itemUpdate.title,
        value: this.itemUpdate.value,
        dueDate,
        category: this.itemUpdate.category.toString(),
        repeat: this.itemUpdate.repeat.toString(),
      })
    } else this.router.navigate(['/home'])
  }

  openSelectPlots() {
    if (this.expense.value.repeat === repeat.portion) {
      this.inputCustomPortionValue()
    }
  }

  async updateExpense() {
    console.log('submit', this.expense)
    if (this.expense.valid) {
      if (this.dataExpensesService.updateExpense(this.expense.value)) {
        this.toastSuccess()
        this.router.navigate(['/home'], { state: { data: this.expense.value } })
      } else await this.alertMessageInvalidData()
    } else {
      console.log('Dados inválidos')
    }
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Despesa alterada com sucesso!',
      duration: 1000,
    })
    toast.present()
  }

  private async inputCustomPortionValue() {
    const inputAlert = await this.alertController.create({
      header: 'Qual o número de parcelas?',
      inputs: [{ type: 'text', placeholder: 'Parcelas' }],
      buttons: [{ text: 'Cancelar' }, { text: 'Ok' }],
    })
    await inputAlert.present()
  }

  private async alertMessageInvalidData() {
    const inputAlert = await this.alertController.create({
      header: 'Erro ao cadastrar, por favor tente novamente',
      buttons: [{ text: 'Ok' }],
    })
    await inputAlert.present()
  }
}
