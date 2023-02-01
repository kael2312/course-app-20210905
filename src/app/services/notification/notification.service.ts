import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private snackBar: MatSnackBar) {}

    error(message: string) {
        this.snackBar.openFromComponent(NotificationComponent, {
            duration: 13000,
            data: { message },
            panelClass: ['mat-snackbar_error'],
        });
    }

    success(message: string) {
        this.snackBar.openFromComponent(NotificationComponent, {
            duration: 13000,
            data: { message },
            panelClass: ['mat-snackbar_success'],
        });
    }
}
