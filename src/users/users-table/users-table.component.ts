import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { User } from 'users/users-service/user';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersTableColumn } from './users-table.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButtonModule, DatePipe, AsyncPipe],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  readonly users$ = input.required<Observable<User[]>>();
  readonly deleteUserEvent = output<string>();

  displayedColumns: string[] = [
    UsersTableColumn.Actions,
    UsersTableColumn.FirstName,
    UsersTableColumn.LastName,
    UsersTableColumn.BirthDayAt,
    UsersTableColumn.AccountBalance,
  ];

  onDelete(uuid: string) {
    this.deleteUserEvent.emit(uuid);
  }
}
