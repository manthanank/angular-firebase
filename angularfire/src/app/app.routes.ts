import { Routes } from '@angular/router';
import { AngularFirestoreComponent } from './angular-firestore/angular-firestore.component';
import { AngularFireDatabaseComponent } from './angular-fire-database/angular-fire-database.component';

export const routes: Routes = [
    {
        path: 'app-angular-firestore', component: AngularFirestoreComponent
    },
    {
        path: 'app-angular-fire-database', component: AngularFireDatabaseComponent
    }
];
