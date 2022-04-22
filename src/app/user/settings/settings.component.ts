import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@core/models';
import { UserService } from '@core/services';


@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  isSubmitting = false;

  settingsForm = new FormGroup({
    "image": new FormControl("", [Validators.required, Validators.minLength(5) ]),
    "username": new FormControl("", [Validators.required, Validators.minLength(5) ]),
    "email": new FormControl("", [Validators.required, Validators.minLength(5) ]),
    "full_name": new FormControl("", [Validators.required, Validators.minLength(5) ]),
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {
    // create form group using the form builder
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;

    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.isSubmitting = false;
        this.cd.markForCheck();
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
