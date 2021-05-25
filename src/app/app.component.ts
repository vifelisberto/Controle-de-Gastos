import { DataExpensesService } from 'src/app/services/data-expenses.service'
import { Component } from '@angular/core'
import { Platform } from '@ionic/angular'
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
import { NotificationService } from './services/notification.service'
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
    private dataExpensesService: DataExpensesService,
    private notificationService: NotificationService,
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
    LocalNotifications.requestPermission()

    this.platform.ready().then(() => {
      this.statusBar.styleDefault()
      this.splashScreen.hide()

      this.addListenersNotifications()
    })
  }

  setTitlePage(newTitle: string) {
    const defaultTitle = 'Dr. Cash'

    if (newTitle) this.title = newTitle
    else this.title = defaultTitle
  }

  private addListenersNotifications() {
    if (Capacitor.platform !== 'web') {
      LocalNotifications.addListener(
        'localNotificationReceived',
        (notification: LocalNotification) => {
          console.log('notification received: ', notification)
        },
      )

      LocalNotifications.addListener(
        'localNotificationActionPerformed',
        (notification: LocalNotificationActionPerformed) => {
          switch (notification.actionId) {
            case 'pay':
              this.setPaidExpense(
                notification.notification.extra.data.expenseId,
              )
              break
            case 'reschedule':
              const data = notification.notification.extra.data
              this.rescheduleNotification(
                data.expenseId,
                data.expenseTitle,
                data.expenseDueDate,
                data.expenseValue,
              )
              break
          }
        },
      )
    }
  }

  private setPaidExpense(expenseId: string) {
    this.dataExpensesService.PaidExpense(expenseId).then(() => {
      console.log(`despesa: ${expenseId} marcada como paga`)
      this.router.navigate(['/home'])
    })
  }

  private rescheduleNotification(
    expenseId: string,
    expenseTitle: string,
    expenseDueDate: Date,
    expenseValue: number,
  ) {
    this.notificationService
      .scheduleExpenseExpiration(
        expenseId,
        expenseTitle,
        expenseDueDate,
        expenseValue,
        true,
      )
      .then(() => {
        console.log(`notificação da despesa ${expenseId} reagendada`)
      })
  }
}
