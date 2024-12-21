import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule , FormsModule, CommonModule,MatFormFieldModule,MatSelectModule,MatButtonModule,MatProgressSpinnerModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signUpForm: FormGroup | any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  signupPostSuccess = false;
  constructor(public router: Router, private auth: Auth, private firestore: Firestore,private _snackBar: MatSnackBar){}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required , Validators.email]),
      phone: new FormControl('',[Validators.required ,Validators.pattern('^[0-9]*$'), Validators.minLength(11),Validators.maxLength(11)]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(6)]),
    },
    {validators: this.passwordMatchValidator}
  );
  }
  navigateToSignin(){
    this.router.navigate(['login']);
}

  async onSubmit(form: FormGroup) {
    this.signupPostSuccess = true;
    try{
      const {firstName , lastName, email, phone, password, confirmPassword } = form.value;
      if(password !== confirmPassword){
        console.error("Passwords dont match");
        return;
      }
      const userPassword =  await createUserWithEmailAndPassword(this.auth, email, password)
      await setDoc(doc(this.firestore,'Users', userPassword.user.uid),{
            firstName,
            lastName,
            email,
            phone,
            createdAt: new Date(),
            role: 'mananger'
          })
        this._snackBar.open('User Signed Up Successfully!!', 'close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
        this.navigateToSignin();
      }
      catch(err){
        console.error('Error during signup:', err);
      }
      finally{
      this.signupPostSuccess = false;
    }
  }

  passwordMatchValidator:ValidatorFn= (formGroup: AbstractControl):ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    
    return password === confirmPassword ? null : { mismatch: true };
  }
}
