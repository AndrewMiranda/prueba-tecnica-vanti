import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUsers: IUser[] = [
    { id: 1, name: 'Juan Pérez', email: 'juanperez@example.com' },
    { id: 2, name: 'Ana López', email: 'analopes@example.com' },
    { id: 3, name: 'Carlos Sánchez', email: 'carlossanchez@example.com' }
  ];

  constructor() {}

  getUsers(): Observable<IUser[]> {
    let modifiedUsers = [...this.baseUsers];

    modifiedUsers = modifiedUsers.map(user => ({
      ...user,
      name: `${user.name} ${this.randomSuffix()}`,
      email: `${this.randomEmail(user.email)}`
    }));

    if (Math.random() > 0.5) {
      modifiedUsers = this.addRandomUser(modifiedUsers);
    } else {
      modifiedUsers = this.removeRandomUser(modifiedUsers);
    }

    return of(modifiedUsers);
  }

  private randomSuffix(): string {
    const suffixes = ['Jr.', 'Sr.', 'III', 'IV', 'V'];
    return suffixes[Math.floor(Math.random() * suffixes.length)];
  }

  private randomEmail(name: string): string {
    const domains = ['@gmail.com', '@yahoo.com', '@outlook.com'];
    const randomDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${name.replace(' ', '').toLowerCase()}${Math.floor(Math.random() * 100)}${randomDomain}`;
  }

  private addRandomUser(users: IUser[]): IUser[] {
    const newUser: IUser = {
      id: users.length + 1, 
      name: `Nuevo Usuario ${Math.floor(Math.random() * 1000)}`,
      email: `nuevo${Math.floor(Math.random() * 1000)}@example.com`
    };
    users.push(newUser);
    return users;
  }

  private removeRandomUser(users: IUser[]): IUser[] {
    const index = Math.floor(Math.random() * users.length);
    users.splice(index, 1);
    return users;
  }
}
