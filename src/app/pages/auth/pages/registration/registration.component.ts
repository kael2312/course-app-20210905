import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
    registerForm: FormGroup;
    isLoading$: Observable<boolean>;

    constructor(
        private fb: FormBuilder,
        private store: Store<fromRoot.State>
    ) {}

    ngOnInit(): void {
        this.isLoading$ = this.store.pipe(select(fromUser.getLoading));
        this.initForm();
    }

    initForm() {
        this.registerForm = this.fb.group({
            email: new FormControl(null, {
                updateOn: 'blur',
            }),
            password: new FormControl(''),
        });
    }

    onSubmit() {
        this.store.dispatch(
            new fromUser.SignUpEmail(this.registerForm.getRawValue())
        );
    }
}
