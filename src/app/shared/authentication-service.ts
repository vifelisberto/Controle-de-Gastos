import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { Plugins } from '@capacitor/core'
import * as firebase from 'firebase'
import { BehaviorSubject } from 'rxjs'
import '@codetrix-studio/capacitor-google-auth'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData = new BehaviorSubject(null)

  constructor(public fireAuth: AngularFireAuth, public router: Router) {
    this.fireAuth.authState.subscribe(user =>
      user ? this.setUserData(user) : this.setUserData(null),
    )
  }

  onLoginSuccess(idToken: string, accessToken?: string) {
    const credential = accessToken
      ? firebase.default.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken,
        )
      : firebase.default.auth.GoogleAuthProvider.credential(idToken)

    this.fireAuth
      .signInWithCredential(credential)
      .then(success => this.setUserData(success.user))
      .catch(error => alert(`Erro ao logar: ${error}`))
  }

  async googleSignup() {
    const googleUser = await Plugins.GoogleAuth.signIn()

    if (googleUser) {
      const { idToken, accessToken } = googleUser.authentication
      this.onLoginSuccess(idToken, accessToken)
    }
  }

  async logout() {
    await this.fireAuth.signOut()
    await Plugins.GoogleAuth.signOut()
    localStorage.removeItem('user')

    this.router.navigate(['login'])
  }

  private setUserData(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData))

    this.userData.next(userData)

    if (userData !== null) {
      this.router.navigate(['home'])
    }
  }

  private getUserData = () => JSON.parse(localStorage.getItem('user'))
}
