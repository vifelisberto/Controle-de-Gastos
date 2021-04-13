import { Component } from '@angular/core'
import '@codetrix-studio/capacitor-google-auth'
import { Plugins } from '@capacitor/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  userInfo = null

  constructor() {}
  async googleSignup() {
    const googleUser = await Plugins.GoogleAuth.signIn()
    console.log('my user: ', googleUser)
    this.userInfo = googleUser
  }
}
