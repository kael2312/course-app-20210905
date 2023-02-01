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

export const CheckBoxes_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxesComponent),
    multi: true,
};

@Component({
    selector: 'app-checkboxes',
    templateUrl: './checkboxes.component.html',
    styleUrls: ['./checkboxes.component.scss'],
    providers: [CheckBoxes_VALUE_ACCESSOR],
})
export class CheckboxesComponent implements OnInit, ControlValueAccessor {
    @Input() items: ControlItem[];
    @Output() changed = new EventEmitter<Value[]>();

    value: Value[];
    isDisabled: boolean;

    private propagateChange: any = () => {};

    ngOnInit(): void {}

    writeValue(value: Value[]): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {}

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onChanged(value: Value, checked: boolean) {
        const selected = this.getSelected(value, checked);
        this.value = selected;
        this.propagateChange(selected);
        this.changed.emit(selected);
    }

    private getSelected(value: Value, checked: boolean): Value[] {
        const selected: Value[] = this.value ? [...this.value] : [];
        if (checked) {
            if (!selected.includes(value)) {
                selected.push(value);
            }
        } else {
            const index = selected.indexOf(value);
            selected.splice(index, 1);
        }

        return selected.length ? selected : null;
    }

    isChecked(value: Value): boolean {
        return this.value && this.value.includes(value);
    }
}
