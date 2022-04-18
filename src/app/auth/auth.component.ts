import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  errors: Errors = {errors: {}};
  isSubmitting = false;

  authForm = new FormGroup({  
    "login": new FormControl("", [Validators.required, Validators.minLength(5) ]),
    "password": new FormControl("", [Validators.required]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    
  }
  

  ngOnInit() {
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth("login", credentials)
    .subscribe(
      () => this.router.navigateByUrl('/'),
    );
  }
}
