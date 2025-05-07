import { Component } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { User } from './users-service';
import {
  interval,
  map,
  merge,
  scan,
  startWith,
  Subject,
  switchMap,
  takeWhile,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersFormComponent, UsersTableComponent, AsyncPipe],
  template: `
    <app-user-form (submitEvent)="onUserSubmit($event)" />
    <app-user-table
      [users]="(users$ | async) ?? []"
      (deleteUserEvent)="onUserDelete($event)"
    />
  `,
})
export class HomeComponent {
  private userAdded$ = new Subject<User>();
  private userDeleted$ = new Subject<string>();

  public users$ = merge(
    this.userAdded$.asObservable(),
    this.userDeleted$.asObservable(),
  ).pipe(
    scan((acc, event) => {
      if (typeof event === 'string') {
        return acc.filter((user) => user.uuid !== event);
      }
      return [...acc, event];
    }, [] as User[]),

    switchMap((users) =>
      interval(1000).pipe(
        startWith(0),
        map(() => {
          return users.map(({ accountBalance, ...user }) => ({
            ...user,
            accountBalance: accountBalance + Math.floor(Math.random() * 10000),
          }));
        }),
        takeWhile((users) => users.length > 0, true),
      ),
    ),
  );

  onUserSubmit(user: User) {
    this.userAdded$.next(user);
  }

  onUserDelete(uuid: string) {
    this.userDeleted$.next(uuid);
  }
}
