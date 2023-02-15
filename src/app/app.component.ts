import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUser from './store/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private store: Store<fromRoot.State>) {}

    ngOnInit(): void {
        this.store.dispatch(new fromUser.Init());
        this.store.dispatch(new fromDictionaries.Read());
    }
    title = 'course-app';
}
