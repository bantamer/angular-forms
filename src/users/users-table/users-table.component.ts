import { DatePipe } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User, UserField } from 'users/users-service/user';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UsersTableColumn } from './users-table.types';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { getSortType, SortType } from './users-table-sort/get-sort-type';
import { sortDate } from './users-table-sort/sort-data';
import { sortDefault } from './users-table-sort/sort-default';
import { Order } from './users-table-sort/types';
import { Router } from '@angular/router';

const usersGridComparator = (data: User[], sort: MatSort) => {
  const isAsc = sort.direction === Order.Asc;
  const key = sort.active as UserField;

  if (!key || !data.length) {
    return data;
  }

  const sortType = getSortType<UserField, User[]>(data, key);

  return data.sort((a, b) => {
    switch (sortType) {
      case SortType.Date:
        return sortDate(a[key] as Date, b[key] as Date, isAsc);
      default:
        return sortDefault(a[key] as string, b[key] as string, isAsc);
    }
  });
};

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [MatTableModule, MatIcon, MatButtonModule, MatSortModule, DatePipe],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  private router = inject(Router);
  readonly users = input.required<User[]>();

  readonly sort = viewChild(MatSort);

  public dataSource = computed(() => {
    const sort = this.sort();
    const source = new MatTableDataSource<User>(this.users());

    source.sort = sort ?? null;
    source.sortData = usersGridComparator;

    return source;
  });

  displayedColumns: string[] = [
    UsersTableColumn.Actions,
    UsersTableColumn.FirstName,
    UsersTableColumn.LastName,
    UsersTableColumn.BirthDayAt,
    UsersTableColumn.AccountBalance,
  ];

  onEditButtonClick(uuid: string): void {
    this.router.navigate(['users', uuid]);
  }
}
