import { inject, Injectable, InjectionToken } from '@angular/core';
import { Column } from './grid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

@Injectable()
export class QueryStrategy<T extends { id: unknown }> implements IStrategy<T> {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private currentQueryParams: QueryParams = this.route.snapshot.queryParams;

  constructor() {
    this.route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.currentQueryParams = params;
    });
  }

  getInitialSort(): Sort {
    const { by, order } = this.currentQueryParams;

    if (!by || !order) {
      this.router.navigate([], {
        queryParams: {
          by: 'id',
          order: Order.Asc,
        },
        queryParamsHandling: 'merge',
      });

      return { by: 'id', order: Order.Asc };
    }

    return { by, order };
  }

  onSortColumnClick(column: Column<T>): Sort {
    const { by, order } = this.currentQueryParams;

    const nextOrder =
      by !== column.key
        ? Order.Asc
        : order === Order.Asc
          ? Order.Desc
          : Order.Asc;

    this.router.navigate([], {
      queryParams: {
        by: column.key,
        order: nextOrder,
      },
      queryParamsHandling: 'merge',
    });

    return { by: column.key as string, order: nextOrder };
  }

  getSortedData(sort: Sort, data: T[]): T[] {
    const { by, order } = sort;

    if (!by || !order) {
      return data;
    }

    const sorted = [...data].sort((a, b) => {
      const aValue = a[by as keyof T];
      const bValue = b[by as keyof T];

      switch (true) {
        case aValue === null: {
          return 1;
        }
        case bValue == null: {
          return -1;
        }
        case typeof aValue === 'string' && typeof bValue === 'string': {
          return aValue.localeCompare(bValue);
        }
        case aValue > bValue: {
          return 1;
        }
        case aValue < bValue: {
          return -1;
        }
        default: {
          return 0;
        }
      }
    });

    return order === Order.Desc ? sorted.reverse() : sorted;
  }

  getInitialPagination(): Pagination {
    const { page, pageSize } = this.currentQueryParams;

    if (!page || !pageSize) {
      this.router.navigate([], {
        queryParams: {
          page: 1,
          pageSize: 10,
        },
        queryParamsHandling: 'merge',
      });

      return { page: 1, pageSize: 10 };
    }

    return { page, pageSize };
  }

  getPagedData(pagination: Pagination, data: T[]): T[] {
    const { page, pageSize } = pagination;

    if (!page || !pageSize) {
      return data;
    }

    const start = (page - 1) * pageSize;
    const end = page * pageSize;

    return data.slice(start, end);
  }

  nextPage(): Pagination {
    const { page, pageSize } = this.currentQueryParams;

    const nextPage = page ? +page + 1 : 1;

    this.router.navigate([], {
      queryParams: {
        page: nextPage,
        pageSize,
      },
      queryParamsHandling: 'merge',
    });

    return { page: nextPage, pageSize };
  }

  prevPage(): Pagination {
    const { page, pageSize } = this.currentQueryParams;

    const prevPage = page && page > 1 ? +page - 1 : 1;

    this.router.navigate([], {
      queryParams: {
        page: prevPage,
        pageSize,
      },
      queryParamsHandling: 'merge',
    });

    return { page: prevPage, pageSize };
  }
}

export const Strategy = new InjectionToken<IStrategy<{ id: unknown }>>(
  'strategy',
  {
    factory: () => new QueryStrategy(),
    providedIn: 'root',
  },
);
