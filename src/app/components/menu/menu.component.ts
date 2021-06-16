import { AuthenticationService } from './../../shared/authentication-service'
import { Component } from '@angular/core'
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  user: any
  isGoogleLogin = false

  constructor(
    private menu: MenuController,
    private authenticationService: AuthenticationService,
    private authentication: AuthenticationService,
  ) {
    authenticationService.userData.subscribe(user => {
      this.isGoogleLogin = user != null
      this.user = user
    })
  }

  closeMenu() {
    this.menu.close()
  }
  logout = async () => {
    await this.authentication.logout()
    this.menu.close()
  }
}
