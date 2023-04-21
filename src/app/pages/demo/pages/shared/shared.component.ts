import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlItem } from '@app/models/frontend';
import { NotificationService } from '@app/services';
import { markFormGroupTouched } from '@app/shared';

@Component({
    selector: 'app-shared',
    templateUrl: './shared.component.html',
    styleUrls: ['./shared.component.scss'],
})
export class SharedComponent implements OnInit {
    formGroup: FormGroup;
    isInline: boolean = true;
    items: ControlItem[];
    showSpinner: boolean = false;

    constructor(
        private fb: FormBuilder,
        private notificationService: NotificationService
    ) {
        this.items = [
            { label: 'First', value: 1 },
            { label: 'Second', value: 2 },
            { label: 'Third', value: 3 },
            { label: 'Fourth', value: 4 },
            { label: 'Fifth', value: 5 },
        ];
    }

    ngOnInit(): void {
        this.formGroup = this.fb.group({
            input: [
                null,
                {
                    updateOn: 'blur',
                    validators: [Validators.required, Validators.minLength(3)],
                },
            ],
            password: [
                null,
                {
                    updateOn: 'blur',
                    validators: [Validators.required],
                },
            ],
            select: [
                null,
                {
                    updateOn: 'change',
                    validators: [Validators.required],
                },
            ],
            checkboxes: [
                null,
                {
                    updateOn: 'change',
                    validators: [Validators.required],
                },
            ],
            radios: [
                null,
                {
                    updateOn: 'change',
                    validators: [Validators.required],
                },
            ],
            date: [
                null,
                {
                    updateOn: 'blur',
                    validators: [Validators.required],
                },
            ],
            dateRange: [
                null,
                {
                    updateOn: 'blur',
                    validators: [Validators.required],
                },
            ],
        });
    }

    onPatchValue(): void {
        this.formGroup.patchValue({
            input: 123,
            password: 'qwerty',
            autocomplete: 1,
            select: 2,
            checkboxes: [3],
            radios: 4,
            date: new Date().getTime(),
            dateRange: {
                from: new Date(2019, 5, 10).getTime(),
                to: new Date(2019, 5, 25).getTime(),
            },
        });
    }

    onToggleInline(): void {
        this.isInline = !this.isInline;
    }

    onToggleDisable(): void {
        if (this.formGroup.enabled) {
            this.formGroup.disable();
        } else {
            this.formGroup.enable();
        }
    }

    onSubmit() {
        if (!this.formGroup.valid) {
            markFormGroupTouched(this.formGroup);
        } else {
            console.log(this.formGroup.getRawValue());
        }
    }

    onToggleSnippet() {
        this.showSpinner = !this.showSpinner;
    }

    onShowError() {
        this.notificationService.error('Everything is fine !');
    }

    onShowSuccess() {
        this.notificationService.success('Op! Something wrong');
    }
}
