import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css'],
})
export class CreateExpenseComponent {
  public expense: FormGroup
  public currentPortion: string

  constructor(
    private formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.expense = this.formBuilder.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      dueDate: ['', Validators.required],
      category: [''],
      repeat: [''],
    })
  }

  selectChanged(selectedRepeat) {
    if (selectedRepeat === 'portion') {
      this.inputCustomPortionValue()
    } else {
      this.currentPortion = selectedRepeat
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

  addNewExpense(event) {
    event.preventDefault()

    // if (this.validExpense()) {
    //   const monthNewExpense = this.expense.value.dueDate.getMonth()?.toString()

    //   this.storage.get(monthNewExpense).then(valueStr => {
    //     let value = JSON.parse(valueStr)

    //     if (value) {
    //       value.push(this.expense.value)
    //     } else {
    //       value = [this.expense.value]
    //     }

    //     this.storage.set(monthNewExpense, JSON.stringify(value))
    //   })
    // } else {
    //   console.log('Dados inválidos')
    // }
  }

  private validExpense = () =>
    this.expense.value.title && this.expense.value.dueDate && this.expense.value
}
