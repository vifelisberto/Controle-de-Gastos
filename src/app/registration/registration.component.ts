import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthenticationService } from '../shared/authentication-service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  ngOnInit(): void {}

  async signUp(email, password) {
    this.authService
      .RegisterUser(email.value, password.value)
      .then(res => {
        // Do something here
        this.authService.SendVerificationMail()
        this.router.navigate(['verify-email'])
      })
      .catch(error => {
        window.alert(error.message)
      })
  }
}
