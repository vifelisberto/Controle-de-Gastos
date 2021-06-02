import { AuthenticationService } from './../shared/authentication-service'
import { Component } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loading: any
  public isGoogleLogin = false
  public user = null

  constructor(private authentication: AuthenticationService) {
    authentication.userData.subscribe(user => {
      this.isGoogleLogin = user != null
      this.user = user
    })
  }

  googleSignup = async () => await this.authentication.googleSignup()
  logout = async () => await this.authentication.logout()
}
