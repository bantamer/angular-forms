import { InjectionToken } from '@angular/core';
import { QueryStrategy } from './query-strategy';
import { Column } from 'grid/grid-service/grid.service';

export const enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

export interface Sort {
  by?: string;
  order?: Order;
}

export interface Pagination {
  page?: number;
  pageSize?: number;
}

export type QueryParams = Sort & Pagination;

export abstract class IStrategy<T extends { id: unknown }> {
  abstract getSortedData(sort: Sort, data: T[]): T[];
  abstract getInitialSort(): Sort;
  abstract onSortColumnClick(column: Column<T>): Sort;
  abstract getPagedData(pagination: Pagination, data: T[]): T[];
  abstract getInitialPagination(): Pagination;
  abstract nextPage(): Pagination;
  abstract prevPage(): Pagination;
}

export const Strategy = new InjectionToken<IStrategy<{ id: unknown }>>(
  'strategy',
  {
    factory: () => new QueryStrategy(),
    providedIn: 'root',
  },
);
