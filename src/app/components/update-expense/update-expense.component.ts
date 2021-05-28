import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { ExpenseItem } from './../expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import {
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular'
import { repeat } from 'src/app/services/repeat'

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css'],
})
export class UpdateExpenseComponent implements OnInit {
  public itemUpdate: ExpenseItem
  public currentPortion: string
  public categoryData: { text: string; icon: string }

  public expense = this.formBuilder.group({
    id: ['', Validators.required],
    title: ['', Validators.required],
    value: ['', Validators.required],
    dueDate: ['', Validators.required],
    category: [''],
    repeat: ['', Validators.required],
  })

  buttons = [
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

  constructor(
    public alertController: AlertController,
    private dataExpensesService: DataExpensesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController,
    public actionSheetController: ActionSheetController,
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

      const categorySelected = this.buttons[+this.itemUpdate.category - 1]

      this.categoryData = {
        text: categorySelected.text,
        icon: categorySelected.icon,
      }
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
      if (await this.dataExpensesService.updateExpense(this.expense.value)) {
        this.toastSuccess()
        this.router.navigate(['/home'])
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Categorias',
      cssClass: 'my-custom-class',
      animated: true,
      buttons: this.buttons,
    })
    await actionSheet.present()

    const { role } = await actionSheet.onDidDismiss()
    console.log('Categoria selecionada', role)

    if (role) {
      this.expense.controls['category'].setValue(role)
      const categorySelected = this.buttons[+role - 1]

      this.categoryData = {
        text: categorySelected.text,
        icon: categorySelected.icon,
      }
    }
  }
}
