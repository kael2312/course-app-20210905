import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '@app/models/backend';
import { NotificationService } from '@app/services';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { environment } from '@src/environments/environment';
import * as firebase from 'firebase';
import { from, Observable, of, zip } from 'rxjs';
import { switchMap, map, take, catchError, tap } from 'rxjs/operators';
import * as fromActions from './user.actions';
type Action = fromActions.All;

@Injectable({
    providedIn: 'root',
})
export class UserEffects {
    constructor(
        private actions$: Actions,
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private notificationService: NotificationService,
        private router: Router
    ) {}

    @Effect()
    init: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.Types.INIT),
        switchMap(() => this.afAuth.authState.pipe(take(1))),
        switchMap((authState) => {
            if (authState) {
                return this.afs
                    .doc<User>(`users/${authState.uid}`)
                    .valueChanges()
                    .pipe(
                        take(1),
                        map(
                            (user) =>
                                new fromActions.InitAuthorized(
                                    authState.uid,
                                    user || null
                                )
                        ),
                        catchError((err) =>
                            of(new fromActions.InitError(err.message))
                        )
                    );
            } else {
                return of(new fromActions.InitUnAuthorized());
            }
        })
    );

    @Effect()
    signUpEmail: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.Types.SIGN_UP_EMAIL),
        map((action: fromActions.SignUpEmail) => action.payload),
        switchMap((credentials) =>
            from(
                this.afAuth.createUserWithEmailAndPassword(
                    credentials.email,
                    credentials.password
                )
            ).pipe(
                tap((user) => {
                    if (user) {
                        user.user.sendEmailVerification(
                            environment.firebase.actionCodeSetting
                        );
                        this.router.navigate(['/auth/email-confirm']);
                    }
                }),
                map(
                    (signUpState) =>
                        new fromActions.SignUpEmailSuccess(signUpState.user.uid)
                ),
                catchError((error) => {
                    this.notificationService.error(error.message);
                    return of(new fromActions.SignUpEmailError(error.message));
                })
            )
        )
    );

    @Effect()
    signInEmail: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.Types.SIGN_IN_EMAIL),
        map((action: fromActions.SignInEmail) => action.payload),
        switchMap((credentials) =>
            from(
                this.afAuth.signInWithEmailAndPassword(
                    credentials.email,
                    credentials.password
                )
            ).pipe(
                switchMap((signInState) =>
                    this.afs
                        .doc<User>(`users/${signInState.user.uid}`)
                        .valueChanges()
                        .pipe(
                            take(1),
                            map(
                                (user) =>
                                    new fromActions.SignInEmailSuccess(
                                        user.uid,
                                        user || null
                                    )
                            )
                        )
                ),
                catchError((error) => {
                    this.notificationService.error(error.message);
                    return of(new fromActions.SignInEmailError(error.message));
                })
            )
        )
    );

    @Effect()
    signOut: Observable<Action> = this.actions$.pipe(
        ofType(fromActions.Types.SIGN_OUT),
        switchMap((credentials) =>
            from(this.afAuth.signOut()).pipe(
                map(() => new fromActions.SignOut()),
                catchError((error) => {
                    this.notificationService.error(error.message);
                    return of(new fromActions.SignOutError(error.message));
                })
            )
        )
    );
}
