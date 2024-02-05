import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from './models/user.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgIf, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  users?: User[];
  User: User = new User();
  submitted = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.retrieveUsers();
  }

  retrieveUsers() {
    this.dataService.getAll().pipe(
      map(changes =>
        Object.entries(changes).map(([key, value]: [string, any]) => ({
          key: key,
          ...value
        }))
      )
    ).subscribe(data => {
      this.users = data;
      // console.log(this.users);
    });
  }

  addUser(): void {
    this.dataService.addUser(this.User).subscribe(
      () => {
        console.log('Created new item successfully!');
        this.submitted = true;

        // Set submitted to false after 2 seconds
        setTimeout(() => {
          this.submitted = false;
          this.retrieveUsers();
        }, 2000);
      }
    );
  }
}
