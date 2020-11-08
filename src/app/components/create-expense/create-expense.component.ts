import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'
import { repeat } from 'src/app/services/repeat'

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent {
  public currentPortion: string

  public expense = this.formBuilder.group({
    title: ['', Validators.required],
    value: ['', Validators.required],
    dueDate: ['', Validators.required],
    category: [''],
    repeat: [''],
    paid: false,
  })

  constructor(
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataExpensesService: DataExpensesService,
    private toastController: ToastController,
  ) {}

  openSelectPlots() {
    if (this.expense.value.repeat === repeat.portion) {
      this.inputCustomPortionValue()
    }
  }

  async addNewExpense() {
    // console.log('submit', this.expense)
    if (this.expense.valid) {
      if (this.dataExpensesService.addExpense(this.expense.value)) {
        this.toastSuccess()
        this.router.navigate(['/home'])
      } else await this.alertMessageInvalidData()
    } else {
      console.log('Dados inválidos')
    }
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Nova despesa cadastrada com sucesso!',
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
