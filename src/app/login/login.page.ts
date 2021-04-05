import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../shared/authentication-service'
import '@codetrix-studio/capacitor-google-auth'
import { Plugins } from '@capacitor/core'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  ngOnInit() {}
  async googleSignup() {
    ;(await Plugins.GoogleAuth.signIn) as any
  }
}
