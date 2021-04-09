import { Injectable } from '@angular/core'
import { Capacitor, Plugins } from '@capacitor/core'
const { LocalNotifications } = Plugins
import * as moment from 'moment'
moment.locale('pt')

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  async RequestPermission() {
    if (this.platformAccepted()) {
      await LocalNotifications.requestPermission()
      this.registerNotificationsTypes()
    }
  }

  async scheduleExpenseExpirationNotification(
    expenseId: string,
    expenseTitle: string,
    expenseDueDate: Date,
    expenseValue: number,
  ) {
    if (this.platformAccepted()) {
      const formattedDueDate = moment(expenseDueDate).format('DD/MMM/YYYY')
      const scheduleDate = moment(expenseDueDate).add(-1, 'd').toDate()

      const notification = {
        id: Number(expenseId.replace(/\D/g, '')),
        title: `Sua despesa com ${expenseTitle} está próxima do vencimento`,
        body: `Não esqueça de efetuar o pagamento de R$${expenseValue} até ${formattedDueDate}`,
        extra: {
          data: { expenseId, expenseTitle, expenseDueDate, expenseValue },
        },
        actionTypeId: NOTIFICATION_TYPE.EXPENSE_EXPIRATION,
        schedule: { at: scheduleDate },
      }

      await LocalNotifications.schedule({ notifications: [notification] })

      console.log(
        'notificação da despesa: ',
        expenseId,
        ' agendada para: ',
        scheduleDate,
      )
    }
  }

  async scheduleExpenseExpirationNotificationRescheduled(
    expenseId: string,
    expenseTitle: string,
    expenseDueDate: Date,
    expenseValue: number,
  ) {
    if (this.platformAccepted()) {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(),
            title: `Sua despesa com ${expenseTitle} vence hoje`,
            body: `Não esqueça de efetuar o pagamento de R$${expenseValue}`,
            extra: {
              data: { expenseId },
            },
            actionTypeId: NOTIFICATION_TYPE.EXPENSE_SIMPLE,
            schedule: { at: expenseDueDate },
          },
        ],
      })
    }
  }

  // async scheduleAvanced() {
  //   if (this.platformAccepted()) {
  //     await LocalNotifications.schedule({
  //       notifications: [
  //         {
  //           title: 'PAGA A CONTA PARCEIRO',
  //           body: 'Join the Ionic Academy',
  //           id: 2,
  //           extra: {
  //             data: 'Pass data to yout handler',
  //           },
  //           iconColor: '#0000FF',
  //           actionTypeId: NOTIFICATION_TYPE.EXPENSE_EXPIRATION,
  //           attachments: [
  //             { id: 'face', url: 'res://public/assets/image/dolar_user.png' },
  //           ],
  //           schedule: { at: new Date(Date.now() + 1000 * 3) },
  //         },
  //       ],
  //     })
  //   }
  // }

  private registerNotificationsTypes() {
    if (this.platformAccepted()) {
      LocalNotifications.registerActionTypes({
        types: [
          {
            id: NOTIFICATION_TYPE.EXPENSE_EXPIRATION,
            actions: [
              { id: 'pay', title: 'Pago', destructive: true },
              {
                id: 'reschedule',
                title: 'Notificar novamente',
                destructive: true,
              },
            ],
          },
          {
            id: NOTIFICATION_TYPE.EXPENSE_SIMPLE,
            actions: [{ id: 'pay', title: 'Pago', destructive: true }],
          },
        ],
      })
    }
  }

  private platformAccepted = () => Capacitor.platform !== 'web'
}

export enum NOTIFICATION_TYPE {
  EXPENSE_EXPIRATION = 'EXPENSE_EXPIRATION',
  EXPENSE_OVERDUE = 'EXPENSE_OVERDUE',
  EXPENSE_SIMPLE = 'EXPENSE_SIMPLE',
}
