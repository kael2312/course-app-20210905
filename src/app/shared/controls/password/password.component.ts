import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
    Component,
    Input,
    OnInit,
    forwardRef,
    Output,
    EventEmitter,
} from '@angular/core';

export type PasswordType = 'password' | 'text';

export const PasswordComponent_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PasswordComponent),
    multi: true,
};

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.scss'],
    providers: [PasswordComponent_VALUE_ACCESSOR],
})
export class PasswordComponent implements OnInit, ControlValueAccessor {
    @Input() placeholder: string;

    @Output() changed = new EventEmitter<string>();

    value: string;
    isDisabled: boolean;
    passwordType: PasswordType;

    constructor() {
        this.passwordType = 'password';
    }

    ngOnInit(): void {}

    private propagateChange: any = () => {};
    private propagateTouched: any = () => {};

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onKeyup(value: string): void {
        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    onBlur(): void {
        this.propagateTouched();
    }

    togglePassword(): void {
        this.passwordType =
            this.passwordType === 'password' ? 'text' : 'password';
    }
}
