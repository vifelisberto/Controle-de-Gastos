import { Component } from '@angular/core'
import { ToastController } from '@ionic/angular'
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
})
export class ConfigComponent {
  public overdue = true
  public notOverdue = true
  constructor(public toastController: ToastController) {}

  async expenseNotification(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    })
    toast.present()
  }

  async changeOverdueNotification() {
    const messageOverdue = `Contas vencidas ${
      this.overdue ? '' : 'não'
    } serão notificadas.`
    await this.expenseNotification(messageOverdue)
  }

  async changeNotOverdueNotification() {
    const messageOverdue = `Contas proximas a vencer ${
      this.notOverdue ? '' : 'não'
    } serão notificadas.`
    await this.expenseNotification(messageOverdue)
  }
}
