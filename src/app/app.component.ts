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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public title
  public isHomePage: boolean
  private homeUrl = '/home'

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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
    })
  }

  setTitlePage(newTitle: string) {
    const defaultTitle = 'Controle de Gastos'

    if (newTitle) this.title = newTitle
    else this.title = defaultTitle
  }
}
