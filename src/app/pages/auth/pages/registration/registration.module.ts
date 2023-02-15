import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
    ButtonModule,
    FormFieldModule,
    InputModule,
    PasswordModule,
} from '@app/shared';
import { SpinnerModule } from '@app/shared/indicators/spinner/spinner.module';

@NgModule({
    declarations: [RegistrationComponent],
    imports: [
        CommonModule,
        RegistrationRoutingModule,
        ReactiveFormsModule,
        ButtonModule,
        FormFieldModule,
        SpinnerModule,
        PasswordModule,
        InputModule,
    ],
})
export class RegistrationModule {}
