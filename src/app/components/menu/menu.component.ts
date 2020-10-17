import { Component, OnInit } from '@angular/core'
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private menu: MenuController) {}

  openFirst() {
    this.menu.enable(true, 'first')
    this.menu.open('first')
  }

  openEnd() {
    this.menu.open('end')
  }

  openCustom() {
    this.menu.enable(true, 'custom')
    this.menu.open('custom')
  }

  ngOnInit(): void {}
}
