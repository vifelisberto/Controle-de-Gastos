import { User } from './user'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/auth'
import { Plugins } from '@capacitor/core'
import * as firebase from 'firebase'
import { BehaviorSubject } from 'rxjs'
import '@codetrix-studio/capacitor-google-auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Storage } from '@ionic/storage'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData = new BehaviorSubject(null)
  private readonly keyData = 'ControlExpenses'

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private fireStore: AngularFirestore,
    private storage: Storage,
  ) {
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

  private setUserData(userData: firebase.default.User) {
    localStorage.setItem('user', JSON.stringify(userData))

    this.userData.next(userData)

    if (userData !== null) {
      this.storage.get(this.keyData).then(data => {
        const userDoc = this.fireStore.doc(`user/${userData.uid}`)

        userDoc.set({
          uuid: userData.uid,
          birthDate: null,
          city: null,
          state: null,
          contry: null,
          salaryRange: 1,
          dataExpenses: data,
        } as User)
      })

      this.router.navigate(['home'])
    }
  }

  private getUserData = () => JSON.parse(localStorage.getItem('user'))
}
