import { Component } from '@angular/core';

import { UsersFormComponent } from './users-form/users-form.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { User } from './users-service';
import {
  interval,
  map,
  mergeMap,
  scan,
  startWith,
  Subject,
  takeWhile,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private deletedUserUuids = new Set<string>();

  constructor() {
    this.userDeleted$
      .asObservable()
      .pipe(takeUntilDestroyed())
      .subscribe((uuid) => {
        this.deletedUserUuids.add(uuid);
      });
  }

  public users$ = this.userAdded$.asObservable().pipe(
    mergeMap((user) =>
      interval(user.interval).pipe(
        startWith(0),
        map(() => {
          return {
            ...user,
            accountBalance: Math.floor(Math.random() * 10000),
          };
        }),
        takeWhile((user) => !this.deletedUserUuids.has(user.uuid), true),
      ),
    ),
    scan((users, user) => {
      if (this.deletedUserUuids.has(user.uuid)) {
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
