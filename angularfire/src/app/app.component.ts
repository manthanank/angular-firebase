import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataService } from './services/data.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
interface User {
  id?: string,
  firstName?: string,
  lastName?: string
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, AngularFirestoreModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  users?: User[];
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
      // console.log(this.items);
    });
  }
}
