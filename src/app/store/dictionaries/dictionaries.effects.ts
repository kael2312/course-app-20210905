import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    DocumentChangeAction,
} from '@angular/fire/firestore';
import { ControlItem, Item } from '@app/models/frontend';
import { Effect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { Observable, of, zip } from 'rxjs';
import { switchMap, map, take, catchError } from 'rxjs/operators';
import * as fromActions from './dictionaries.actions';
import { Dictionaries, Dictionary } from './dictionaries.models';

type Action = fromActions.All;

const documentToItem = (x: DocumentChangeAction<any>): Item => {
    const data = x.payload.doc.data();
    return {
        id: x.payload.doc.id,
        ...data,
    };
};

const itemToControlItem = (x: Item): ControlItem => {
    return {
        label: x.name,
        value: x.id,
        icon: x.icon,
    };
};

const addDictionary = (x: Item[]): Dictionary => {
    return {
        items: x,
        controlItems: x.map((x) => itemToControlItem(x)),
    };
};

@Injectable()
export class DictionariesEffect {
    constructor(private actions: Actions, private afs: AngularFirestore) {}

    @Effect()
    read: Observable<Action> = this.actions.pipe(
        ofType(fromActions.Types.READ),
        switchMap(() => {
            return zip(
                this.afs
                    .collection('roles')
                    .snapshotChanges()
                    .pipe(
                        take(1),
                        map((items) => items.map((x) => documentToItem(x)))
                    ),
                this.afs
                    .collection('specializations')
                    .snapshotChanges()
                    .pipe(
                        take(1),
                        map((items) => items.map((x) => documentToItem(x)))
                    ),
                this.afs
                    .collection('qualifications')
                    .snapshotChanges()
                    .pipe(
                        take(1),
                        map((items) => items.map((x) => documentToItem(x)))
                    ),
                this.afs
                    .collection('skills')
                    .snapshotChanges()
                    .pipe(
                        take(1),
                        map((items) => items.map((x) => documentToItem(x)))
                    )
            ).pipe(
                map(([roles, specializations, qualifications, skills]) => {
                    const dictionaries: Dictionaries = {
                        roles: addDictionary(roles),
                        qualifications: addDictionary(qualifications),
                        skills: addDictionary(skills),
                        specializations: addDictionary(specializations),
                    };
                    return new fromActions.ReadSuccess(dictionaries);
                }),
                catchError((err) => of(new fromActions.ReadError(err.message)))
            );
        })
    );
}
