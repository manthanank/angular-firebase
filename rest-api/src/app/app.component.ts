import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  firstName?: string,
  lastName?: string
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  users?: User[];
  newUser: User = {};

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.dataService.getUsers().subscribe(
      res => {
        // console.log(res);
        this.users = Object.values(res); // Assuming your data is an object with user IDs
        // console.log(this.users);
      }
    );
  }

  addUser(): void {
    if (this.newUser.firstName && this.newUser.lastName) {
      this.dataService.addUser(this.newUser).subscribe(
        () => {
          console.log('User added successfully');
          this.loadUsers(); // Refresh the user list
          this.newUser = {}; // Clear the form
        },
        error => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      console.warn('Please enter both first name and last name.');
    }
  }
}
