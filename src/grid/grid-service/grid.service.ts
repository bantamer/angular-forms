import { computed, inject, Injectable, signal } from '@angular/core';
import { Sort, Strategy } from './grid-strategy';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

@Injectable()
export class GridService<T extends { id: unknown }> {
  private dataSource = signal<T[]>([]);
  private columns = signal<Column<T>[]>([]);
  private strategy = inject(Strategy);
  private currentSort = signal<Sort>(this.strategy.getInitialSort());

  readonly sorted = computed(() =>
    this.strategy.getSortedData(this.currentSort(), this.dataSource() as T[]),
  );

  public setData(data?: T[]) {
    this.dataSource.set(data ?? []);
  }

  public getData() {
    return this.sorted();
  }

  public setColumns(columns?: Column<T>[]) {
    this.columns.set(columns ?? []);
  }

  public getColumns() {
    return this.columns();
  }

  public onSortColumnClick(column: Column<T>) {
    const sort = this.strategy.onSortColumnClick(
      column as Column<{ id: unknown }>,
    );

    this.currentSort.set(sort);
  }
}
