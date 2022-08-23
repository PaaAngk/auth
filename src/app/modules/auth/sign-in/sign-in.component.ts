import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, FormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';
import { timer } from 'rxjs';

const latinChars = /^[a-zA-Z]+$/;
export function passwordValidator(field: AbstractControl): Validators | null {
    return field.value && latinChars.test(field.value)
        ? null
        : {
              other: 'Разрешены только цифры и латинские буквы',
          };
}

@Component({
    selector     : 'sign-in',
    templateUrl  : './sign-in.component.html',
    styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit
{
    signInForm: UntypedFormGroup;
    isSubmitting = false;
    errorAlertSubmitting = false;

    constructor(
        private authService: AuthService,
        private formBuilder: UntypedFormBuilder,
        private activatedRoute: ActivatedRoute,
        private router: Router
    )
    {
        // Create the form
        this.signInForm = this.formBuilder.group({
            username     : ['', [Validators.required, Validators.minLength(5)]],
            password  : ['', [Validators.required, passwordValidator]],
            rememberMe: ['']
        });
        
        //
        this.signInForm.valueChanges.subscribe(() => {
            this.signInForm.markAsTouched();
            this.errorAlertSubmitting = false;
        });
    }

    ngOnInit(): void
    {
    }
    
    signIn(): void
    {
        this.isSubmitting = true;
        this.signInForm.disable();
        const credentials = this.signInForm.value;
        this.authService
        .attemptAuth("login", credentials)
        .subscribe(
        (data) => {
            if(data.length == 0){
                this.isSubmitting = false;
                this.signInForm.enable();
                this.errorAlertSubmitting = true;
            }
            else{
                timer(100)
                .pipe(
                    finalize(() => {
                        this.router.navigate(['signed-in-redirect']);
                    })
                )
                .subscribe();
                // console.log("signed-in-redirect")
                // this.router.navigateByUrl('home');
            }
            
        },
        );
    }
}
