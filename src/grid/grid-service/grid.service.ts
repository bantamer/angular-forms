import { Injectable, signal } from '@angular/core';

export type WithId<T = Record<string, unknown>> = T & {
  id: string | number;
};

export interface Column<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  sortable?: boolean;
}

@Injectable()
export class GridService<DataSourceT extends WithId<object>> {
  private dataSource = signal<DataSourceT[]>([]);
  private columns = signal<Column<DataSourceT>[]>([]);

  public setData(data?: DataSourceT[]) {
    this.dataSource.set(data ?? []);
  }

  public getData() {
    return this.dataSource();
  }

  public setColumns(columns?: Column<DataSourceT>[]) {
    this.columns.set(columns ?? []);
  }

  public getColumns() {
    return this.columns();
  }
}
