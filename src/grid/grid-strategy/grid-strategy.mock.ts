import { Provider } from '@angular/core';
import { Order, Pagination, Sort, Strategy } from './grid-strategy';
import { QueryStrategyMock } from './query-strategy.mock';

export const SORT_RETURN_MOCK: Sort = { by: 'id', order: Order.Asc };
export const PAGINATION_RETURN_MOCK: Pagination = { page: 1, pageSize: 10 };

export const provideQueryStrategyMock = (): Provider => ({
  provide: Strategy,
  useClass: QueryStrategyMock,
});
