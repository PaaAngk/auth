import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '@core/services';
const latinChars = /^[a-zA-Z]+$/;
 
export function passwordValidator(field: AbstractControl): Validators | null {
    return field.value && latinChars.test(field.value)
        ? null
        : {
              other: 'Разрешены только цифры и латинские буквы',
          };
}


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  //styleUrls: ['./auth.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  isSubmitting = false;
  errorSubmitting = false;
  
  authForm = new FormGroup({  
    "username": new FormControl("", [Validators.required, Validators.minLength(5)]),
    "password": new FormControl("", [Validators.required, passwordValidator]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    this.authForm.valueChanges.subscribe(() => {
      this.authForm.markAsTouched();
      this.errorSubmitting = false;
    });
  }

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;
    
    const credentials = this.authForm.value;
    this.userService
    .attemptAuth("login", credentials)
    .subscribe(
      (data) => {
        if(data.length == 0){
          console.log(data);
          this.isSubmitting = false;
          this.errorSubmitting = true;
        }
        else{
          this.router.navigateByUrl('/');
        }
        
      },
    );
  }
}
