import { Injectable, computed, signal } from '@angular/core';

export const enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

@Injectable({
  providedIn: 'root',
})
export class GridService<
  DataSourceT,
  ColumT extends keyof DataSourceT = keyof DataSourceT,
> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore FIXME: Remove after refactoring to externalize data and column input
  public readonly columns = signal<ColumT[]>(['Name', 'Age', 'Role']);
  private readonly originalData = signal<DataSourceT[]>([
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore FIXME: Remove after refactoring to externalize data and column input
    { Name: 'Alice', Age: 30, Role: 'Admin' },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore FIXME: Remove after refactoring to externalize data and column input
    { Name: 'Bob', Age: 25, Role: 'User' },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore FIXME: Remove after refactoring to externalize data and column input
    { Name: 'Ken', Age: 35, Role: 'Guest' },
  ]);

  private readonly sortColumn = signal<ColumT | null>(null);
  private readonly sortOrder = signal<Order>(Order.Asc);

  readonly data = computed(() => {
    const col = this.sortColumn();

    if (!col) {
      return this.originalData();
    }

    const sorted = [...this.originalData()].sort((a, b) =>
      a[col] > b[col] ? 1 : a[col] < b[col] ? -1 : 0,
    );
    return this.sortOrder() === Order.Asc ? sorted : sorted.reverse();
  });

  public sortBy(column: ColumT) {
    if (this.sortColumn() === column) {
      this.sortOrder.update((order) => {
        switch (true) {
          case order === Order.Asc: {
            return Order.Desc;
          }
          case order === Order.Desc: {
            return Order.Asc;
          }
          default:
            return Order.Asc;
        }
      });
    } else {
      this.sortColumn.set(column);
      this.sortOrder.set(Order.Asc);
    }
  }

  public getSortOrderIsAsc = () => {
    return this.sortOrder() === Order.Asc;
  };

  public getCurrentSortColumn = () => {
    return this.sortColumn();
  };
}
