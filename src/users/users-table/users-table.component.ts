import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User, UserField } from 'users/users-service/user';
import { MatIcon } from '@angular/material/icon';
import { getSortType, SortType } from './users-table-sort/get-sort-type';
import { Order } from './users-table-sort/types';
import { sortDate } from './users-table-sort/sort-data';
import { sortDefault } from './users-table-sort/sort-default';
import { MatButtonModule } from '@angular/material/button';

import { UsersTableColumn } from './users-table.types';

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
  imports: [MatTableModule, MatSortModule, DatePipe, MatIcon, MatButtonModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnChanges {
  @Input() users: User[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  @Output() deleteUserEvent = new EventEmitter<string>();

  public dataSource = new MatTableDataSource<User>([]);

  displayedColumns: string[] = [
    UsersTableColumn.Actions,
    UsersTableColumn.FirstName,
    UsersTableColumn.LastName,
    UsersTableColumn.BirthDayAt,
  ];

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (Object.prototype.hasOwnProperty.call(changes, propName)) {
        switch (propName) {
          case 'users': {
            this.dataSource.data = changes[propName].currentValue;
            this.dataSource.sort = this.sort;
            this.dataSource.sortData = usersGridComparator;
          }
        }
      }
    }
  }

  onDelete(uuid: string) {
    this.deleteUserEvent.emit(uuid);
  }
}
