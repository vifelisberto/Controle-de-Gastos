import { DataFakeExpensesService } from 'src/app/services/data-fake-expenses.service'
import { repeat } from './../../../data-fake'
import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'

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
  })

  constructor(
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataFakeExpensesService: DataFakeExpensesService,
  ) {}

  openSelectPlots() {
    if (this.expense.value.repeat === repeat.portion) {
      this.inputCustomPortionValue()
    }
  }

  async inputCustomPortionValue() {
    const inputAlert = await this.alertController.create({
      header: 'Qual o número de parcelas?',
      inputs: [{ type: 'text', placeholder: 'Parcelas' }],
      buttons: [{ text: 'Cancelar' }, { text: 'Ok' }],
    })
    await inputAlert.present()
  }

  addNewExpense() {
    console.log('submit', this.expense)
    if (this.expense.valid) {
      this.dataFakeExpensesService.addExpense(this.expense.value)

      this.router.navigate(['/home'])
    } else {
      console.log('Dados inválidos')
    }
  }
}
