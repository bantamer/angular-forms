import { Injectable, Provider, signal } from '@angular/core';
import { Pagination, Sort } from 'grid/grid-strategy/grid-strategy';
import { Column, GridService } from './grid.service';
import {
  PAGINATION_RETURN_MOCK,
  SORT_RETURN_MOCK,
} from 'grid/grid-strategy/grid-strategy.mock';

export interface ITest {
  id: number;
}

export const COLUMN_RETURN_MOCK: Column<ITest> = {
  key: 'id',
  label: 'ID',
  sortable: true,
};

export const PAGINATION_STATUS_RETURN_MOCK = {
  totalPages: 3,
  hasPrevPage: true,
  hasNextPage: true,
};

@Injectable()
export class GridServiceMock<T extends { id: unknown }>
  implements GridService<T>
{
  private currentSort = signal<Sort>(SORT_RETURN_MOCK);
  private currentPagination = signal<Pagination>(PAGINATION_RETURN_MOCK);

  public setDataCalls: { data?: T[] }[] = [];
  public getDataCalls: null[] = [];
  public setColumnsCalls: { columns?: Column<T>[] }[] = [];
  public getColumnsCalls: null[] = [];
  public getCurrentSortCalls: null[] = [];
  public onSortColumnClickCalls: Column<T>[] = [];
  public getPaginationStatusCalls: null[] = [];
  public nextPageCalls: null[] = [];
  public prevPageCalls: null[] = [];
  public getCurrentPaginationCalls: null[] = [];

  public setSortMock(sort: Sort): void {
    this.currentSort.update((s) => ({ ...s, ...sort }));
  }

  public setData(data?: T[]) {
    this.setDataCalls.push({ data });
  }

  public getData() {
    this.getDataCalls.push(null);

    return [];
  }

  public setColumns(columns?: Column<T>[]) {
    this.setColumnsCalls.push({ columns });
  }

  public getColumns() {
    this.getColumnsCalls.push(null);

    return [COLUMN_RETURN_MOCK as Column<T>];
  }

  public getCurrentSort() {
    this.getCurrentSortCalls.push(null);

    return this.currentSort.asReadonly();
  }

  public onSortColumnClick(column: Column<T>) {
    this.onSortColumnClickCalls.push(column);
  }

  public getPaginationStatus() {
    this.getPaginationStatusCalls.push(null);

    return PAGINATION_STATUS_RETURN_MOCK;
  }

  public nextPage() {
    this.nextPageCalls.push(null);
  }

  public prevPage() {
    this.prevPageCalls.push(null);
  }

  public getCurrentPagination() {
    this.getCurrentPaginationCalls.push(null);

    return this.currentPagination.asReadonly();
  }
}

export const provideGridServiceMock = (): Provider => ({
  provide: GridService<ITest>,
  useClass: GridServiceMock<ITest>,
});
