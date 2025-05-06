import { Component } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { User } from './users-service';
import { BehaviorSubject, interval, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersFormComponent, UsersTableComponent],
  template: `
    <app-user-form (submitEvent)="onUserSubmit($event)" />
    <app-user-table
      [users$]="users$"
      (deleteUserEvent)="onUserDelete($event)"
    />
  `,
})
export class HomeComponent {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable().pipe(
    switchMap((users) =>
      interval(1000).pipe(
        startWith(users),
        map(() => {
          return users.map(({ accountBalance, ...user }) => ({
            ...user,
            accountBalance: accountBalance + Math.floor(Math.random() * 10000),
          }));
        }),
      ),
    ),
  );

  onUserSubmit(user: User) {
    this.usersSubject.next([...this.usersSubject.value, user]);
  }

  onUserDelete(uuid: string) {
    this.usersSubject.next(
      this.usersSubject.value.filter((user) => user.uuid !== uuid),
    );
  }
}
