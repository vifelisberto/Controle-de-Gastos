import { ExpenseItem } from './../expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Storage } from '@ionic/storage'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-expense',
  templateUrl: './update-expense.component.html',
  styleUrls: ['./update-expense.component.css'],
})

export class UpdateExpenseComponent {
  public itemUpdate: ExpenseItem
  public expense: FormGroup
  public currentPortion: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private storage: Storage, public alertController: AlertController) {
    this.itemUpdate = this.router.getCurrentNavigation().extras.state.data

    this.expense = this.formBuilder.group({
      title: ['', Validators.required],
      value: ['', Validators.required],
      dueDate: ['', Validators.required],
      category: [''],
      repeat: ['', Validators.required]
    })
    this.expense.setValue({ title: this.itemUpdate.title, value: this.itemUpdate.value, dueDate: this.itemUpdate.dueDate.toDateString(), category: this.itemUpdate.category.toString(), repeat: this.itemUpdate.repeat.toString() })
  }

  selectChanged(selectedRepeat) {
    if (selectedRepeat === 'portion') {
      this.inputCustomPortionValue()
    } else {
      this.currentPortion = selectedRepeat;
    };
  };

  async inputCustomPortionValue() {
    const inputAlert = await this.alertController.create({
      header: 'Qual o número de parcelas?',
      inputs: [ { type: 'text', placeholder: 'Parcelas' } ],
      buttons: [ { text: 'Cancelar' }, { text: 'Ok' } ]
    });
    await inputAlert.present();
  };

  
}
