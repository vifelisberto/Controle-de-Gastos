import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-modal-create-expense',
  templateUrl: './modal-create-expense.component.html',
  styleUrls: ['./modal-create-expense.component.css'],
})
export class ModalCreateExpenseComponent implements OnInit {
  public expense: FormGroup

  constructor(private formBuilder: FormBuilder, private storage: Storage) {
    this.expense = this.formBuilder.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      dueDate: ['', Validators.required],
    })
  }

  ngOnInit(): void {}

  addNewExpense(event) {
    event.preventDefault()
debugger
    if (this.validExpense()) {
      const monthNewExpense = this.expense.value.dueDate.getMonth()?.toString()

      this.storage.get(monthNewExpense).then(valueStr => {
        let value = JSON.parse(valueStr)

        if (value) {
          value.push(this.expense.value)
        } else {
          value = [this.expense.value]
        }

        this.storage.set(monthNewExpense, JSON.stringify(value))
      })
    } else {
      console.log('Dados inválidos')
    }
  }

  private validExpense = () =>
    this.expense.value.title && this.expense.value.dueDate && this.expense.value
}
