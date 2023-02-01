import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import {
    Component,
    Input,
    OnInit,
    forwardRef,
    EventEmitter,
    Output,
} from '@angular/core';
import { ControlItem, Value } from '@app/models/frontend';
import { MatSelectChange } from '@angular/material/select';

export const SelectComponent_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true,
};

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    providers: [SelectComponent_VALUE_ACCESSOR],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
    @Input() items: ControlItem[];
    @Input() placeholder: string;
    @Output() changed: EventEmitter<Value> = new EventEmitter<Value>();

    value: Value;
    isDisabled: boolean;

    private propagateChange: any = () => {};
    private propagateTouched: any = () => {};

    writeValue(value: Value): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.propagateTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onBlur(): void {
        this.propagateChange();
    }

    onChanged(event: MatSelectChange) {
        const value = event.value ? event.value : null;
        this.value = value;
        this.propagateChange(value);
        this.changed.emit(value);
    }

    ngOnInit(): void {}
}
