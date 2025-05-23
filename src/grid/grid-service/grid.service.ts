import {
  computed,
  inject,
  Injectable,
  Provider,
  Signal,
  signal,
} from '@angular/core';
import {
  IStrategy,
  Pagination,
  Sort,
  Strategy,
} from 'grid/grid-strategy/grid-strategy';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

@Injectable()
export class GridServiceImplementation<T extends { id: unknown }>
  implements GridService<T>
{
  private dataSource = signal<T[]>([]);
  private columns = signal<Column<T>[]>([]);
  private strategy = inject(Strategy) as IStrategy<T>;
  private currentSort = signal<Sort>(this.strategy.getInitialSort());
  private currentPagination = signal<Pagination>(
    this.strategy.getInitialPagination(),
  );

  readonly transformedDataSource = computed(() => {
    const sorted = this.strategy.getSortedData(
      this.currentSort(),
      this.dataSource() as T[],
    );

    return this.strategy.getPagedData(this.currentPagination(), sorted);
  });

  public setData(data?: T[]) {
    this.dataSource.set(data ?? []);
  }

  public getData() {
    return this.transformedDataSource();
  }

  public setColumns(columns?: Column<T>[]) {
    this.columns.set(columns ?? []);
  }

  public getColumns() {
    return this.columns();
  }

  public getCurrentSort() {
    return this.currentSort.asReadonly();
  }

  public onSortColumnClick(column: Column<T>) {
    const sort = this.strategy.onSortColumnClick(
      column as Column<{ id: unknown }>,
    );

    this.currentSort.set(sort);
  }

  public getPaginationStatus() {
    const { page, pageSize } = this.currentPagination();

    if (!page || !pageSize) {
      return;
    }
    const totalPages = Math.ceil(this.dataSource().length / pageSize);
    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    return { totalPages, hasPrevPage, hasNextPage };
  }

  public nextPage() {
    const pagination = this.strategy.nextPage();

    this.currentPagination.set(pagination);
  }

  public prevPage() {
    const pagination = this.strategy.prevPage();

    this.currentPagination.set(pagination);
  }

  public getCurrentPagination() {
    return this.currentPagination.asReadonly();
  }
}

export abstract class GridService<T extends { id: unknown }> {
  abstract setData(data?: T[]): void;
  abstract getData(): T[];
  abstract setColumns(columns?: Column<T>[]): void;
  abstract getColumns(): Column<T>[];
  abstract getCurrentSort(): Signal<Sort>;
  abstract onSortColumnClick(column: Column<T>): void;
  abstract getPaginationStatus():
    | {
        totalPages: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
      }
    | undefined;
  abstract nextPage(): void;
  abstract prevPage(): void;
  abstract getCurrentPagination(): Signal<Pagination>;
}

export const provideGridService = (): Provider => ({
  provide: GridService,
  useClass: GridServiceImplementation,
});
