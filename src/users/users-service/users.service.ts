import { Injectable } from '@angular/core';
import { User } from './user';
import {
  BehaviorSubject,
  endWith,
  filter,
  groupBy,
  interval,
  map,
  merge,
  mergeMap,
  scan,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users$ = new BehaviorSubject<User[]>([]);
  private userAdded$ = new Subject<User>();
  private userEdited$ = new Subject<User>();
  private userDeleted$ = new Subject<string>();

  constructor() {
    this.initUsers().pipe(takeUntilDestroyed()).subscribe();
  }

  getUsers$() {
    return this.users$.asObservable();
  }

  getUser(uuid: string) {
    return this.users$.pipe(
      map((users) => users.find((u) => u.uuid === uuid)!),
    );
  }

  getUser$(uuid: string) {
    return merge(
      this.getUser(uuid),
      this.userEdited$.pipe(switchMap(() => this.getUser(uuid))),
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

  initUsers() {
    return merge(
      this.userAdded$.asObservable(),
      this.userEdited$.asObservable(),
    ).pipe(
      groupBy((user) => user.uuid),
      mergeMap((group$) =>
        group$.pipe(
          switchMap((user) =>
            interval(user.interval).pipe(
              startWith(0),
              map(() => ({
                ...user,
                accountBalance: Math.floor(Math.random() * 10000),
              })),
              takeUntil(
                this.userDeleted$.pipe(filter((uuid) => uuid === user.uuid)),
              ),
              endWith({
                ...user,
                deleted: true,
              }),
            ),
          ),
        ),
      ),
      scan((users, user) => {
        if (user.deleted) {
          return users.filter(({ uuid }) => user.uuid !== uuid);
        }

        const index = users.findIndex((u) => u.uuid === user.uuid);
        if (index > -1) {
          users[index] = user;
        } else {
          users.push(user);
        }

        return [...users];
      }, [] as User[]),
      tap((users) => {
        this.users$.next(users);
      }),
    );
  }
}
