import { AlertController } from '@ionic/angular'
import { Injectable } from '@angular/core'
import {
  Capacitor,
  LocalNotification,
  LocalNotificationActionPerformed,
  Plugins,
} from '@capacitor/core'
const { LocalNotifications } = Plugins

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private alertCtrl: AlertController) {}

  async RequestPermission() {
    if (Capacitor.platform !== 'web') {
      await LocalNotifications.requestPermission()
      this.registerNotificationsTypes()
    }
  }

  async scheduleBasic() {
    if (Capacitor.platform !== 'web') {
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
  }

  async scheduleAvanced() {
    if (Capacitor.platform !== 'web') {
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
  }

  private registerNotificationsTypes() {
    if (Capacitor.platform !== 'web') {
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
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    })
  }
}
