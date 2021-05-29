import { Platform } from '@ionic/angular'
import { Component } from '@angular/core'
import '@codetrix-studio/capacitor-google-auth'
import { Plugins } from '@capacitor/core'
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loading: any
  public isGoogleLogin = false
  public user = null

  constructor(private fireAuth: AngularFireAuth, private platform: Platform) {
    this.platform.ready().then(() => {
      this.fireAuth.onAuthStateChanged(user => {
        if (user) {
          this.onLoginSuccess(
            this.user?.authentication?.idToken,
            this.user?.authentication?.accessToken,
          )
          this.isGoogleLogin = true
        } else {
          this.isGoogleLogin = false
        }
      })
    })
  }

  async googleSignup() {
    const googleUser = await Plugins.GoogleAuth.signIn()

    if (googleUser) {
      const { idToken, accessToken } = googleUser.authentication
      this.onLoginSuccess(idToken, accessToken)
    }
  }

  onLoginSuccess(idToken: string, accessToken: string) {
    const credential = accessToken
      ? firebase.default.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken,
        )
      : firebase.default.auth.GoogleAuthProvider.credential(idToken)

    this.fireAuth
      .signInWithCredential(credential)
      .then(success => {
        alert('Logado com sucesso')
        this.isGoogleLogin = true
        this.user = success.user
        // this.loading.dismiss()
      })
      .catch(error => alert(`Erro ao logar: ${error}`))
  }

  async logout() {
    this.isGoogleLogin = false
    await Plugins.GoogleAuth.signOut()
  }
}
