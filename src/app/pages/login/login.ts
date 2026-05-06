import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/NotificationService';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {


  loginData={
    email:"",
    password:"",
  }


  private userService= inject(UserService) ;
  private auth= inject(Auth)
  private notification= inject(NotificationService)


  onSubmit(form: NgForm) {
    if (form.valid) {
      this.userService.getUsers().subscribe(users => {

        const user = users.find(u =>
        u.email === this.loginData.email &&
        u.password === this.loginData.password
        );
        if (user) {
          this.auth.login(user);
          this.notification.success('Login success');
        }else {
          this.notification.error('Error Login');
        }
      })
    }
  }
}
