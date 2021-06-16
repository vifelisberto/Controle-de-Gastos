import { ExpenseItem } from './../expense-items/expense-item'
import { MonthYear } from './../month-year-select/month-year'
import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActionSheetController, AlertController } from '@ionic/angular'
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
  public categoryData: { text: string; icon: string }

  constructor(
    public alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private dataExpensesService: DataExpensesService,
    private toastController: ToastController,
    public actionSheetController: ActionSheetController,
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
    const dateExpense = new Date(expense.dueDate)

    for (let i = 1; i <= qtyPortion; i++) {
      const expenseForAdd = { ...expense }
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

  async presentActionSheet() {
    const buttons = [
      {
        text: 'Moradia',
        role: '1',
        icon: 'home-outline',
        handler: () => {
          console.log('Delete clicked')
        },
      },
      {
        text: 'Supermercado',
        role: '2',
        icon: 'storefront-outline',
        handler: () => {
          console.log('Share clicked')
        },
      },
      {
        text: 'TV / Internet / Telefone',
        role: '3',
        icon: 'caret-forward-circle',
        handler: () => {
          console.log('Play clicked')
        },
      },
      {
        text: 'Transporte',
        role: '4',
        icon: 'car-sport-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Lazer',
        role: '5',
        icon: 'bicycle-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Saúde e Beleza',
        role: '6',
        icon: 'body-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Lanches',
        role: '7',
        icon: 'fast-food-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Roupas',
        role: '8',
        icon: 'shirt-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Educação',
        role: '9',
        icon: 'school-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Bares',
        role: '10',
        icon: 'beer-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Jantar',
        role: '11',
        icon: 'restaurant-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Outros',
        role: '12',
        icon: 'cart-outline',
        handler: () => {
          console.log('Favorite clicked')
        },
      },
      {
        text: 'Fechar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked')
        },
      },
    ]

    const actionSheet = await this.actionSheetController.create({
      header: 'Categorias',
      cssClass: 'my-custom-class',
      animated: true,
      buttons,
    })
    await actionSheet.present()

    const { role } = await actionSheet.onDidDismiss()
    console.log('Categoria selecionada', role)

    if (role) {
      this.expense.controls['category'].setValue(role)
      const categorySelected = buttons[+role - 1]

      this.categoryData = {
        text: categorySelected.text,
        icon: categorySelected.icon,
      }
    }
  }
}
