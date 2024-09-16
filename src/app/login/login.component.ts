import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatProgressSpinnerModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm:FormGroup | any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  loginSuccess = false;
  constructor(public router: Router,  private auth: Auth,private _snackBar: MatSnackBar
  ){}
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required , Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(7)]),
    });
    console.log(this.loginForm)
  }
  navigateToSignup(){
    this.router.navigate(['signup']);
  }

  login(loginForm:FormGroup){
    this.loginSuccess = true;
    signInWithEmailAndPassword(this.auth,loginForm.value.email,loginForm.value.password)
    .then((userCredential) => {
      // User signed in successfully, navigate to dashboard
      this._snackBar.open('Signed in successfully!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['custom-snackbar'],
      });
      this.router.navigate(['/']);
      this.loginSuccess = false;
    })
    .catch((error) => {
      this._snackBar.open('Incorrect Username or Password!', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass: ['error-snackbar'],
      });
      this.loginSuccess = false;
    });
  }
}
