import { Injectable, Provider, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IStrategy, Pagination, Sort } from './grid-strategy';
import { Column } from 'grid/grid-service/grid.service';
import { PAGINATION_RETURN_MOCK, SORT_RETURN_MOCK } from './grid-strategy.mock';

export const provideActivatedRouteMock = (): Provider => ({
  provide: ActivatedRoute,
  useValue: {
    params: of({}),
    queryParams: of({}),
    snapshot: {},
  },
});

@Injectable()
export class QueryStrategyMock<T extends { id: unknown }>
  implements IStrategy<T>
{
  public getInitialSortCalls: null[] = [];
  public onSortColumnClickCalls: Column<T>[] = [];
  public getSortedDataCalls: { sort: Sort; data: T[] }[] = [];
  public getInitialPaginationCalls: null[] = [];
  public getPagedDataCalls: { pagination: Pagination; data: T[] }[] = [];
  public nextPageCalls: null[] = [];
  public prevPageCalls: null[] = [];

  private initialPaginationMock = signal<Pagination>(PAGINATION_RETURN_MOCK);

  setInitialPaginationMock(pagination: Pagination): void {
    this.initialPaginationMock.set(pagination);
  }

  getInitialSort(): Sort {
    this.getInitialSortCalls.push(null);

    return SORT_RETURN_MOCK;
  }

  onSortColumnClick(column: Column<T>): Sort {
    this.onSortColumnClickCalls.push(column);

    return SORT_RETURN_MOCK;
  }

  getSortedData(sort: Sort, data: T[]): T[] {
    this.getSortedDataCalls.push({ sort, data });

    return [];
  }

  getInitialPagination(): Pagination {
    this.getInitialPaginationCalls.push(null);

    return this.initialPaginationMock();
  }

  getPagedData(pagination: Pagination, data: T[]): T[] {
    this.getPagedDataCalls.push({ pagination, data });

    return [];
  }

  nextPage(): Pagination {
    this.nextPageCalls.push(null);

    return PAGINATION_RETURN_MOCK;
  }

  prevPage(): Pagination {
    this.prevPageCalls.push(null);

    return PAGINATION_RETURN_MOCK;
  }
}
