import { Component } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { User } from './users-service';
import {
  endWith,
  filter,
  interval,
  map,
  mergeMap,
  scan,
  startWith,
  Subject,
  takeUntil,
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

  public users$ = this.userAdded$.asObservable().pipe(
    mergeMap((user) =>
      interval(user.interval).pipe(
        startWith(0),
        map(() => ({
          ...user,
          accountBalance: Math.floor(Math.random() * 10000),
        })),
        takeUntil(
          this.userDeleted$
            .asObservable()
            .pipe(filter((uuid) => uuid === user.uuid)),
        ),
        endWith({
          ...user,
          deleted: true,
        }),
      ),
    ),
    scan((users, user) => {
      if (user.deleted) {
        return users.filter(({ uuid }) => user.uuid !== uuid);
      }

      const index = users.findIndex((u) => u.uuid === user.uuid);

      if (index > -1) {
        const updated = [...users];
        updated[index] = user;
        return updated;
      }

      return [...users, user];
    }, [] as User[]),
  );

  onUserSubmit(user: User) {
    this.userAdded$.next(user);
  }

  onUserDelete(uuid: string) {
    this.userDeleted$.next(uuid);
  }
}
