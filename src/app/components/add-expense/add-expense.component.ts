import { ModalCreateExpenseComponent } from './../modal-create-expense/modal-create-expense.component'
import { ExpenseItem } from './../expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { ModalController } from '@ionic/angular'
import { IonRouterOutlet } from '@ionic/angular'

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  public expense: ExpenseItem

  constructor(
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {}

  ngOnInit(): void {}

  async openModalNewExpense() {
    const modal = await this.modalController.create({
      component: ModalCreateExpenseComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    })
    await modal.present()
  }
}
