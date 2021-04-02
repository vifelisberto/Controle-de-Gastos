import { AlertController, Platform } from '@ionic/angular'
import { MonthYear } from './../components/month-year-select/month-year'
import { DataExpensesService } from '../services/data-expenses.service'
import { ExpenseItem } from './../components/expense-items/expense-item'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
// import {
//   ELocalNotificationTriggerUnit,
//   LocalNotifications,
// } from '@ionic-native/local-notifications/ngx'

import {
  LocalNotification,
  LocalNotificationActionPerformed,
  Plugins,
} from '@capacitor/core'
const { LocalNotifications } = Plugins

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePageComponent implements OnInit {
  public monthYearSelect: MonthYear
  public expenses: ExpenseItem[]
  public scheduled = []

  constructor(
    private router: Router,
    private dataService: DataExpensesService,
    private plt: Platform,
    private alertCtrl: AlertController,
  ) {}

  async ngOnInit() {
    await LocalNotifications.requestPermission()

    // LocalNotifications.registerActionTypes({
    //   types: [
    //     {
    //       id: 'CHAT_MSG',
    //       actions: [
    //         { id: 'view', title: 'Open Chat' },
    //         { id: 'remove', title: 'Dismiss', destructive: true },
    //         { id: 'responde', title: 'Responde', input: true },
    //       ],
    //     },
    //   ],
    // })
  }

  async getExpensesMonth(monthYear: MonthYear) {
    this.monthYearSelect = monthYear
    this.expenses =
      (await this.dataService.getExpensesByMonthAndYear(monthYear)) || []
  }

  createExpensePage = () =>
    this.router.navigate(['/create'], { state: { data: this.monthYearSelect } })

  getSumAllExpenses() {
    if (this.expenses) {
      return this.expenses
        ?.filter(expense => expense.value)
        ?.reduce((sum, x) => sum + x.value, 0.0)
    }

    return 0.0
  }

  async scheduleBasic() {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Agendada!',
          body: 'Teste Notificacao',
          extra: {
            data: 'Dado no header',
          },
          iconColor: '#0000FF',
        },
      ],
    })

    LocalNotifications.addListener(
      'localNotificationReceived',
      (notification: LocalNotification) => {
        this.presentAlert(
          `Received': ${notification.title}`,
          `Custom Data: ${JSON.stringify(notification.extra)}`,
        )
      },
    )

    LocalNotifications.addListener(
      'localNotificationActionPerformed',
      (notification: LocalNotificationActionPerformed) => {
        this.presentAlert(
          `Perfomed': ${notification.actionId}`,
          `Input value: ${JSON.stringify(notification.inputValue)}`,
        )
      },
    )
  }

  async scheduleAvanced() {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'PAGA A CONTA PARCEIRO',
          body: 'Join the Ionic Academy',
          id: 2,
          extra: {
            data: 'Pass data to yout handler',
          },
          iconColor: '#0000FF',
          actionTypeId: 'CHAT_MSG',
          attachments: [
            { id: 'face', url: 'res://public/assets/image/dolar_user.png' },
          ],
          schedule: { at: new Date(Date.now() + 1000 * 3) },
        },
      ],
    })
  }

  showAlert(header, sub, msg) {
    this.alertCtrl
      .create({
        header,
        subHeader: sub,
        message: msg,
        buttons: ['OK'],
      })
      .then(alert => alert.present())
  }

  async presentAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    })
  }
}
