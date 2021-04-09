import { Injectable } from '@angular/core'
import {
  Capacitor,
  LocalNotification,
  LocalNotificationRequest,
  Plugins,
} from '@capacitor/core'
const { LocalNotifications } = Plugins
import * as moment from 'moment'
moment.locale('pt')

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {
    LocalNotifications.requestPermission().then(() =>
      this.registerNotificationTypes(),
    )
  }

  async scheduleExpenseExpiration(
    expenseId: string,
    expenseTitle: string,
    expenseDueDate: Date,
    expenseValue: number,
    reschedule: boolean = false,
  ) {
    const formattedDueDate = moment(expenseDueDate).format('DD/MMM/YYYY')
    const scheduleDate = reschedule
      ? expenseDueDate
      : moment(expenseDueDate).add(-1, 'd').toDate()
    const notificationId = this.getOnlyNumbers(expenseId)

    this.scheduleNotification({
      id: notificationId + Math.random(),
      title: `Sua despesa com ${expenseTitle} está próxima do vencimento ${Math.random()}`,
      body: `Não esqueça de efetuar o pagamento de R$${expenseValue} até ${formattedDueDate}`,
      extra: {
        data: { expenseId, expenseTitle, expenseDueDate, expenseValue },
      },
      actionTypeId: NOTIFICATION_TYPE.EXPENSE_EXPIRATION.toString(),
      schedule: { at: scheduleDate },
    })

    console.log(
      `Notificação da despesa: ${expenseId} agendada para: ${scheduleDate}`,
    )
  }

  async cancelNotificationScheduleByExpenseId(expenseId: string) {
    const notifications: LocalNotificationRequest[] = [
      { id: `${this.getOnlyNumbers(expenseId)}` },
    ]
    await LocalNotifications.cancel({ notifications })

    console.log(`Notificação da despesa: ${expenseId} cancelada`)
  }

  private async scheduleNotification(notification: LocalNotification) {
    if (this.platformAccepted())
      await LocalNotifications.schedule({ notifications: [notification] })
  }

  private registerNotificationTypes() {
    if (this.platformAccepted()) {
      LocalNotifications.registerActionTypes({
        types: [
          {
            id: NOTIFICATION_TYPE.EXPENSE_EXPIRATION.toString(),
            actions: [
              { id: 'pay', title: 'Pago', destructive: true },
              {
                id: 'reschedule',
                title: 'Notificar novamente',
                destructive: true,
              },
            ],
          },
        ],
      })
    }
  }

  private getOnlyNumbers = (text: string) => Number(text.replace(/\D/g, ''))

  private platformAccepted() {
    if (Capacitor.platform === 'web')
      throw new Error('Plataforma não suportada')

    return true
  }
}

export enum NOTIFICATION_TYPE {
  EXPENSE_EXPIRATION,
  EXPENSE_OVERDUE,
}
