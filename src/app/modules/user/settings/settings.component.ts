import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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

  settingsForm = new UntypedFormGroup({
    "image": new UntypedFormControl("", [Validators.required, Validators.minLength(5) ]),
    "username": new UntypedFormControl("", [Validators.required, Validators.minLength(5) ]),
    "email": new UntypedFormControl("", [Validators.required, Validators.minLength(5) ]),
    "full_name": new UntypedFormControl("", [Validators.required, Validators.minLength(5) ]),
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
