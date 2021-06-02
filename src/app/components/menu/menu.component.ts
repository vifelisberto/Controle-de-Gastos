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

  constructor(
    private menu: MenuController,
    private authenticationService: AuthenticationService,
  ) {
    authenticationService.userData.subscribe(user => (this.user = user))
  }

  closeMenu() {
    this.menu.close()
  }
}
