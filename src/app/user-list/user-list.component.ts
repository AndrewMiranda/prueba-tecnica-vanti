import { Component, OnInit } from '@angular/core';
import { IUser } from '../core/interfaces/users.interface';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchTerm: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers(); 
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.filteredUsers = data;
    });
  }

  onReloadUsers() {
    this.loadUsers();
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter(
        (user) =>
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
