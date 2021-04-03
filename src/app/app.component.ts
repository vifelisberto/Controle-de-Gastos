import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { Component } from '@angular/core'
import { AlertController, Platform } from '@ionic/angular'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import {
  Router,
  Event,
  NavigationStart,
  ActivatedRoute,
  NavigationEnd,
} from '@angular/router'
import {
  Capacitor,
  LocalNotification,
  LocalNotificationActionPerformed,
  Plugins,
} from '@capacitor/core'
import { NOTIFICATION_TYPE } from './services/notification.service'

const { LocalNotifications } = Plugins

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public title: string
  public isHomePage: boolean
  private homeUrl = '/home'

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private dataExpensesService: DataExpensesService,
  ) {
    this.initializeApp()

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.isHomePage = event.url === this.homeUrl
      } else if (event instanceof NavigationEnd) {
        this.setTitlePage(
          this.activatedRoute.firstChild?.snapshot.data['title'],
        )
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      if (Capacitor.platform !== 'web') {
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
              `expense id: ${notification.notification.extra.data.expenseId}`,
            )

            switch (notification.actionId) {
              case 'pay':
                this.setPaidExpense(
                  notification.notification.extra.data.expenseId,
                )
            }
          },
        )
      }
    })
  }

  setTitlePage(newTitle: string) {
    const defaultTitle = 'Controle de Gastos'

    if (newTitle) this.title = newTitle
    else this.title = defaultTitle
  }

  private setPaidExpense(expenseId: string) {
    this.dataExpensesService.PaidExpense(expenseId).then(() => {
      console.log('chamou paid')
      // todo: adiconar tooltip de sucesso
      this.router.navigate(['/home'])
    })
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    })
    alert.present()
  }
}
