import { Injectable } from '@angular/core';
import { User } from './user';
import {
  endWith,
  filter,
  groupBy,
  interval,
  map,
  merge,
  mergeMap,
  Observable,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const applyUserState = (users: Map<string, User>, user: User) => {
  if (user.deleted) {
    users.delete(user.uuid);
  } else {
    users.set(user.uuid, user);
  }

  return users;
};

const getUserBalanceUpdate$ =
  (userDeleted$: Observable<string>) => (user: User) =>
    interval(user.interval).pipe(
      startWith(0),
      map(() => {
        return {
          ...user,
          accountBalance: Math.floor(Math.random() * 10000),
        };
      }),
      takeUntil(userDeleted$.pipe(filter((uuid) => uuid === user.uuid))),
      endWith({
        ...user,
        deleted: true,
      }),
    );

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userAdded$ = new Subject<User>();
  private userEdited$ = new Subject<User>();
  private userDeleted$ = new Subject<string>();
  private usersChange$ = merge(
    this.userAdded$.asObservable(),
    this.userEdited$.asObservable(),
  );
  private users$ = this.usersChange$.pipe(
    groupBy((user) => user.uuid),
    mergeMap((group$) =>
      group$.pipe(
        switchMap(getUserBalanceUpdate$(this.userDeleted$.asObservable())),
      ),
    ),
    scan(applyUserState, new Map<string, User>()),
    map((userMap) => Array.from(userMap.values())),
    shareReplay({ bufferSize: 1, refCount: true }),
    startWith([]),
  );

  constructor() {
    this.users$.pipe(takeUntilDestroyed()).subscribe();
  }

  getUsers$() {
    return this.users$;
  }

  getUser(uuid: string) {
    return this.users$.pipe(
      map((users) => users.find((u) => u.uuid === uuid)),
      take(1),
    );
  }

  addUser(user: User) {
    this.userAdded$.next(user);
  }

  editUser(user: User) {
    this.userEdited$.next(user);
  }

  deleteUser(uuid: string) {
    this.userDeleted$.next(uuid);
  }
}
