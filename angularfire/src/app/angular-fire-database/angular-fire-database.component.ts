import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { DataService } from '../services/AngularFireDatabase/data.service';
import { User } from './user.model';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-angular-fire-database',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './angular-fire-database.component.html',
  styleUrl: './angular-fire-database.component.scss'
})
export class AngularFireDatabaseComponent implements OnInit {

  users?: User[];
  User: User = new User();
  submitted = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers(): void {
    this.dataService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
      // console.log(this.users);
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
