import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from '../core/interfaces/users.interface';
import { Store, Select } from '@ngxs/store';
import { UserState } from '../core/store/users.state';
import { LoadUsers, ClearUsers } from '../core/store/users.action';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  searchTerm: string = '';

  users$: Observable<IUser[]> = this.store.select(
    UserState.getUsers
  );

  private destroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.store.dispatch(new LoadUsers());
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users$.pipe(takeUntil(this.destroy$)).subscribe((users) => {
      this.users = users ?? [];
      this.filteredUsers = [...this.users];
    });
  }

  onReloadUsers() {
    this.searchTerm = ''
    this.store.dispatch(new LoadUsers());
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}