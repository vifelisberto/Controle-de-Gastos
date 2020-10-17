import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  constructor(private menu: MenuController) {}

  closeMenu() {
    this.menu.close()
  }
}
