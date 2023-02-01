import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private afs: AngularFirestore) {}

    ngOnInit(): void {
        // this.afs.collection('roles').snapshotChanges()
        //             .pipe(take(1))
        this.afs
            .collection('roles')
            .snapshotChanges()
            .subscribe((data) => {
                console.log(data.map((x) => x.payload.doc));
            });
    }
    title = 'course-app';
}
