import { ExpenseItem } from './../expense-items/expense-item'
import { repeat } from './../../services/repeat'
import { MonthYear } from './../month-year-select/month-year'
import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular'
import { Router } from '@angular/router'
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent {
  public currentPortion: string
  public monthYearSelected: MonthYear

  public expense: FormGroup

  constructor(
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataExpensesService: DataExpensesService,
    private toastController: ToastController,
  ) {
    const dateNow = new Date()

    this.monthYearSelected = this.router.getCurrentNavigation().extras.state
      ?.data || { month: dateNow.getMonth(), year: dateNow.getFullYear() }

    this.expense = this.formBuilder.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      dueDate: [
        `${this.monthYearSelected.year}-${
          this.monthYearSelected.month + 1 < 10
            ? '0' + (this.monthYearSelected.month + 1)
            : this.monthYearSelected.month + 1
        }-${dateNow.getDate()}`,
        Validators.required,
      ],
      category: [''],
      repeat: false,
      paid: false,
      qtyPortion: undefined,
      repeatType: undefined,
    })
  }

  async addNewExpense() {
    if (this.expense.valid) {
      if (this.expense.value?.repeat) {
        if (this.expense.value?.repeatType === 'portion') {
          await this.addNewExpensesRepeat(
            this.expense.value,
            this.expense.value?.qtyPortion,
          )
          this.toastSuccess()
          this.router.navigate(['/home'])
        } else if (this.expense.value?.repeatType === 'fixed') {
          const months = 400
          await this.addNewExpensesRepeat(this.expense.value, months)
          this.toastSuccess()
          this.router.navigate(['/home'])
        }
      } else if (
        await this.dataExpensesService.addExpense(this.expense.value)
      ) {
        this.toastSuccess()
        this.router.navigate(['/home'])
      } else await this.alertMessageInvalidData()
    } else {
      console.log('Dados inválidos')
    }
  }

  async addNewExpensesRepeat(expense: ExpenseItem, qtyPortion: number) {
    let dateExpense = new Date(expense.dueDate)

    for (let i = 1; i <= qtyPortion; i++) {
      let expenseForAdd = { ...expense }
      expenseForAdd.dueDate = `${dateExpense.getFullYear()}-${
        dateExpense.getMonth() + 1 < 10
          ? '0' + (dateExpense.getMonth() + 1)
          : dateExpense.getMonth() + 1
      }-${dateExpense.getDate()}`

      await this.dataExpensesService.addExpense(expenseForAdd)
      dateExpense.setMonth(dateExpense.getMonth() + 1)
    }
  }

  async toastSuccess() {
    const toast = await this.toastController.create({
      message: 'Nova despesa cadastrada com sucesso!',
      duration: 1000,
    })
    toast.present()
  }

  private async alertMessageInvalidData() {
    const inputAlert = await this.alertController.create({
      header: 'Erro ao cadastrar, por favor tente novamente',
      buttons: [{ text: 'Ok' }],
    })
    await inputAlert.present()
  }
}
