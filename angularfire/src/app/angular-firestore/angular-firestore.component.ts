import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/AngularFirestore/data.service';
import { User } from './user.model';
import { map } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-angular-firestore',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './angular-firestore.component.html',
  styleUrl: './angular-firestore.component.scss'
})
export class AngularFirestoreComponent implements OnInit {

  users?: User[];
  User: User = new User();
  submitted = false;

  constructor(private dataService: DataService) { }

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

  addUser() {
    this.dataService.create(this.User).then(() => {
      console.log('Created new item successfully!');
      this.submitted = true;

      // Set submitted to false after 2 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 2000);
    });
  }
}
